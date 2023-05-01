import { Model, DataTypes } from "sequelize";
import db from "../database/db.config";
import { AppointmentInstance } from "./appointmentModel";

interface User {
  id: string;
  username: string;
  dob: string;
  email: string;
  password: string;
  gender: string;
  country: string;
  city: string;
  interest: string;
  emergencyContact: string;
}

export class UserInstance extends Model<User> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    interest: { type: DataTypes.STRING, allowNull: false },
    emergencyContact: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    tableName: "user",
  }
);
export default UserInstance;

UserInstance.hasMany(AppointmentInstance, {
  foreignKey: "userId",
  as: "appointment",
});

AppointmentInstance.belongsTo(UserInstance, {
  foreignKey: "userId",
  as: "user",
});
