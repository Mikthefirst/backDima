import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Urgency } from "../enums/urgency.enum";
import { ReportStatus } from "../enums/status.enum";
import { Asset } from "src/assets/entities/asset.entity";
import { Room } from "src/room/entities/room.entity";

@Entity({ name: "report" })
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  reason: string;

  @Column({ length: 1000 })
  detailed_desc: string;

  @ManyToOne(() => Asset, { nullable: true })
  asset?: Asset;

  @ManyToOne(() => Room, { nullable: true })
  room?: Room;

  @Column({
    type: "enum",
      enum: Urgency,
      default:Urgency.LOW
  })
  urgency: Urgency;

  @Column({
    type: "enum",
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
    status: ReportStatus;
    
    @CreateDateColumn()
      createdAt: Date;
    
      @UpdateDateColumn()
      updatedAt: Date;
}
