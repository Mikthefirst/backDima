import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  room_number: number;

  @Column()
  owner_id: string;

  @Column({ nullable: true })
  building_id: number;
}
