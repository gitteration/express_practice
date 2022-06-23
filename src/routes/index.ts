import express from 'express';
import userRouter from './auth/user';
import { Request, Response, NextFunction } from 'express';
import swagger_ui from 'swagger-ui-express';
import swagger_jsdoc from 'swagger-jsdoc';
const swagger_config = require('./../config/swagger.json');
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => res.render('index'));
router.use('/auth', userRouter);

//swagger
router.use('/api-documents', swagger_ui.serve, swagger_ui.setup(swagger_jsdoc(swagger_config)));

export = router;




