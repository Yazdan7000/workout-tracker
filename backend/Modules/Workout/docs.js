/**
 * @swagger
 * tags:
 *   - name: Workout
 *     description: Workout CRUD (public read, admin write)
 */

/**
 * =========================
 * Schemas
 * =========================
 * @swagger
 * components:
 *   schemas:
 *     MongoId:
 *       type: string
 *       description: MongoDB ObjectId
 *       example: "69832e315de4e6b721a24435"
 *
 *     Exercise:
 *       type: object
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         title:
 *           type: string
 *           example: "Push Ups"
 *         description:
 *           type: string
 *           example: "Upper body exercise"
 *
 *     Workout:
 *       type: object
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Workout title (unique)
 *           example: "Full Body Workout"
 *         description:
 *           type: string
 *           description: Workout description
 *           example: "تمرین کامل بدن برای مبتدی‌ها"
 *         duration:
 *           type: number
 *           description: Workout duration in minutes
 *           example: 45
 *         isActive:
 *           type: boolean
 *           default: true
 *           example: true
 *         exercises:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Exercise"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-02-04T11:32:01.140Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-02-04T11:32:01.140Z"
 *
 *     CreateWorkoutInput:
 *       type: object
 *       required: [title, duration]
 *       properties:
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Full Body Workout"
 *         description:
 *           type: string
 *           example: "تمرین کامل بدن برای مبتدی‌ها"
 *         duration:
 *           type: number
 *           example: 45
 *         isActive:
 *           type: boolean
 *           example: true
 *         exercises:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/MongoId"
 *
 *     UpdateWorkoutInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Full Body Workout (Updated)"
 *         description:
 *           type: string
 *           example: "Updated description"
 *         duration:
 *           type: number
 *           example: 50
 *         isActive:
 *           type: boolean
 *           example: false
 *         exercises:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/MongoId"
 *
 *     WorkoutWriteResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Workout created successfully"
 *         data:
 *           $ref: "#/components/schemas/Workout"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "you don't have permission"
 *         statusCode:
 *           type: integer
 *           example: 401
 */

/**
 * =========================
 * /api/workouts (GET)
 * =========================
 * @swagger
 * /api/workouts:
 *   get:
 *     tags: [Workout]
 *     summary: Get all workouts
 *     description: Public endpoint. Supports search, pagination, filters.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page size
 *         example: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (prefix '-' for desc)
 *         example: "createdAt,-title"
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Comma separated fields to return, include 'exercises'
 *         example: "title,duration,isActive,exercises"
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *         description: Populate referenced fields
 *         example: "exercises"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title
 *         example: "Push"
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active workouts
 *         example: true
 *     responses:
 *       200:
 *         description: Workouts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 results: 5
 *                 page: 1
 *                 limit: 10
 *                 data:
 *                   - _id: "69832e315de4e6b721a24435"
 *                     title: "Squats"
 *                     description: "Lower body workout"
 *                     duration: 20
 *                     isActive: true
 *                     exercises:
 *                       - _id: "69832e315de4e6b721a2442f"
 *                         title: "Squats"
 *                         description: "Lower body exercise"
 */

/**
 * =========================
 * /api/workouts/{id} (GET)
 * =========================
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     tags: [Workout]
 *     summary: Get single workout
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/MongoId"
 *         description: Workout id
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *         description: Populate exercises
 *         example: "exercises"
 *     responses:
 *       200:
 *         description: Workout fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 data:
 *                   _id: "69832e315de4e6b721a24435"
 *                   title: "Squats"
 *                   description: "Lower body workout"
 *                   duration: 20
 *                   isActive: true
 *                   exercises:
 *                     - _id: "69832e315de4e6b721a2442f"
 *                       title: "Squats"
 *                       description: "Lower body exercise"
 */

/**
 * =========================
 * /api/workouts (POST)
 * =========================
 * @swagger
 * /api/workouts:
 *   post:
 *     tags: [Workout]
 *     summary: Create workout (Admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateWorkoutInput"
 *     responses:
 *       201:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/WorkoutWriteResponse"
 *       401:
 *         description: Unauthorized / no permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * =========================
 * /api/workouts/{id} (PATCH)
 * =========================
 * @swagger
 * /api/workouts/{id}:
 *   patch:
 *     tags: [Workout]
 *     summary: Update workout (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/MongoId"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateWorkoutInput"
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/WorkoutWriteResponse"
 *       401:
 *         description: Unauthorized / no permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * =========================
 * /api/workouts/{id} (DELETE)
 * =========================
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     tags: [Workout]
 *     summary: Delete workout (Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/MongoId"
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/WorkoutWriteResponse"
 *       401:
 *         description: Unauthorized / no permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
