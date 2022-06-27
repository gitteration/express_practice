import express from 'express';
import user_controller from '../../controllers/auth/user';
const router = express.Router();

router.post('/users', user_controller.createUser);					// create user
router.delete('/users', user_controller.deleteUser);				// delete user 
router.post('/users/status', user_controller.login);				// login
router.put('/users/status', user_controller.logout);				// logout
router.put('/users/password', user_controller.update.password);		// update user password

export = router;





