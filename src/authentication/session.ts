import session from 'express-session';
const session_config = require('../config/authentication_config').session;

declare module 'express-session' {
    interface SessionData {
        uid: string;
    }
}
export = session(session_config);
