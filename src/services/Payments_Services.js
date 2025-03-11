import {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaymentByReservationId,
    getAllPayments,
  } from "../repositories/Payments_Repository.js";

  export const getAllPaymentsService = async () => {
    return await getAllPayments();
  };
  
  export const createPaymentService = async (paymentData) => {
    return await createPayment(paymentData);
  };
  
  export const getPaymentByIdService = async (id) => {
    return await getPaymentById(id);
  };
  
  export const updatePaymentService = async (id, paymentData) => {
    return await updatePayment(id, paymentData);
  };
  
  export const deletePaymentService = async (id) => {
    return await deletePayment(id);
  };
  
  export const getPaymentByReservationIdService = async (reservation_id) => {
    return await getPaymentByReservationId(reservation_id);
  };