import { database } from "./src/config/database.js";
import { Cabins } from "./src/models/Cabin_Model.js";
import { CabinImages } from "./src/models/CabinImage_Model.js";
import { Bedrooms } from "./src/models/bedrooms_Model.js";
import { RoomImages } from "./src/models/RoomImage_Model.js";

async function migrateAllImages() {
  try {
    console.log("Iniciando migración completa de imágenes...");
    
    // 1. Sincronizar todos los modelos
    await database.sync();
    
    // 2. Migración de imágenes de cabañas
    console.log("\n=== Migrando imágenes de cabañas ===");
    const cabins = await Cabins.findAll();
    console.log(`Encontradas ${cabins.length} cabañas`);
    
    for (const cabin of cabins) {
      if (cabin.imagen) {
        await CabinImages.create({
          idCabin: cabin.idCabin,
          imagePath: cabin.imagen,
          isPrimary: true
        });
        console.log(`✅ Cabaña ID ${cabin.idCabin} migrada`);
      }
    }
    
    // 3. Migración de imágenes de habitaciones
    console.log("\n=== Migrando imágenes de habitaciones ===");
    const bedrooms = await Bedrooms.findAll();
    console.log(`Encontradas ${bedrooms.length} habitaciones`);
    
    for (const room of bedrooms) {
      if (room.imagen) {
        await RoomImages.create({
          idRoom: room.idRoom,  // Asegúrate que el campo se llame idRoom en Bedrooms
          imagePath: room.imagen,
          isPrimary: true
        });
        console.log(`✅ Habitación ID ${room.idRoom} migrada`);
      }
    }
    
    console.log("\n🎉 Migración completada con éxito para ambas entidades");
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
  } finally {
    await database.close();
    process.exit();
  }
}

migrateAllImages();