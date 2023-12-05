const controller = require('../controllers/band');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');


/**
 * @swagger
 * tags:
 *  name: Group
 *  description: KPOP Groups table management and administration
 */

/**
 * @swagger
 * definitions:
 *  Group:
 *      required:
 *          - name
 *          - short_name
 *          - korean_name
 *          - debut
 *          - company
 *          - current_members
 *          - original_members
 *          - fanclub_name
 *          - active
 *          - gender
 *      properties:
 *          id:
 *              type: integer
 *              example: 425
 *          name:
 *              type: string
 *              example: BigBang  
 *          short_name:
 *              type: string
 *              example: BB  
 *          korean_name:
 *              type: string
 *              example: 빅뱅  
 *          debut:
 *              type: string
 *              format: date
 *              example: 2011-12-16  
 *          company:
 *              type: string
 *              example: YG Entertainment  
 *          current_members:
 *              type: integer
 *              example: 4 
 *          original_members:
 *              type: integer
 *              example: 5  
 *          fanclub_name:
 *              type: string
 *              example:  VIPs 
 *          active:
 *              type: string
 *              example: yes  
 *          gender:
 *              type: string
 *              example: F
 *  NewGroup:
 *      required:
 *          - name
 *          - short_name
 *          - korean_name
 *          - debut
 *          - company
 *          - current_members
 *          - original_members
 *          - fanclub_name
 *          - active
 *          - gender
 *      properties:
 *          name:
 *              type: string
 *              example: BigBang  
 *          short_name:
 *              type: string
 *              example: BB  
 *          korean_name:
 *              type: string
 *              example: 빅뱅  
 *          debut:
 *              type: string
 *              format: date
 *              example: 2011-12-16  
 *          company:
 *              type: string
 *              example: YG Entertainment  
 *          current_members:
 *              type: integer
 *              example: 4 
 *          original_members:
 *              type: integer
 *              example: 5  
 *          fanclub_name:
 *              type: string
 *              example:  VIPs 
 *          active:
 *              type: string
 *              example: yes  
 *          gender:
 *              type: string
 *              example: F 
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
 * /groups/:
 *  get:
 *      summary: Gets all KPOP Groups
 *      description: Returns all Groups
 *      tags: [Group]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: all groups are returned
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Group'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /groups/{id}:
 *  get:
 *      summary: Returns a Group using provided ID
 *      description: Returns a Group with a provided ID
 *      tags: [Group]
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of chosen Group
 *            example: 3
 *      responses:
 *          200:
 *             description: returns specified Group
 *             schema:
 *                  type: object
 *                  $ref: '#/definitions/Group'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /groups/name/{value}:
 *  get:
 *      summary: Returns a Group using provided name
 *      description: Returns a Group  with a provided name
 *      tags: [Group]
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: value
 *            schema:
 *              type: string
 *            required: true
 *            description: Name of chosen Group
 *            example: BigBang
 *      responses:
 *          200:
 *              description: returns specified Group
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Group'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.get('/name/:value', controller.getByName);

/**
 * @swagger
 * /groups/:
 *  post:
 *      summary: Adds a new Group
 *      description: Adds a Group
 *      tags: [Group]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Adds new Group
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/NewGroup'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.post('/', controller.create);
/**
 * @swagger
 * /groups/:
 *  put:
 *      summary: Updates Groups using provided ID
 *      description: Updates a Group with a provided ID
 *      tags: [Group]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Updates specified Group
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Group'
 *          400:
 *              description: error
 *              schema:
 *                  type: object
 *                  $ref: '#/definitions/Error'
 */
router.put('/', controller.update);
router.delete('/', controller.deleting);

module.exports = router;