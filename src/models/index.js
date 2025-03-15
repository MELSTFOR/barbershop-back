const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const Barber = sequelize.define("Barber", {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: DataTypes.STRING, // Cambia INTEGER a STRING
  email: DataTypes.STRING,
  idNumber: DataTypes.STRING,
  startDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  profilePicture: DataTypes.STRING,
});

const StockItem = sequelize.define("StockItem", {
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  unit: { type: DataTypes.STRING, allowNull: false },
  minStock: { type: DataTypes.INTEGER, allowNull: false },
  lastUpdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Profile = sequelize.define("Profile", {
  ownerName: { type: DataTypes.STRING, allowNull: false },
  ownerPhoto: DataTypes.STRING,
  ownerPhone: DataTypes.STRING,
  ownerEmail: DataTypes.STRING,
  ownerDNI: DataTypes.STRING,
  businessName: { type: DataTypes.STRING, allowNull: false },
  businessLogo: DataTypes.STRING,
  businessAddress: DataTypes.STRING,
  businessPhone: DataTypes.STRING,
  businessEmail: DataTypes.STRING,
});

// Define relationships
Barber.hasMany(StockItem);
StockItem.belongsTo(Barber);
Profile.belongsTo(Barber);

module.exports = { sequelize, Barber, StockItem, Profile };
