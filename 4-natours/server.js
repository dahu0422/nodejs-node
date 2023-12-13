const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
// console.log(process.env)

const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('DB connection successful');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
