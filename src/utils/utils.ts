import crypto from 'crypto';

export const createPbkdf2 = (password:String, salt:any) => crypto.pbkdf2Sync(password, salt, 94000, 64, "sha512");
export const createRandomByteBase64 = () => crypto.randomBytes(64).toString('base64');