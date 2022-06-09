import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import routers from './src/routes/index';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(
    session({
        secret: 'keyboard cat',
        rolling : false,                // 요청 시 쿠키 유지 시간을 리셋하는 옵션
        cookie: { 
            httpOnly:true,               
            path : '/',                  // 쿠키를 적용할 route 설정
            secure: true,                // 보안을 위해 true 권장 
            maxAge : 60 * 60 * 10**3     // 쿠키 유지 시간 => 60분
        }
    }),
);

declare module 'express-session' {
    interface SessionData {
        uid: string;
    }
}


// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './src/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router import
app.use(routers);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err:Error , req: Request, res: Response, next: NextFunction) {
    res.render('error', {error:err});
});

app.listen(port, () => {
    console.log(`port : ${port}`);
 });
 
export = app;
