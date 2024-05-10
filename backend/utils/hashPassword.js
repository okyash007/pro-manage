import bcryptjs from "bcryptjs";

export function hashPassword(password) {
  const hashedPassword = bcryptjs.hashSync(password, 10);
  return hashedPassword;
}

export function matchPassword(password, encyptedPassword) {
  const isPasswordCorrect = bcryptjs.compareSync(password, encyptedPassword);
  return isPasswordCorrect;
}
