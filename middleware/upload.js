const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // Remplacer les caractères spéciaux et espaces dans le nom de fichier original
    let name = file.originalname.split(' ').join('_');
    name = name.replace(/[^a-zA-Z0-9_\-\.]+/g, '_'); // Retire les caractères non-ASCII
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');
