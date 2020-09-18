import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Photo } from "./Photo";

//ActiveRecord
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", default: "firstName" })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    phone: number;

    @OneToMany(type => Photo, photo => photo.user)
    photos: Photo[];

}
