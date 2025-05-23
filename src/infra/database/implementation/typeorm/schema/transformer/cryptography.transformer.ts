import * as crypto from 'crypto';

import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/database.application-variable';

class CryptographyTransformerUtil {
  private static readonly secret =
    DatabaseApplicationVariable.DATABASE_CRYPTOGRAPHY_SECRET;
  private static readonly iv =
    DatabaseApplicationVariable.DATABASE_CRYPTOGRAPHY_IV;
  private static readonly method =
    DatabaseApplicationVariable.DATABASE_CRYPTOGRAPHY_METHOD;

  protected readonly _type = CryptographyTransformerUtil.name;

  public static encrypt(value?: string): string | undefined {
    if (typeof value !== 'string') {
      return value;
    }

    const cipher = crypto.createCipheriv(
      CryptographyTransformerUtil.method,
      CryptographyTransformerUtil.secret,
      CryptographyTransformerUtil.iv,
    );
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  public static decrypt(value?: string): string | undefined {
    if (typeof value !== 'string') {
      return value;
    }

    const decipher = crypto.createDecipheriv(
      CryptographyTransformerUtil.method,
      CryptographyTransformerUtil.secret,
      CryptographyTransformerUtil.iv,
    );
    let decrypted = decipher.update(value, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export const CryptographyTransformer = {
  to(value?: string): string | undefined {
    return CryptographyTransformerUtil.encrypt(value);
  },
  from(value?: string): string | undefined {
    return CryptographyTransformerUtil.decrypt(value);
  },
};
