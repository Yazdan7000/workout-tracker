/**
 * @swagger
 * tags:
 *   - name: Exercises
 *     description: Exercise CRUD (public read, admin write)
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
 *     Exercise:
 *       type: object
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Exercise title (unique, lowercase)
 *           example: "push ups"
 *         description:
 *           type: string
 *           description: Exercise description
 *           example: "upper body strength exercise"
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
 *     CreateExerciseInput:
 *       type: object
 *       required: [title]
 *       properties:
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "push ups"
 *         description:
 *           type: string
 *           example: "upper body strength exercise"
 *         isActive:
 *           type: boolean
 *           example: true
 *
 *     UpdateExerciseInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "push ups advanced"
 *         description:
 *           type: string
 *           example: "advanced upper body workout"
 *         isActive:
 *           type: boolean
 *           example: false
 *
 *     ExerciseWriteResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "exercise created successfully"
 *         data:
 *           $ref: "#/components/schemas/Exercise"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "you don't have a permission"
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
 *       description: Sort by fields. Comma-separated. Prefix `-` for desc.
 *       example: "createdAt,-title"
 *     FieldsParam:
 *       in: query
 *       name: fields
 *       schema:
 *         type: string
 *       required: false
 *       description: Select returned fields. Comma-separated.
 *       example: "title,description,isActive"
 *     PopulateParam:
 *       in: query
 *       name: populate
 *       schema:
 *         type: string
 *       required: false
 *       description: Populate referenced fields (if any)
 *       example: ""
 *     AdvancedFilterParam:
 *       in: query
 *       name: _filters
 *       schema:
 *         type: string
 *       required: false
 *       description: Advanced filtering via query params
 */

/**
 * =========================
 * /api/exercises (GET)
 * =========================
 * @swagger
 * /api/exercises:
 *   get:
 *     tags: [Exercises]
 *     summary: Get all exercises
 *     description: |
 *       Public endpoint.
 *
 *       Supports:
 *       - pagination
 *       - sorting
 *       - field limiting
 *       - search (title regex)
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
 *         description: Search by exercise title
 *         example: "push"
 *     responses:
 *       200:
 *         description: Exercises fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: vanta-api execute() response
 *       422:
 *         description: Validation error
 */

/**
 * =========================
 * /api/exercises (POST)
 * =========================
 * @swagger
 * /api/exercises:
 *   post:
 *     tags: [Exercises]
 *     summary: Create exercise (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateExerciseInput"
 *     responses:
 *       201:
 *         description: Exercise created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ExerciseWriteResponse"
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */

/**
 * =========================
 * /api/exercises/{id} (GET)
 * =========================
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     tags: [Exercises]
 *     summary: Get one exercise
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/MongoId"
 *     responses:
 *       200:
 *         description: Exercise fetched
 *       422:
 *         description: Invalid id
 */

/**
 * =========================
 * /api/exercises/{id} (PATCH)
 * =========================
 * @swagger
 * /api/exercises/{id}:
 *   patch:
 *     tags: [Exercises]
 *     summary: Update exercise (Admin only)
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
 *             $ref: "#/components/schemas/UpdateExerciseInput"
 *     responses:
 *       200:
 *         description: Exercise updated
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */

/**
 * =========================
 * /api/exercises/{id} (DELETE)
 * =========================
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     tags: [Exercises]
 *     summary: Delete exercise (Admin only)
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
 *         description: Exercise deleted
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */
