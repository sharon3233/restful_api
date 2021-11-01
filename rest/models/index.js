const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class User extends Model {}

class Company extends Model {}

class Product extends Model {}



User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

Company.init({
    name: DataTypes.STRING
}, {
    sequelize,
    timestamps: false,
});


Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
}, {
    sequelize,
    timestamps: false,
});

module.exports = {User, Company, Product};