import bcrypt from 'bcrypt';

import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/source/database.application-variable';

class HashTransformerUtil {
  private static readonly saltRounds =
    DatabaseApplicationVariable.DATABASE_HASH_SALT_ROUNDS;

  protected readonly _type = HashTransformerUtil.name;

  public static hash(value?: string): string | undefined {
    if (typeof value !== 'string') {
      return value;
    }

    const isBcryptHash = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(value);

    if (isBcryptHash) {
      return value;
    }

    const salt = bcrypt.genSaltSync(HashTransformerUtil.saltRounds);
    return bcrypt.hashSync(value, salt);
  }
}

export const HashTransformer = {
  to(value?: string): string | undefined {
    return HashTransformerUtil.hash(value);
  },
  from(value?: string): string | undefined {
    return value;
  },
};
