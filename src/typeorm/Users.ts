import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quotes } from "./Quotes";

@Entity()
export class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: ''
    })
    first_name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: ''
    })
    last_name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: '',
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: ''
    })
    password: string;

    @OneToMany(() => Quotes)
    @JoinColumn()
    quotes: Quotes[];
}