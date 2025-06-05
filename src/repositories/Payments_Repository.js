import { Payments } from "../models/Payments_Model.js";

import { Reservations } from "../models/Reservations_Model.js";


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

export const getReservationPayments = async (idReservation) => {
  try {
    const reservations = await Reservations.findByPk(idReservation, {
      include: [{
        model: Payments,
        as: 'payments',
        attributes: [
          'idPayments',
          'paymentMethod',
          'paymentDate',
          'amount',
          'status',
          'confirmationDate',
          'voucher',
          'voucherType'
        ]
      }]
    });

    return reservations ? reservations.payments : [];
  } catch (error) {
    console.error('Error en getReservationPayments:', error);
    throw error;
  }
};

export const changeStatusPayments = async (id,status)=>{
  return await Payments.update({status}, {where: {idPayments: id}})
}