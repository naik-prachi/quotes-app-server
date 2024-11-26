import { flatten } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quotes{

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        default: ''
    })
    quote: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: ''
    })
    author: string;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    like: number;

    @Column({
        type: 'int',
        nullable: false,
        default: 0
    })
    dislike: number;

    @Column('simple-array')
    tags: string[];
}