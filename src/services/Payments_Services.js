import {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getAllPayments,
    getReservationPayments,
    changeStatusPayments
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
  
  export const getReservationPaymentsService = async (idReservation) => {
    console.log(`Buscando pagos para reserva: ${idReservation}`);
    const payments = await getReservationPayments(idReservation);
    console.log('Pagos encontrados:', JSON.stringify(payments, null, 2));
    return payments;
  };

  export const changeStatusPaymentsService = async (id,status) => {
    console.log("id de los pagos recivido en el servicio: ", id);
    return await changeStatusPayments(id, status);
  }
  