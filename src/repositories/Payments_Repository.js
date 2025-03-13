import { where } from "sequelize";
import { Payments } from "../models/Payments_Model.js";

export const getAllPayments = async () => {
  return await Payments.findAll()
};

export const createPayment = async (paymentData) => {
  return await Payments.create(paymentData);
};

export const getPaymentById = async (id) => {
  return await Payments.findByPk()
};

export const updatePayment = async (id, paymentData) => {
   return await Payments.update(paymentData, {where: {idPayments: id}});
};

export const deletePayment = async (id) => {
  return await Payments.destroy({where: {idPayments: id}})
};

