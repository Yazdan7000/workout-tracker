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
 *       example: "65a8f8f5f2c2a2b3c4d5e6f7"
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-01-07T07:25:58.041Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-01-07T07:25:58.041Z"
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
 * vanta-api ApiFeatures query params (common)
 * =========================
 * @swagger
 * components:
 *   parameters:
 *     PageParam:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         minimum: 1
 *       required: false
 *       description: Page number (pagination)
 *       example: 1
 *     LimitParam:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *       required: false
 *       description: Page size (pagination)
 *       example: 10
 *     SortParam:
 *       in: query
 *       name: sort
 *       schema:
 *         type: string
 *       required: false
 *       description: Sort by fields. Comma-separated. Prefix `-` for desc. Example `createdAt,-title`
 *       example: "createdAt,-title"
 *     FieldsParam:
 *       in: query
 *       name: fields
 *       schema:
 *         type: string
 *       required: false
 *       description: Select returned fields. Comma-separated. Example `title,duration,isActive`
 *       example: "title,duration,isActive"
 *     PopulateParam:
 *       in: query
 *       name: populate
 *       schema:
 *         type: string
 *       required: false
 *       description: Populate referenced fields (if any). Comma-separated.
 *       example: ""
 *     AdvancedFilterParam:
 *       in: query
 *       name: _filters
 *       schema:
 *         type: string
 *       required: false
 *       description: |
 *         Advanced filtering via query params (if supported by your ApiFeatures).
 *         Example:
 *         - `isActive=true`
 *         - `duration[gte]=30`
 *         - `title[regex]=body`
 *       example: "Use real query params; see description."
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
 *     description: |
 *       Public endpoint (no admin required).
 *
 *       Validator supports:
 *       - page, limit, search (string), sort (string), fields (string), isActive (boolean)
 *
 *     parameters:
 *       - $ref: "#/components/parameters/PageParam"
 *       - $ref: "#/components/parameters/LimitParam"
 *       - $ref: "#/components/parameters/SortParam"
 *       - $ref: "#/components/parameters/FieldsParam"
 *       - $ref: "#/components/parameters/PopulateParam"
 *       - $ref: "#/components/parameters/AdvancedFilterParam"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search string (title)
 *         example: "Full Body"
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         required: false
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
 *                 results: 2
 *                 page: 1
 *                 limit: 10
 *                 data:
 *                   - _id: "65a8f8f5f2c2a2b3c4d5e6f7"
 *                     title: "Full Body Workout"
 *                     description: "تمرین کامل بدن برای مبتدی‌ها"
 *                     duration: 45
 *                     isActive: true
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
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
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
 *       - $ref: "#/components/parameters/FieldsParam"
 *       - $ref: "#/components/parameters/PopulateParam"
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
 *                   _id: "65a8f8f5f2c2a2b3c4d5e6f7"
 *                   title: "Full Body Workout"
 *                   description: "تمرین کامل بدن برای مبتدی‌ها"
 *                   duration: 45
 *                   isActive: true
 *       422:
 *         description: Validation error (invalid id)
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
 *         description: Workout id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateWorkoutInput"
 *     responses:
 *       201:
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
 *       422:
 *         description: Validation error
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
 *         description: Workout id
 *     responses:
 *       201:
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
 *       422:
 *         description: Validation error (invalid id)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
