import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { BankTransferEntity } from '@module/generic/bank/domain/schema/entity/bank-transfer/bank-transfer.entity';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

@Injectable()
export class BankTransferEntityAutoMapperProfile {
  protected readonly _type = BankTransferEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BankTransferTypeormEntity,
    ): BankTransferEntity => {
      return new BankTransferEntity({
        ...source,
        id: new BankTransferId(source.id),
        amount: new DecimalValue(source.amount),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      BankTransferTypeormEntity,
      BankTransferEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BankTransferEntity,
    ): BankTransferTypeormEntity => {
      return BankTransferTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        amount: source.amount.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      BankTransferEntity,
      BankTransferTypeormEntity,
      mappingFunction,
    );
  }
}
