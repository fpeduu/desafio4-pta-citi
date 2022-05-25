import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    foodType: string
}