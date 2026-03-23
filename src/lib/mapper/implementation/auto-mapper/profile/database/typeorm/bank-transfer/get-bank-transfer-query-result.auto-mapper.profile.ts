import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { GetBankTransferQueryResult } from '@module/generic/bank/domain/repository/bank-transfer/query/result/get-bank-transfer.query.result';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

@Injectable()
export class GetBankTransferQueryResultAutoMapperProfile {
  protected readonly _type = GetBankTransferQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BankTransferTypeormEntity,
    ): GetBankTransferQueryResult => {
      return GetBankTransferQueryResult.build({
        ...source,
        id: new BankTransferId(source.id),
        amount: new DecimalValue(source.amount),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      BankTransferTypeormEntity,
      GetBankTransferQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetBankTransferQueryResult,
    ): BankTransferTypeormEntity => {
      return BankTransferTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        amount: source.amount.toString(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetBankTransferQueryResult,
      BankTransferTypeormEntity,
      mappingFunction,
    );
  }
}
