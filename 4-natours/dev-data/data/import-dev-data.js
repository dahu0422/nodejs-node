const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel.js');

dotenv.config({ path: '../../config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

// 连接数据库
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// 读取文件
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// 导入文件
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// 删除文件
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
