"use server"

import {
    randomBytes,
    createCipheriv,
    createDecipheriv
} from 'crypto';


export const encryptToken = async (token: string) => {
    const algorithm = 'aes-256-cbc';
    const iv = randomBytes(16).toString('hex').substring(0, 16);

    const cipher = createCipheriv(algorithm, process.env.TOKEN_ENCRYPT_KEY as string, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        token_iv: iv as string,
        encrypted_access_token: encrypted as string
    };
}

export const decryptToken = async (token: string, iv: string) => {
    const algorithm = 'aes-256-cbc';
    const decipher = createDecipheriv(algorithm, process.env.TOKEN_ENCRYPT_KEY as string, iv);

    let decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
