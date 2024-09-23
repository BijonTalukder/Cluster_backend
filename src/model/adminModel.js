import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import bcrypt from 'bcrypt'
const adminModel = sequelize.define('admin', {
ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull: false,
  },
  name:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
        isEmail:true
    }
  },
  password:{
    type:DataTypes.STRING,
    allowNull: false, // Ensure the password cannot be null
    validate: {
        len:{
            args:[6],
            msg: 'Password must be at least 6 characters long'
        }
    }
  }

}, {
  tableName: 'admins',
  timestamps: true,
  hooks:{
    beforeCreate:async(admin)=>{
    admin.password = await bcrypt.hash(admin.password,10)
    }
  }
});

adminModel.prototype.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

export default adminModel;


