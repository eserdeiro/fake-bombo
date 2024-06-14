import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

@Entity()
export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    title: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('date', { nullable: false })
    date: Date;

    @Column('text', { nullable: true })
    slug: string

    @Column('text', {
        default: '/default.png',
        nullable: false
    })
    image: string;

    @OneToMany(() => Ticket, ticket => ticket.event)
    tickets: Ticket[];
}
