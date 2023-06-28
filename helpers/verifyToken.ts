import { headers } from 'next/headers';
import tokenStatus from './tokenStatus';

const verifyToken = async () => {
    const headersList = headers();
    const authorization = headersList.get('Authorization');
    const token = authorization ? authorization.replace("Bearer ", "") : null;
    let tokenVerify = null;
    if(token) {
        const status = await tokenStatus(token);
        tokenVerify = status; 
    } else {
        tokenVerify = "Token is missing, make sure you are authenticated"
    }
    return tokenVerify;
}

export default verifyToken;