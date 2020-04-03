import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

//ActiveRecord
@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text", default: "firstName"})
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    phone: number;

}
