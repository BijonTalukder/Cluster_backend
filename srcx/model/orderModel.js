import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const orderModel = sequelize.define('orders', {
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
 phone:{type:DataTypes.STRING,
   allowNull:false},
 address:{
    type:DataTypes.STRING,
    allowNull:true
 },
price:{
    type:DataTypes.INTEGER,
    allowNull:true,
    defaultValue:0

 },
 productName:{
    type:DataTypes.STRING,
    allowNull:true

 },
 productKeyID:{
    type:DataTypes.STRING,
    allowNull:true
 },
 transactionID:{
   type:DataTypes.STRING,
   allowNull:true
},

paymentStatus:{
    type:DataTypes.ENUM("pending","successed"),
    defaultValue:"pending",
    allowNull:false
    

}
}, {
  tableName: 'orders',
  timestamps: true,
});

export default orderModel;


