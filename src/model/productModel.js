import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const productModel = sequelize.define('businessProduct', {
  productID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true
  },
  productType: {
    type: DataTypes.STRING,
  },
  productTitle: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  prouductSubtitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  prouductDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  productInitialQty:{
    type:DataTypes.INTEGER,
    defaultValue:0,
    },
  productPurchasePrice:{
    type:DataTypes.INTEGER,
    defaultValue:0,
  },
  productRetailPrice:{
    type:DataTypes.INTEGER,
    defaultValue:0,
  },
  productWholeSalesPrice:{
    type:DataTypes.INTEGER,
    defaultValue:0,
  },
  productMinQty:{
    type:DataTypes.INTEGER,
    defaultValue:0,
  },
  productMaxQty:{
    type:DataTypes.INTEGER,
    defaultValue:0,
  },
  productUnitID:{
    type:DataTypes.INTEGER
  },
  businessID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAllBranch: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  branchIDs: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
  notAvailableBranchIDs: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isInHouseAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isPickupAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDeliveryAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isUsedForOnline: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isUsedForPOS: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isColorVariations: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  isVATApplicable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isSDApplicable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isCombo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  numberOfSubProducts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isSocialSubtitle: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  socialSubtitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  isSocialDescription: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  socialDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'products',
  timestamps: true,
});

export default productModel;
//product type table

