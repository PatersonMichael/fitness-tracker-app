import crypto from 'crypto';

export interface SaltHash {
    salt: string;
    hash: string;
}

export class Encryption {
    // Method to set salt and hash the password for a user
    // setPassword method first creates a salt unique for every user
    // then it hashes the salt with user password and creates a hash
    // this hash is stored in the database as user password
    public async saltAndHashPassword(password: string): Promise<SaltHash> {
        // Creat a unique salt
        const salt: string = crypto.randomBytes(16).toString('hex');

        // Hashing salt and password with 1000 iterations,  64 length and sha512 digest
        const hash: string = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

        const saltHash: SaltHash = {salt: salt, hash: hash};

        return saltHash;
    };

    // Method to check the entered password is correct or not    
    // It takes the user password from the request 
    // and salt from user database entry
    // It then hashes user password and salt
    // then checks if this generated hash is equal
    // to user's hash in the database or not
    // If the user's hash is equal to generated hash 
    // then the password is correct otherwise not
    public async verifyPassword(password: string, salt: string, hash: string): Promise<boolean> {
        const compareHash: string = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

        return hash === compareHash;
    };
}
