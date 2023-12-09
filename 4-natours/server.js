require('dotenv').config({ path: './config.env' });
// console.log(process.env)

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});