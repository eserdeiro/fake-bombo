import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { SocialMedia } from './entities/social-media.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [
    TypeOrmModule.forFeature([Artist, SocialMedia])
  ],
  exports: [ArtistsService, TypeOrmModule]
})
export class ArtistsModule { }
