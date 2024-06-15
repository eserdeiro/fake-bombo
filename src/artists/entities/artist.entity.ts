import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column('text', { nullable: false })
    country_code: string;

    @Column('text', { unique: true })
    slug: string

    @OneToMany(() => SocialMedia, social_media => social_media.artist, { cascade: true })
    social_media: SocialMedia[];

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.name
        }
        this.slug = this.slug
            .toLowerCase()
            .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?/\s/]/g, '-');
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?/\s/]/g, '-');
    }
}
