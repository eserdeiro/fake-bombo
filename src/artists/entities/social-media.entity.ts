import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./artist.entity";

@Entity({ name: 'artist_social_media' })
export class SocialMedia {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    type: string;

    @Column('text', { nullable: false })
    url: string;

    @ManyToOne(() => Artist, artist => artist.socialMedia, { nullable: false, onDelete: 'CASCADE' })
    artist: Artist;
}
