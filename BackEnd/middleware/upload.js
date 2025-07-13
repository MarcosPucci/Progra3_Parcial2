import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'img')); // Guarda en BackEnd/public/
  },
  filename: (req, file, cb) => {
    // Genera nombre único con timestamp
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Solo permite imágenes
    if (file.mimetype.startsWith('image/')) { // Mimetype: Es como el dni de las imagenes (en este caso que el tipo sea: "imagen")
      cb(null, true); // Corrobora que es una imagen, y ejecuta la logica de la subida de imagenes
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false); // (No es una imagen) Tira error, y no maneja la logica de subida de imagenes.
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5MB
  }
});

export default upload; 