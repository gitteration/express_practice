import express from 'express';
import user_controller from '../../controllers/auth/user';
const router = express.Router();

/**
 * @swagger
 *  tags: 
 *   name: Users
 *   description: Users restful
 */

 /**
  * @swagger
  * paths:
  *  /auth/users:
  *   post:
  *     tags: [Users]
  *     summary: create
  *     parameters:
  *       - name: code
  *         type: string
  *         description: 유저 생성
  *     responses:
  *       "200":
  *         description: 유저 생성 성공!
  *         contnet:
  *           application:json
  * 
  *   delete:
  *     tags: [Users]
  *     summary: delete
  *     parameters:
  *       - name: code
  *         in: Post
  *         type: string
  *         description: 유저 삭제
  *     responses:
  *       "200":
  *         discription: 유저 삭제 성공!
  *         contnet:
  *           application:json
  */


router.post('/users', user_controller.createUser);					// create user
router.post('/users/status', user_controller.login);				// login
router.put('/users/status', user_controller.logout);				// logout
router.put('/users/password', user_controller.update.password);		// update user password
router.delete('/users', user_controller.deleteUser);				// delete user 

export = router;





