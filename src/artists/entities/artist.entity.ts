import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SocialMedia } from "./social-media.entity";

@Entity({ name: 'artists' })
export class Artist {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false })
    about: string;

    @Column('text', {
        default: '/default.png',
        nullable: false
    })
    image: string;

    @OneToMany(() => SocialMedia, socialMedia => socialMedia.artist, { cascade: true })
    socialMedia: SocialMedia[];
}
