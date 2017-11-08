const path = require('path'); //node build in module
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath))

app.listen(po,()=>{
  console.log(`server is up on port: ${port}`)
})
