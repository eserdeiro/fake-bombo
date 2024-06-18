import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Event } from "./event.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'event_tickets' })
export class Ticket {

    @ApiProperty({
        description: 'Unique identifier for the ticket',
        example: 'f8765432-1234-5678-9012-345678901234'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Title of the ticket',
        example: 'General Admission'
    })
    @Column('text', { nullable: false })
    title: string;

    @ApiProperty({
        description: 'Description of the ticket',
        example: 'General admission to the event'
    })
    @Column('text', { nullable: false })
    description: string;

    @ApiProperty({
        description: 'Price of the ticket',
        example: 50
    })
    @Column('float')
    price: number;

    @ApiProperty({
        description: 'Stock of the ticket',
        example: 100
    })
    @Column('numeric', {
        nullable: true
    })
    stock: number;

    @ManyToOne(() => Event, event => event.tickets, { nullable: false, onDelete: 'CASCADE' })
    event: Event;
}
