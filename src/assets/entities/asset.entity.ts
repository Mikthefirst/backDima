import { Room } from "src/room/entities/room.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "assets" })
export class Asset {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: "Room" }) // указываем имя столбца в таблице assets
  room: Room;

  
  @Column({
    type: "decimal",
    precision: 12,
    scale: 2,
    nullable: false,
  })
  value: number;

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
