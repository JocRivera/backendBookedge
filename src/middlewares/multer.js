import multer from "multer";
import path from "path";

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve("./uploads"); // Ruta absoluta
    cb(null, uploadPath); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Extensión del archivo
    cb(null, `cabin-${uniqueSuffix}${ext}`); // Nombre del archivo
  },
});

// Configuración básica de Multer
const upload = multer({ storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  }
});

export default upload;