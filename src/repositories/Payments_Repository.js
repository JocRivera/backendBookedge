import { Payments } from "../models/Payments_Model.js";
import { Reservations } from "../models/Reservations_Model.js";

export const getAllPayments = async () => {
  return await Payments.findAll({
    include: [{ model: Reservations, as: "reservations" }], 
  });
};

export const createPayment = async (paymentData) => {
  return await Payments.create(paymentData);
};

export const getPaymentById = async (id) => {
  return await Payments.findByPk(id, {
    include: [{ model: Reservations, as: "reservations" }], 
  });
};

export const updatePayment = async (id, paymentData) => {
  const [updated] = await Payments.update(paymentData, {
    where: { id },
  });
  return updated;
};

export const deletePayment = async (id) => {
  return await Payments.destroy({
    where: { id },
  });
};

export const getPaymentByReservationId = async (reservation_id) => {
  return await Payments.findOne({
    where: { reservation_id },
    include: [{ model: Reservations, as: "reservations" }], 
  });
};