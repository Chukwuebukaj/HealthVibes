import { Model, DataTypes } from "sequelize";
import db from "../database/db.config";

export interface AppointmentDetails {
  id: string;
  email: string;
  fullName: string;
  serviceType: string;
  sessionType: string;
  sessionDate: Date;
  sessionFrequency: string;
  additionalInfo: string;
  status: string;
  // userId: string;
  professionalId: string;
}

export class AppointmentInstance extends Model<AppointmentDetails> {
  static find(arg0: {
    id: string;
    email: string;
    fullName: any;
    serviceType: any;
    sessionType: any;
    sessionDate: any;
    sessionFrequency: any;
    additionalInfo: any;
    status: any;
    // userId: any;
    professionalId: string;
  }) {
    throw new Error("Method not implemented.");
  }
}

AppointmentInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sessionFrequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additionalInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    // userId: {
    //   type: DataTypes.UUIDV4,
    // },
    professionalId: {
      type: DataTypes.UUIDV4,
    },
  },
  {
    sequelize: db,
    tableName: "appointment",
  }
);

export default AppointmentInstance;
