import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

// Ensure upload directories exist
const uploadDir = path.join(process.cwd(), 'uploads');
const categoriesDir = path.join(uploadDir, 'categories');
const placesDir = path.join(uploadDir, 'places');
const eventsDir = path.join(uploadDir, 'events');

[uploadDir, categoriesDir, placesDir, eventsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = uploadDir;
    
    // Determine destination based on upload type
    switch (req.baseUrl) {
      case '/api/categories':
        dest = categoriesDir;
        break;
      case '/api/places':
        dest = placesDir;
        break;
      case '/api/events':
        dest = eventsDir;
        break;
    }
    
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WebP are allowed.'), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Image processing middleware
export const processImage = async (req: any, res: any, next: any) => {
  if (!req.file) return next();

  try {
    const processedFilename = `processed-${req.file.filename}`;
    const outputPath = path.join(req.file.destination, processedFilename);

    await sharp(req.file.path)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Delete original file
    fs.unlinkSync(req.file.path);

    // Update req.file with processed file info
    req.file.filename = processedFilename;
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    next(error);
  }
};

export default upload;