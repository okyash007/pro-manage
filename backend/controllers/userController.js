import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { z } from "zod";
import { hashPassword, matchPassword } from "../utils/hashPassword.js";
import User from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    ),
});

const userRegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    ),
});

const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  );

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  expires: new Date(253402300000000),
};

export const userLogin = asyncHandler(async (req, res, next) => {
  const isValid = userLoginSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const existUser = await User.findOne({ email: isValid.data.email });

  if (existUser) {
    const isPasswordCorrect = matchPassword(
      isValid.data.password,
      existUser.password
    );

    if (!isPasswordCorrect) {
      return next(new apiError(400, "Credentials are not correct"));
    }

    const acessToken = createToken(existUser._id);

    return res.json(new apiResponse(200, { existUser, acessToken }));
  } else if (!existUser) {
    return next(new apiError(400, "user does'nt exist"));
  }
});

export const userRegister = asyncHandler(async (req, res, next) => {
  const isValid = userRegisterSchema.safeParse(req.body);

  if (!isValid.success) {
    return next(new apiError(400, "Invalid Inputs"));
  }

  const existUser = await User.findOne({ email: isValid.data.email });

  const hashedPassword = hashPassword(isValid.data.password);

  if (existUser) {
    return next(new apiError(400, "user already exists"));
  } else if (!existUser) {
    const newUser = new User({
      name: isValid.data.name,
      email: isValid.data.email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json(new apiResponse(200, newUser));
  }
});

export const auth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.json(new apiResponse(200, user));
});

export const editUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const { name, oldPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  if (name) {
    user.name = name;
  }

  if (oldPassword && newPassword) {
    const isNewPasswordValid = passwordSchema.safeParse(newPassword);

    if (!isNewPasswordValid.success) {
      return next(new apiError(400, "new password is not valid"));
    }
    const isOldPasswordCorrect = matchPassword(oldPassword, user.password);

    if (!isOldPasswordCorrect) {
      return next(new apiError(400, "Old password is not correct"));
    }

    const newHashPassword = hashPassword(newPassword);
    user.password = newHashPassword;
  }

  await user.save();

  const updatedUser = { ...user._doc };

  const { password, ...rest } = updatedUser;

  return res.json(new apiResponse(200, rest));
});
