import express from 'express';
import authRouter from './auth/user';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

// router.get('/', (req: Request, res: Response, next: NextFunction) => res.render('index'));
router.use('/auth', authRouter);

export = router;




