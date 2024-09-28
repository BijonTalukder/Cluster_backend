import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const productKeyModel = sequelize.define('productKey', {
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
 productKey:{
  type:DataTypes.STRING,
  allowNull:false
 },
status:{
    type:DataTypes.ENUM("sold","unsold"),
    defaultValue:"unsold",
    allowNull:false
    

}
}, {
  tableName: 'product_keys',
  timestamps: true,
});

export default productKeyModel;

