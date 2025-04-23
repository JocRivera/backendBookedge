import { Payments } from "../models/Payments_Model.js";
import { PaymentsReservations } from "../models/Payments_Reservations_model.js";

export const getAllPayments = async () => {
  return await Payments.findAll({
    attributes: [
      'idPayments',
      'paymentMethod',
      'paymentDate',
       'amount',
       'status',
       'confirmationDate', 
       'voucher',
       'voucherType']
  });
};

export const createPayment = async (paymentData) => {
  return await Payments.create(paymentData);
};

export const getPaymentById = async (id) => {
  return await Payments.findByPk(id);
};

export const updatePayment = async (id, paymentData) => {
  const [affectedRows] = await Payments.update(paymentData, {
    where: { idPayments: id }
  });
  return affectedRows > 0 ? await getPaymentById(id) : null;
};

export const deletePayment = async (id) => {
  return await Payments.destroy({ where: { idPayments: id } });
};
export const addPaymentToReservation = async (idReservation, idPayment, amount) => {
  const transaction = await database.transaction();
  try {
    const relation = await PaymentsReservations.create({
      idReservation,
      idPayments: idPayment,
      amountApplied: amount
    }, { transaction });
    
    await transaction.commit();
    return relation;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getReservationPayments = async (reservationId) => {
  return await Payments.findAll({
    include: [
      {
        model: PaymentsReservations,
        where: { idReservation: reservationId },
        attributes: [], // Oculta columnas de la tabla intermedia si no las necesitas
      },
    ],
    attributes: [
      'idPayments',
      'paymentMethod',
      'paymentDate',
      'amount',
      'status',
      'confirmationDate',
      'voucher',
      'voucherType'
    ],
    order: [['paymentDate', 'DESC']]
  });
};
