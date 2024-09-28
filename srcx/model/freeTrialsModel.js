import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const freeTrialsModel = sequelize.define('freeTrials', {
ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull: false,
  },
 name:{
    type:DataTypes.STRING,
    allowNull:false
 },
 email:{
   type:DataTypes.STRING,
   validate:{
      isEmail:true
   }
 },
 address:{
    type:DataTypes.STRING,
    allowNull:true
 },
 mobile:{
    type:DataTypes.STRING,
    allowNull:false
 },
 productName:{
    type:DataTypes.STRING,
    allowNull:true
 },
}, {
  tableName: 'free_trials',
  timestamps: true,
});

export default freeTrialsModel;


