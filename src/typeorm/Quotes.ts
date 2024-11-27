import { flatten } from "@nestjs/common";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Quotes{

    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @ManyToOne(type => Users, user => user.quotes) 
    @JoinColumn()
    user: Users;
}