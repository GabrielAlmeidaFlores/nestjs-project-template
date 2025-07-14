import * as crypto from 'crypto';

import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { CacheStorageApplicationVariable } from '@shared/system/constant/application-variable/cache-storage.application-variable';

@Injectable()
export class RedisService implements CacheStorageGateway {
  protected readonly cryptographySecret: string;
  protected readonly cryptographyIv: string;
  protected readonly cryptographyMethod: string;

  protected readonly _type = RedisService.name;

  public constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {
    this.cryptographySecret =
      CacheStorageApplicationVariable.CACHE_STORAGE_CRYPTOGRAPHY_SECRET;
    this.cryptographyIv =
      CacheStorageApplicationVariable.CACHE_STORAGE_CRYPTOGRAPHY_IV;
    this.cryptographyMethod =
      CacheStorageApplicationVariable.CACHE_STORAGE_CRYPTOGRAPHY_METHOD;
  }

  public async setData(key: string, value: string, ttl = 3600): Promise<void> {
    const encryptedValue = this.encryptData(value);
    await this.redis.set(key, encryptedValue, 'EX', ttl);
  }

  public async getData(key: string): Promise<string | null> {
    const encryptedValue = await this.redis.get(key);

    const dataIsAvailable = encryptedValue !== null;
    if (dataIsAvailable) {
      return this.decryptData(encryptedValue);
    }

    return null;
  }

  public encryptData(value: string): string {
    const cipher = crypto.createCipheriv(
      this.cryptographyMethod,
      this.cryptographySecret,
      this.cryptographyIv,
    );
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  private decryptData(value: string): string {
    const decipher = crypto.createDecipheriv(
      this.cryptographyMethod,
      this.cryptographySecret,
      this.cryptographyIv,
    );
    let decrypted = decipher.update(value, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
