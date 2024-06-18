import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @ApiProperty({
        description: 'Unique identifier for the user',
        example: 'f8765432-1234-5678-9012-345678901234'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
        description: 'User email',
        example: 'john.doe@example.com'
    })
    @Column('text', { unique: true })
    email: string

    @ApiProperty({
        description: 'User password ',
        example: '********'
    })
    @Column('text', { select: false })
    password: string

    @ApiProperty({
        description: 'User fullname',
        example: 'John Doe'
    })
    @Column('text')
    fullname: string

    @ApiProperty({
        description: 'Indicates if the user is active',
        example: true
    })
    @Column('boolean', {
        default: true
    })
    isActive: boolean

    @ApiProperty({
        description: 'User roles',
        example: ['user']
    })
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[]

    @BeforeInsert()
    emailToLowerCaseInsert() {
        this.email = this.email.toLowerCase().trim()
    }

    @BeforeUpdate()
    emailToLowerCaseUpdate() {
        this.email = this.email.toLowerCase().trim()
    }
}
