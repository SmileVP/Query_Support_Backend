//bcrypt for hashing password
const bcrypt = require("bcryptjs");

//jwt for authentication
const jwt = require("jsonwebtoken");

require("dotenv").config();

//Hashing to turn password (or any other piece of data) into a short string of letters and/or numbers using an encryption algorithm.
const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

//hashCompare returns true or false
const hashCompare = (password, hash) => {
  return bcrypt.compare(password, hash);
};

//firstName,lastName, email, role all this are payload sent as object
const createToken = ({ firstName, lastName, email }) => {
  let token = jwt.sign({ firstName, lastName, email }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE,
  });

  return token;
};

//for decoding token
const decodeToken = (token) => {
  let data = jwt.decode(token);
  return data;
};

//decode forgot password token
const decodePasswordToken = (token) => {
  let data = jwt.decode(token);
  return data;
};

module.exports = {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  decodePasswordToken,
};
