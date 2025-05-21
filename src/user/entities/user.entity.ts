import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from '../enums/role.enum';

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({
    type: "enum",
    enum: Role,
  })
  role: Role;

  @Column({ nullable: true })
  room_id?: number;


  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  lastLogin: Date;
}

//username, email, full_name, password, choose role(Teacher,mol ), and not  nessesary fields as room_id