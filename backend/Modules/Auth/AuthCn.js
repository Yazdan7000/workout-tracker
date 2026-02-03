import { catchAsync, HandleERROR } from "vanta-api";
import User from "./../User/UserMd.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = catchAsync(async (req, res, next) => {
  const { userName, password,fullName } = req.body;
  const userNameExist = await User.findOne({ userName });
  if (userNameExist)
    return next(new HandleERROR("username already exist", 400));
  const hashPassword = bcryptjs.hashSync(password, 10);
  const user = await User.create({ userName, password: hashPassword,fullName });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  return res.status(201).json({
    success: true,
    message: "register user successfully",
    data: {
      token,
      information: {
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        role: user.role,
      },
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({userName}).select("+password");
  if (!user) return next(new HandleERROR("user not found", 404));
  if (!user.isActive)
    return next(new HandleERROR("user is inactive you can,t login", 403));

  const isMatchPassword = bcryptjs.compareSync(password, user.password);
  if (!isMatchPassword) return next(new HandleERROR("invalid password", 401));

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
  );

  return res.status(200).json({
    success: true,
    message: "login successfully",
    data: token,
  });
});
