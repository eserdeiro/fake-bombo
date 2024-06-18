import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SocialMedia } from "./social-media.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'artists' })
export class Artist {

    @ApiProperty({
        description: 'Unique identifier for the artist',
        example: 'f8765432-1234-5678-9012-345678901234'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Name of the artist',
        example: 'The Beatles'
    })
    @Column('text', { nullable: false })
    name: string;

    @ApiProperty({
        description: 'About the artist',
        example: 'The Beatles were an English rock band formed in Liverpool in 1960.'
    })
    @Column('text', { nullable: false })
    about: string;

    @ApiProperty({
        description: 'Image URL for the artist',
        example: '/default.png'
    })
    @Column('text', {
        default: '/default.png',
        nullable: false
    })
    image: string;

    @ApiProperty({
        description: 'Country code of the artist',
        example: 'GB'
    })
    @Column('text', { nullable: false })
    country_code: string;

    @ApiProperty({
        description: 'Unique slug for the artist',
        example: 'the-beatles'
    })
    @Column('text', { unique: true })
    slug: string

    @ApiProperty({
        description: 'List of social media links for the artist',
        type: [SocialMedia]
    })
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
