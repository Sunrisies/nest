import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
let staticFolder;
let uploadsFolder;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      staticFolder = path.join('static', 'my-uploads');
      console.log(process.cwd(), 'process.cwd()');
      uploadsFolder = path.join(process.cwd(), staticFolder);

      // 如果static文件夹不存在，则创建它
      if (!fs.existsSync('static')) {
        fs.mkdirSync('static');
      }

      // 如果my-uploads文件夹不存在，则创建它
      if (!fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
      }

      cb(null, uploadsFolder);
    } catch (e) {
      console.log(e, '创建文件夹失败');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export { storage, staticFolder };
