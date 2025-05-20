import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity({ name: "assets" })
export class Asset {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryGeneratedColumn("increment")
  inventory_number: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image_url?: string;

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

  //для комнат
  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  x: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  y: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.1 })
  width: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.1 })
  height: number;
}

/* 
  @Column()
  width: number;
  @Column()
  height: number;
  @Column()
  x: number;
  @Column()
  y: number;
*/