import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Exercise from "./ExerciseMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const { search = null } = req.query;
  const feature = new ApiFeatures(Exercise, req.query, req.role)
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
    .sort()
    .filter()
    .limitFields()
    .paginate()
    .populate();
  const result = await feature.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(Exercise, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .sort()
    .limitFields()
    .filter()
    .paginate()
    .populate();
  const result = await feature.execute();
  return res.status(200).json(result);
});

export const create = catchAsync(async (req,res,next) => {
    const {title,description,isActive} = req.body
    const exercise = await Exercise.create({title,description,isActive})
    return res.status(201).json({
        success:true,
        message:"exercise create successfully",
        data:exercise
    })
})

export const update = catchAsync(async (req,res,next) => {
    const {title,description,isActive} = req.body
    const exercise = await Exercise.findById(req.params.id)
    if (!exercise) return next(new HandleERROR("exercise not found",404))
    
    exercise.title=title ?? exercise.title
    exercise.description=description ?? exercise.description
    exercise.isActive=isActive ?? exercise.isActive

    const updateExercise = await exercise.save()

    return res.status(200).json({
        success:true,
        message:"exercise update is successfully",
        data:updateExercise
    })
})

export const remove = catchAsync(async (req,res,next) => {
    const exercise = await Exercise.findByIdAndDelete(req.params.id)
    if(!exercise) return next(new HandleERROR("exercise not found",404))
    
    return res.status(200).json({
        success:true,
        message:"exercise deleted successfully",
        data:exercise
    })
})