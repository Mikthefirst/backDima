import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "assets" })
export class Asset {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @PrimaryGeneratedColumn("increment")
  inventory_number: number;

  @Column()
  name: string;

  @Column()
  room_id: string;

  @Column({ name: "MOL", nullable: true })
  responsiblePerson: string; // Материально ответственное лицо

  @Column({
    name: "Depreciation", //амортизация
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
  })
  depreciation: number; // Depreciation amount

  @Column({
    name: "Date",
    type: "date",
    nullable: false,
  })
  acquisitionDate: Date; // Date of acquisition
}
