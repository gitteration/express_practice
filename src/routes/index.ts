import express from 'express';
import userRouter from './auth/user';
import { Request, Response, NextFunction } from 'express';
import swagger_ui from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const swagger_spec = YAML.load(path.join(__dirname,'./../config/swagger/swagger.yaml'));
const router = express.Router();

// index 
// 바로 api-documents로 넘겨버리자
router.get('/', (req:Request, res:Response, next:NextFunction) => res.render('index'));

// auth 
router.use('/auth', userRouter);

//swagger
router.use('/api-documents', swagger_ui.serve, swagger_ui.setup(swagger_spec));

export = router;




