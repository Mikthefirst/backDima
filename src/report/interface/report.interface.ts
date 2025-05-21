// report.interface.ts
import { Urgency } from "../enums/urgency.enum";
import { ReportStatus } from "../enums/status.enum";
import { Asset } from "src/assets/entities/asset.entity";
import { Mbp } from "src/mbp/entities/mbp.entity";
import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";

export interface ReportInterface {
  reason: string;
  detailed_desc: string;
  comment?: string;
  urgency: Urgency;
  status: ReportStatus;
  asset?: Asset;
  mbp?: Mbp;
  room?: Room;
  createdBy: User;
}

/*
  reason: string;
  detailed_desc: string;
  comment: string;

  asset?: Asset;
  mbp?: Mbp;


  room?: Room;
  urgency: Urgency;
  status: ReportStatus;

  
  createdBy: User;
*/