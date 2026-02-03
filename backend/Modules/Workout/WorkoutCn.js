import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Workout from "./WorkoutMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const { search = null } = req.query;
  const feature = new ApiFeatures(Workout, req.query, req.role)
    .addManualFilters(
      search
        ? {
            title: {
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
  const result = await feature.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Workout, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .sort()
    .limitFields()
    .filter()
    .paginate()
    .populate();
  const result = await feature.execute();
  if (!result?.data?.length)
    return next(new HandleERROR("workout not found", 404));
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res, next) => {
  const { title, description, duration, isActive } = req.body;
  const workout = await Workout.create({
    title,
    description,
    duration,
    isActive,
  });
  return res.status(201).json({
    success: true,
    message: "workout created successfully",
    data: workout,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);
  if (!workout) {
    return next(new HandleERROR("workout not found", 404));
  }
  const { title, description, duration, isActive } = req.body;

  workout.title = title ?? workout.title;
  workout.description = description ?? workout.description;
  workout.duration = duration ?? workout.duration;
  workout.isActive = isActive ?? workout.isActive;

  const updateWorkout = await workout.save();

  return res.status(200).json({
    success: true,
    message: "workout update successfully",
    data: updateWorkout,
  });
});

export const remove = catchAsync(async (req, res, next) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return next(new HandleERROR("workout not found", 404));
  return res.status(200).json({
    success: true,
    message: "workout delete successfully",
    data: workout,
  });
});
