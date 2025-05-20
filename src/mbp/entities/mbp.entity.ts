import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "../dto/enums/cat.enum";

@Entity()
export class Mbp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Category,
  })
  category: Category;

  @Column("int")
  overallQuantity: number;

  @Column("int")
  minQuantity: number;

  @Column({ type: "date" })
  expiryDate: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
