import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CreditPackTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-pack.typeorm.entity';
import { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

@Injectable()
export class CreditPackEntityAutoMapperProfile {
  protected readonly _type = CreditPackEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (source: CreditPackTypeormEntity): CreditPackEntity => {
      return new CreditPackEntity({
        id: new CreditPackId(source.id),
        price: new DecimalValue(source.price),
        creditAmount: source.creditAmount,
        active: source.active,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      CreditPackTypeormEntity,
      CreditPackEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (source: CreditPackEntity): CreditPackTypeormEntity => {
      return CreditPackTypeormEntity.build({
        id: source.id.toString(),
        price: source.price.toString(),
        creditAmount: source.creditAmount,
        active: source.active,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      CreditPackEntity,
      CreditPackTypeormEntity,
      constructUsing(convert),
    );
  }
}
