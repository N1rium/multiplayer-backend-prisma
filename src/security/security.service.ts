import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { SaltHash } from './dto/salt-hash.dto';

@Injectable()
export class SecurityService {
  /**
   * generates random string of characters i.e salt
   * @function
   * @param {number} length - Length of the random string.
   */
  genRandomString(length): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  /**
   * hash password with sha512.
   * @function
   * @param {string} password - List of required fields.
   * @param {string} salt - Data to be validated.
   */
  sha512(password, salt): SaltHash {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt,
      hash: value,
    };
  }

  saltHashPassword(password): SaltHash {
    return this.sha512(password, this.genRandomString(16));
  }
}
