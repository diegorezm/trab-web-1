import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({length: 255, nullable: false})
  name: string;
  @Column({nullable: false})
  price: number;
  @Column()
  quantity: number;
}
