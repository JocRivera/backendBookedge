import { param } from "express-validator";

export const validateRoomId = [
  param("roomId")
    .isInt()
    .withMessage("El ID de la habitación debe ser un número entero")
];

export const validateImageId = [
  param("imageId")
    .isInt()
    .withMessage("El ID de la imagen debe ser un número entero")
];