import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Urgency } from "../enums/urgency.enum";
import { ReportStatus } from "../enums/status.enum";
import { Asset } from "src/assets/entities/asset.entity";
import { Room } from "src/room/entities/room.entity";
import { Mbp } from "src/mbp/entities/mbp.entity";
import { User } from "src/user/entities/user.entity"; 

@Entity({ name: "report" })
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  reason: string;

  @Column({ length: 1000 })
  detailed_desc: string;

  @Column({ length: 200, nullable: true })
  comment: string;

  @ManyToOne(() => Asset, { nullable: true })
  asset?: Asset;

  @ManyToOne(() => Mbp, { nullable: true })
  mbp?: Mbp;

  @ManyToOne(() => Room, { nullable: true })
  room?: Room;

  @Column({
    type: "enum",
    enum: Urgency,
    default: Urgency.LOW,
  })
  urgency: Urgency;

  @Column({
    type: "enum",
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  status: ReportStatus;

  @ManyToOne(() => User, { nullable: false }) // <-- Add this line
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


