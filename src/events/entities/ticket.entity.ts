import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Event } from "./event.entity";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    title: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column('numeric', {
        default: 0,
        nullable: false
    })
    stock: number;

    @Column('text', {
        unique: true
    })
    slug: string

    @ManyToOne(() => Event, event => event.tickets, { nullable: false })
    event: Event;
}
