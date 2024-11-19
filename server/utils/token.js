import crypto from "crypto";

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const isTokenExpired = (expiryDate) => {
  const now = new Date();
  return now > new Date(expiryDate);
};
