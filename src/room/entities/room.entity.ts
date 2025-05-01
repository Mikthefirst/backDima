import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Building } from '../enums/building.enum';

@Entity({ name: "rooms" })
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  owner_id: string;

  @Column({ default: Building.Building1 })
  building: Building;

  @Column()
  width: number;
  @Column()
  height: number;
  @Column()
  x: number;
  @Column()
  y: number;
}
