import { request } from "express";
import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
  let { fullName, address, city, state, country, pincode, phoneNumber } =
    req.body;
  let userId = req.user;
  let userAdress = await Address.create({
    userId,
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber}
  );
  res.json({message: "Address Added", userAdress, success: true});
}


export const getAddress = async(req, res) => {
     let address = await Address.find({userId:req.user}).sort({createdAt: -1});
     res.json({message: 'address', userAdress: address[0]})
}
