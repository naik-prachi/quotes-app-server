import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

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
        default: ''
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: ''
    })
    password: string;
}