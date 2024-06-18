import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./artist.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'artist_social_media' })
export class SocialMedia {
    @ApiProperty({
        description: 'Unique identifier for the social media link',
        example: 'f8765432-1234-5678-9012-345678901234'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Type of social media link',
        example: 'soundcloud'
    })
    @Column('text', { nullable: false })
    type: string;

    @ApiProperty({
        description: 'URL of the social media link',
        example: 'https://soundcloud.com/thebeatles'
    })
    @Column('text', { nullable: false })
    url: string;

    @ManyToOne(() => Artist, artist => artist.social_media, { nullable: false, onDelete: 'CASCADE' })
    artist: Artist;
}
