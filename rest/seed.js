const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const {sequelize} = require('./db');
const {User, Company, Product} = require('./models');

const createUsers = async () => {
    const users = [
        {name : 'Bobby', password: 'bob1234'},
        {name : 'Chris', password : 'chris2021'},
        {name : 'Sharon', password : 'kind88'}
    ];

    return users
}

const company = [
    {name : 'Bobs Furniture'},
    {name : 'Blinding Diamonds'},
    {name : 'Natural Beauty'}
];


const products = [
    {
        name : '4-piece Sectional',
        price : 200.00
    },
    {
        name : 'Blue Diamond 2.43 carats',
        price : 195000.00
    },
    {
        name : 'Skin-Deep-Lotion',
        price : 30.00
    }
    
];


const seed = async () => {

    await sequelize.sync({ force: true });

    const users = await createUsers(); // create users w/ encrypted passwords

    const userPromises = users.map(user => User.create(user))
    const companyPromises = company.map(company => Company.create(company))
    const productsPromises = products.map(product => Product.create(product))
    await Promise.all([...userPromises, ...companyPromises, ...productsPromises ]);
    console.log("db populated!")
}

seed();