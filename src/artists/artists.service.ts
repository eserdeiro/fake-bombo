import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { SocialMedia } from './entities/social-media.entity';
import { QuerysDto } from 'src/common/dto/querys.dto';

@Injectable()
export class ArtistsService {
  private readonly logger = new Logger('EventsService')

  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(SocialMedia)
    private readonly socialMediaRepository: Repository<SocialMedia>,

    private readonly dataSource: DataSource
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    try {
      const { social_media = [], ...eventDetails } = createArtistDto

      const event = this.artistRepository.create({
        ...eventDetails,
        social_media: social_media.map(socialMedia => this.socialMediaRepository.create(socialMedia))
      })

      await this.artistRepository.save(event)

      return event

    } catch (error) {
      this.handleExeptions(error)
    }
  }

  async findAll(querysDto: QuerysDto) {
    const { limit = 10, offset = 0, search } = querysDto
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

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: {
        social_media: true
      }
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const { social_media, ...toUpdate } = updateArtistDto

    const artist = await this.artistRepository.preload({ id, ...toUpdate })

    if (!artist) throw new NotFoundException(`Event with ${id} not found`)

    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      if (social_media) {
        await queryRunner.manager.delete(SocialMedia, { event: id })
        artist.social_media = social_media.map(social_media => this.socialMediaRepository.create(social_media))
      }

      await queryRunner.manager.save(artist)
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return this.findOne(id)
    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      this.handleExeptions(error)
    }
  }

  async remove(id: string) {
    const event = await this.findOne(id)

    await this.artistRepository.remove(event);

    return { message: `Artist with id ${id} has been removed` };

  }

  private handleExeptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    this.logger.error(error.detail)
    throw new InternalServerErrorException('Unexpected error, check the server logs')
  }
}
