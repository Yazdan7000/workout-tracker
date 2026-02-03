import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "./UserMd.js";
import bcryptjs from "bcryptjs";
export const getAll = catchAsync(async (req, res, next) => {
  const { search = null } = req?.query;
  const features = new ApiFeatures(User, req.query, req.role)
    .addManualFilters(
      search
        ? {
            userName: {
              $regex: search,
              $options: "i",
            },
          }
        : {},
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .addManualFilters(
      req.role == "user" ? { _id: req.userId } : { _id: req.params.id },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const update = catchAsync(async (req, res, next) => {
  const { isActive = "null", role = null, fullName = null } = req.body;
  const { id } = req.params;
  if (req.role == "user" && id.toString() != req.userId.toString()) {
    return next(new HandleERROR("you permission for update this account", 403));
  }
  const user = await User.findById(id);
  if (!user) return next(new HandleERROR("User not found", 404));

  if (
    req.role == "admin" &&
    id.toString() != req.userId.toString() &&
    user.role == "admin"
  ) {
    return next(new HandleERROR("you permission for update this account", 403));
  }
  if (req.role != "user") {
    user.isActive = isActive == "null" ? user.isActive : isActive;
    user.role = role || user?.role;
  }
  user.fullName = fullName || user?.fullName;
  const newUser = await user.save();
  return res.status(200).json({
    success: true,
    message: "user Updated successfully",
    data: newUser,
  });
});

export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.userId);
  if (!user) {
    return next(new HandleERROR("user not found", 404));
  }
  if (!user.password) {
    user.password = bcryptjs.hashSync(newPassword, 10);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "password set successfully",
    });
  }
  if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {
    return next(
      new HandleERROR("oldPassword and newPassword are required", 400),
    );
  }
  const isMatch = bcryptjs.compareSync(oldPassword, user.password);
  if (!isMatch) {
    return next(new HandleERROR("old password is incorrect", 400));
  }
  user.password = bcryptjs.hashSync(newPassword, 10);
  await user.save();
  return res.status(200).json({
    success: true,
    message: "password set successfully",
  });
});
