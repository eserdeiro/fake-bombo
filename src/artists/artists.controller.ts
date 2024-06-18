import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { QuerysDto } from 'src/common/dto/querys.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  @Post()
  @ApiCreatedResponse({ type: Artist })
  @ApiBody({ type: CreateArtistDto })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOkResponse({ type: Artist })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit the number of artists returned.' })
  @ApiQuery({ name: 'offset', required: false, description: 'Offset the starting point of the returned artists.' })
  @ApiQuery({ name: 'search', required: false, description: 'Search for artists by name.' })
  findAll(@Query() querysDto: QuerysDto) {
    return this.artistsService.findAll(querysDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: Artist })
  @ApiNotFoundResponse({ description: 'Artist with ${id} not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the artist to retrieve.', required: true, type: 'string' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Artist })
  @ApiNotFoundResponse({ description: 'Artist with ${id} not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the artist to update.', required: true, type: 'string' })
  @ApiBody({ type: UpdateArtistDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Artist with id ${id} has been removed' })
  @ApiNotFoundResponse({ description: 'Artist with ${id} not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the artist to delete.', required: true, type: 'string' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.remove(id);
  }
}
