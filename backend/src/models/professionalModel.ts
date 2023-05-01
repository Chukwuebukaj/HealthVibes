import { Model, DataTypes } from "sequelize";
import db from "../database/db.config";
import AppointmentInstance from "./appointmentModel";

interface Professional {
  id: string;
  name: string;
  email: string;
  password: string;
  image: any;
  CV: any;
  availability: string;
  rate: string;
  phoneNumber: string;
  linkedin: string;
  status: string;
}

export class ProfessionalInstance extends Model<Professional> {}

ProfessionalInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.BLOB, allowNull: true },
    CV: { type: DataTypes.BLOB, allowNull: true },
    availability: { type: DataTypes.STRING, allowNull: false },
    rate: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    linkedin: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    tableName: "professional",
  }
);

ProfessionalInstance.hasMany(AppointmentInstance, {
  foreignKey: "professionalId",
  as: "appointment",
  sourceKey: "id",
});

AppointmentInstance.belongsTo(ProfessionalInstance, {
  foreignKey: "professionalId",
  as: "professional",
  targetKey: "id",
});
