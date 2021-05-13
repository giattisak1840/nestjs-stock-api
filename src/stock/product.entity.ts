import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'product'})
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column({default: "noimage.jpeg"})
    image: string;

    @UpdateDateColumn()
    updated: Date;

}