/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management (Admin list, logged-in user read/update, password change)
 */

/**
 * =============== Common Schemas ===============
 * @swagger
 * components:
 *   schemas:
 *     MongoId:
 *       type: string
 *       description: MongoDB ObjectId
 *       example: "65a8f8f5f2c2a2b3c4d5e6f7"
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         userName:
 *           type: string
 *           description: Unique username
 *           example: "ali123"
 *         fullName:
 *           type: string
 *           maxLength: 100
 *           example: "Ali Ahmadi"
 *         role:
 *           type: string
 *           enum: [admin, user, superAdmin]
 *           default: user
 *           example: "user"
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
 *     UpdateUserInput:
 *       type: object
 *       description: Allowed fields depend on role (see endpoint notes)
 *       properties:
 *         fullName:
 *           type: string
 *           maxLength: 100
 *           example: "Ali Ahmadi"
 *         isActive:
 *           type: boolean
 *           example: true
 *         role:
 *           type: string
 *           enum: [admin, user, superAdmin]
 *           example: "admin"
 *
 *     ChangePasswordInput:
 *       type: object
 *       required: [newPassword]
 *       properties:
 *         oldPassword:
 *           type: string
 *           description: Required only if user already has a password set
 *           example: "OldPass@123"
 *         newPassword:
 *           type: string
 *           minLength: 8
 *           example: "NewPass@123"
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
 *
 *     SuccessMessage:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "password set successfully"
 *
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "user Updated successfully"
 *         data:
 *           $ref: "#/components/schemas/User"
 */

/**
 * =============== /api/users (GET) ===============
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (Admin/SuperAdmin only)
 *     description: |
 *       Requires **admin** or **superAdmin**.
 *       Supports:
 *       - `search` (regex on `userName`)
 *       - vanta-api query: `filter`, `sort`, `fields`, `page`, `limit`, `populate`
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Regex search on username
 *         example: "ali"
 *       - $ref: "#/components/parameters/PageParam"
 *       - $ref: "#/components/parameters/LimitParam"
 *       - $ref: "#/components/parameters/SortParam"
 *       - $ref: "#/components/parameters/FieldsParam"
 *       - $ref: "#/components/parameters/PopulateParam"
 *       - $ref: "#/components/parameters/AdvancedFilterParam"
 *     responses:
 *       200:
 *         description: Users fetched successfully
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
 *                     userName: "ali123"
 *                     fullName: "Ali Ahmadi"
 *                     role: "user"
 *                     isActive: true
 *       401:
 *         description: Unauthorized / no permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * =============== /api/users/{id} (GET) ===============
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get one user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/MongoId"
 *         description: User id
 *       - $ref: "#/components/parameters/FieldsParam"
 *       - $ref: "#/components/parameters/PopulateParam"
 *       - $ref: "#/components/parameters/AdvancedFilterParam"
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 data:
 *                   _id: "65a8f8f5f2c2a2b3c4d5e6f7"
 *                   userName: "ali123"
 *                   fullName: "Ali Ahmadi"
 *                   role: "user"
 *                   isActive: true
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */

/**
 * =============== /api/users/{id} (PATCH) ===============
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user
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
 *             $ref: "#/components/schemas/UpdateUserInput"
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UpdateUserResponse"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       422:
 *         description: Validation error
 */

/**
 * =============== /api/users/change-password (PATCH) ===============
 * @swagger
 * /api/users/change-password:
 *   patch:
 *     tags: [Users]
 *     summary: Change password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ChangePasswordInput"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessMessage"
 *       400:
 *         description: Bad request (missing oldPassword / incorrect oldPassword)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       422:
 *         description: Validation error
 */
