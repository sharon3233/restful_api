const express = require("express");
const basicAuth = require('express-basic-auth');
const bcrypt = require('bcrypt');

const {User, Company, Product} = require('./models');

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());

app.use(basicAuth({
  authorizer : dbAuthorizer,
  authorizeAsync: true,
  unauthorizedResponse : () => 'Wrong password'
}))
async function dbAuthorizer(username, password, callback) {
  try {
    const user = await User.findOne({where : {name : username}})
    let isValid = (user != null) ? await bcrypt.compare(password, user.password) : false;
    callback(null, isValid)
  } catch(err) {
    console.log("ALERT ALERT AN ERROR", err)
  }

}



















//basic auth needs a config object
// app.use(basicAuth({
//   authorizer : dbAuthorizer, //custom authorizer fn
//   authorizeAsync: true, //allow our authorizer to be async
//   unauthorizedResponse : () => 'None shall pass!'
// }))

// //compares username + password with what's in the database
// // Returns boolean indicating if password matches
// async function dbAuthorizer(username, password, callback){
//   try {
//     // get user from DB
//     const user = await User.findOne({where : {name : username}})
//     // isValid == true if user exists and passwords match, false if no user or passwords don't match
//     let isValid = (user != null) ? await bcrypt.compare(password, user.password) : false;
//     callback(null, isValid); //callback expects null as first argument
//   } catch(err) {
//     console.log("OH NO AN ERROR!", err)
//     callback(null, false);
//   }
// }

app.get('/', (req, res) => {
  res.send('<h1>RESTful API Assignment</h1>')
})

app.get('/users', async (req, res) => {
  //what should i put here?
  let users = await User.findAll()
  res.json({users});
})

app.get('/users/:id', async (req, res) => {
  let user = await User.findByPk(req.params.id);
  res.json({user});
})

app.delete('/user/:id', async(req, res)=> {
  await User.destroy({where: {id: req.params.id}});
  res.send('Deleted!')
})

app.post('/user', async(req, res)=> {
  let newUser = await User.create(req.body);
  res.json({newUser})
})

// I want to get all Companies

app.get('/companies', async(req, res)=> {
  let companies = await Company.findAll();
  res.json({companies});
})

// I want to get one Company

app.get('/company/:id', async(req, res)=> {
  let company = await Company.findByPk(req.params.id);
  res.json({company});
})

// I want to delete one Company

app.delete('/company/:id', async(req, res)=> {
  await Company.destroy({where: {id: req.params.id}});
  res.send('Deleted!')
})

// I want to create one Company

app.post('/company', async(req, res)=> {
  let newCompany = await Company.create(req.body);
  res.json({newCompany})
})

// I want to get all products 

app.get('/products', async (req, res) => {
  let products = await Product.findAll()
  res.json({products});
})

// I want to find a certain product 

app.get('/product/:id', async (req, res) => {
  let product = await Product.findByPk(req.params.id);
  res.json({product});
})

// I want to delete a certain product 

app.delete('/product/:id', async(req, res)=> {
  await Product.destroy({where: {id: req.params.id}});
  res.send('Deleted!')
})

//I want to add a new product 

app.post('/product', async(req, res)=> {
  let newProduct = await Product.create(req.body);
  res.json({newProduct})
})

// I want to update one product 

app.put('/product/:id', async(req, res)=> {
  let updatedProduct = await Product.update(req.body, {
    where : {id : req.params.id}
  });
  res.json({updatedProduct})
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});