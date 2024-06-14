import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Event } from "./event.entity";

@Entity({ name: 'event_tickets' })
export class Ticket {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    title: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('float')
    price: number;

    @Column('numeric', {
        nullable: true
    })
    stock: number;

    @ManyToOne(() => Event, event => event.tickets, { nullable: false, onDelete: 'CASCADE' })
    event: Event;
}
