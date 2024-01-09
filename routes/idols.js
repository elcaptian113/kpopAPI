const controller = require('../controllers/idols');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');

/**
 * @swagger
 * tags:
 *  name: Idol
 *  description: KPOP Idols table management and administration
 */

/**
 * @swagger
 * definitions:
 *  Idol:
 *      required:
 *          - stage_name
 *          - full_name
 *          - korean_name
 *          - korean_stage_name
 *          - dob
 *          - country
 *          - birthplace
 *          - other_group
 *          - gender
 *      properties:
 *          id:
 *              type: integer
 *              example: 425
 *          stage_name:
 *              type: string
 *              example: Suga  
 *          full_name:
 *              type: string
 *              example: Kim Jung Yun  
 *          korean_name:
 *              type: string
 *              example: 빅뱅
 *          korean_stage_name:
 *              type: string
 *              example: 빅뱅빅뱅   
 *          dob:
 *              type: string
 *              format: date
 *              example: 2011-12-16  
 *          country:
 *              type: string
 *              example: Korea  
 *          birthplace:
 *              type: string
 *              example: Seoul 
 *          other_group:
 *              type: integer
 *              example: BTS,BigBang   
 *          gender:
 *              type: string
 *              example: M
 *  NewIdol:
 *      required:
 *          - stage_name
 *          - full_name
 *          - korean_name
 *          - korean_stage_name
 *          - dob
 *          - country
 *          - birthplace
 *          - other_group
 *          - gender
 *      properties:
 *          stage_name:
 *              type: string
 *              example: Suga  
 *          full_name:
 *              type: string
 *              example: Kim Jung Yun  
 *          korean_name:
 *              type: string
 *              example: 빅뱅
 *          korean_stage_name:
 *              type: string
 *              example: 빅뱅빅뱅   
 *          dob:
 *              type: string
 *              format: date
 *              example: 2011-12-16  
 *          country:
 *              type: string
 *              example: Korea  
 *          birthplace:
 *              type: string
 *              example: Seoul 
 *          other_group:
 *              type: integer
 *              example: BTS,BigBang   
 *          gender:
 *              type: string
 *              example: M
 *  IdolID:
 *      required:
 *          - id
 *      properties:
 *          id:
 *              type: integer
 *              example: 425 
 *  Error:
 *      properties:
 *          status:
 *              type: integer
 *              example: 404
 *          message:
 *              type: string
 *              example: No Results found   
 */

/**
 * @swagger
 * /idols/:
 *  get:
 *      summary: Gets all KPOP Idols
 *      description: Returns all Idols
 *      tags: [Idol]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: all idols are returned
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Idol'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /idols/{id}:
 *  get:
 *      summary: Returns an Idol using provided ID
 *      description: Returns a Idol with a provided ID
 *      tags: [Idol]
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of chosen Idol
 *            example: 3
 *      responses:
 *          200:
 *             description: returns specified Idol
 *             schema:
 *                  type: object
 *                  $ref: '#/definitions/Idol'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /idols/name/{value}:
 *  get:
 *      summary: Returns a Idol using provided name
 *      description: Returns a Idol  with a provided name
 *      tags: [Idol]
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: value
 *            schema:
 *              type: string
 *            required: true
 *            description: Name of chosen Idol
 *            example: Suga
 *      responses:
 *          200:
 *              description: returns specified Idol
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Idol'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.get('/name/:value', controller.getByGroup);

/**
 * @swagger
 * /idols/:
 *  post:
 *      summary: Adds a new Idol
 *      description: Adds an Idol
 *      tags: [Idol]
 *      parameters:
 *          - in: body
 *            name: idols
 *            schema:
 *                  type: object
 *                  $ref: '#/definitions/NewIdol'
 *      responses:
 *          201:
 *              description: Adds new Idol
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/NewIdol'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.post('/', upload.single("image"),controller.create);

/**
 * @swagger
 * /idols/:
 *  put:
 *      summary: Updates Idols using provided ID
 *      description: Updates an Idol with a provided ID
 *      tags: [Idol]
 *      parameters:
 *          - in: body
 *            name: idols
 *            schema:
 *                  type: object
 *                  $ref: '#/definitions/Idol'
 *      responses:
 *          201:
 *              description: Updates specified Idol
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Idol'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.put('/', upload.single("image"),controller.update);

/**
 * @swagger
 * /idols/:
 *  delete:
 *      summary: Deletes an Idol using provided ID
 *      description: Deletes an Idol with a provided ID
 *      tags: [Idol]
 *      parameters:
 *          - in: body
 *            name: id
 *            schema:
 *              type: object
 *              $ref: '#/definitions/IdolID'
 *            required: true
 *            description: ID of chosen Idol
 *            example: 3
 *      responses:
 *          200:
 *             description: Deletes specified Idol
 *             schema:
 *                  type: object
 *                  $ref: '#/definitions/Idol'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.delete('/', controller.deleting);

module.exports = router;