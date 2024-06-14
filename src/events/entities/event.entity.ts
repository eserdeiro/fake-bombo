import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity()
export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    title: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('text', { nullable: false })
    date: string;

    @Column('text', { unique: true })
    slug: string

    @Column('text', {
        default: '/default.png',
        nullable: false
    })
    image: string;

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
