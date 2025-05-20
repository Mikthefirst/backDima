import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Mbp } from "./mbp.entity";
import { Room } from "src/room/entities/room.entity";

@Entity({ name: "mbp_to_room" })
export class MbpToRoom {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Mbp, (mbp) => mbp.id, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "mbp_id" })
  mbp: Mbp;

  @ManyToOne(() => Room, (room) => room.id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "room_id" })
  room: Room;

  @Column("int")
  quantity: number;
}
