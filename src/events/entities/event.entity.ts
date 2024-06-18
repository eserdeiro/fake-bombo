import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'events' })
export class Event {
    @ApiProperty({
        description: 'Unique identifier for the event',
        example: 'f8765432-1234-5678-9012-345678901234'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Title of the event',
        example: 'Concert of the Year'
    })
    @Column('text', { nullable: false })
    title: string;

    @ApiProperty({
        description: 'Description of the event',
        example: 'An amazing concert with the best artists of the year'
    })
    @Column('text', { nullable: false })
    description: string;

    @ApiProperty({
        description: 'Date of the event',
        example: '2023-12-25'
    })
    @Column('text', { nullable: false })
    date: string;

    @ApiProperty({
        description: 'Unique slug for the event',
        example: 'concert-of-the-year'
    })
    @Column('text', { unique: true })
    slug: string

    @ApiProperty({
        description: 'Image URL for the event',
        example: '/default.png'
    })
    @Column('text', {
        default: '/default.png',
        nullable: false
    })
    image: string;

    @ApiProperty({
        description: 'List of tickets associated with the event',
        type: [Ticket]
    })
    @OneToMany(() => Ticket, ticket => ticket.event, { cascade: true })
    tickets: Ticket[];

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
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
