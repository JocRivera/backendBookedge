import {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getAllPayments,
    getReservationPayments
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
  export const addPaymentToReservationService = async (idReservation, paymentData) => {

    const payment = await createPayment(paymentData);
    
    await addPaymentToReservation(idReservation, payment.idPayments, paymentData.amount);
    
    return payment;
  };
  
  export const getReservationPaymentsService = async (idReservation) => {
    return await getReservationPayments(idReservation);
  };
  