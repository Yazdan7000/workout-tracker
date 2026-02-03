/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints (register, login, password reset)
 */

/**
 * =========================
 * Schemas
 * =========================
 * @swagger
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       required: [userName, password, fullName]
 *       properties:
 *         userName:
 *           type: string
 *           example: "ali123"
 *         password:
 *           type: string
 *           example: "MyPass@123"
 *         fullName:
 *           type: string
 *           example: "Ali Ahmadi"
 *
 *     LoginInput:
 *       type: object
 *       required: [userName, password]
 *       properties:
 *         userName:
 *           type: string
 *           example: "ali123"
 *         password:
 *           type: string
 *           example: "MyPass@123"
 *
 *     AuthUserPublic:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65a8f8f5f2c2a2b3c4d5e6f7"
 *         userName:
 *           type: string
 *           example: "ali123"
 *         fullName:
 *           type: string
 *           example: "Ali Ahmadi"
 *         role:
 *           type: string
 *           enum: [admin, user, superAdmin]
 *           example: "user"
 *         isActive:
 *           type: boolean
 *           example: true
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "login successfully"
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             user:
 *               $ref: "#/components/schemas/AuthUserPublic"
 *
 *     SimpleSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "User created successfully"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "invalid username or password"
 *         statusCode:
 *           type: integer
 *           example: 401
 */

/**
 * =========================
 * /api/auth/register (POST)
 * =========================
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Creates a new user in the system. Returns user info (no token by default)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterInput"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SimpleSuccess"
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * =========================
 * /api/auth/login (POST)
 * =========================
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Returns JWT token + public user info
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginInput"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LoginResponse"
 *       401:
 *         description: Invalid username or password
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
