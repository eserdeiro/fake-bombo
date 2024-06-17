import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { SocialMedia } from './entities/social-media.entity';
import { QuerysDto } from 'src/common/dto/querys.dto';
import { ErrorHandlingService } from 'src/common/error-handling/error-handling.service';

@Injectable()
export class ArtistsService {
  // Initialize a logger instance for logging purposes.
  private readonly logger = new Logger('EventsService');

  constructor(
    // Inject the Artist repository for interacting with Artist entities.
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    // Inject the SocialMedia repository for interacting with SocialMedia entities.
    @InjectRepository(SocialMedia)
    private readonly socialMediaRepository: Repository<SocialMedia>,
    // Inject the DataSource for accessing the database connection.
    private readonly dataSource: DataSource,
    // Inject the ErrorHandlingService for centralized error handling.
    private readonly errorHandlingService: ErrorHandlingService
  ) { }

  /**
   * Creates a new artist with associated social media links.
   * @param createArtistDto The DTO containing artist details and social media links.
   * @returns The newly created artist.
   */
  async create(createArtistDto: CreateArtistDto) {
    try {
      // Destructure the DTO to separate social media links from other artist details.
      const { social_media = [], ...eventDetails } = createArtistDto;

      // Create a new artist entity with the provided details and map social media links to SocialMedia entities.
      const event = this.artistRepository.create({
        ...eventDetails,
        social_media: social_media.map(socialMedia => this.socialMediaRepository.create(socialMedia))
      });

      // Save the artist to the database.
      await this.artistRepository.save(event);

      // Return the created artist.
      return event;

    } catch (error) {
      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }

  /**
   * Retrieves all artists with optional pagination and search functionality.
   * @param querysDto The DTO containing query parameters.
   * @returns An array of artists.
   */
  async findAll(querysDto: QuerysDto) {
    const { limit = 10, offset = 0, search } = querysDto;
    // Find artists with specified parameters, including social media links.
    const artist = await this.artistRepository.find({
      take: limit,
      skip: offset,
      where: search ? { name: ILike(`%${search}%`) } : {},
      relations: {
        social_media: true
      }
    });

    return artist;
  }

  /**
   * Retrieves a single artist by its ID.
   * @param id The ID of the artist to retrieve.
   * @returns The artist with the specified ID.
   */
  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: {
        social_media: true
      }
    });

    // Throw a NotFoundException if the artist is not found.
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return artist;
  }

  /**
   * Updates an existing artist.
   * @param id The ID of the artist to update.
   * @param updateArtistDto The DTO containing the updated artist details.
   * @returns The updated artist.
   */
  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const { social_media, ...toUpdate } = updateArtistDto;

    // Preload the artist with the specified ID and update it with the provided data.
    const artist = await this.artistRepository.preload({ id, ...toUpdate });

    // Throw a NotFoundException if the artist is not found.
    if (!artist) throw new NotFoundException(`Artist with ${id} not found`);

    // Create a query runner for transaction management.
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect to the database and start a transaction.
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // If social media links are provided, delete existing links and create new ones.
      if (social_media) {
        await queryRunner.manager.delete(SocialMedia, { artist: id });
        artist.social_media = social_media.map(social_media => this.socialMediaRepository.create(social_media));
      }

      // Save the updated artist to the database.
      await queryRunner.manager.save(artist);

      // Commit the transaction and release the query runner.
      await queryRunner.commitTransaction();
      await queryRunner.release();

      // Return the updated artist.
      return this.findOne(id);
    } catch (error) {
      // Rollback the transaction and release the query runner if an error occurs.
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }

  /**
   * Deletes an artist by its ID.
   * @param id The ID of the artist to delete.
   * @returns A success message.
   */
  async remove(id: string) {
    const event = await this.findOne(id);

    // Remove the artist from the database.
    await this.artistRepository.remove(event);

    return { message: `Artist with id ${id} has been removed` };

  }

  /**
   * Deletes all artists.
   * @returns The result of the delete operation.
   */
  async deleteAll() {
    const query = this.artistRepository.createQueryBuilder('artist');

    try {
      // Delete all artists using a query builder.
      return await query
        .delete()
        .where({})
        .execute();
    } catch (error) {
      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }

}
