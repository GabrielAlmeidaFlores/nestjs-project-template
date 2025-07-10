import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import { BankTransferEntity } from '@core/domain/schema/entity/bank/bank-transfer/bank-transfer.entity';
import { TransferMethodEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-method.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { Status } from '@core/domain/schema/value-object/status/status.value-object';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class BankTransferDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = BankTransferDatabaseAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    super();
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
      const id = new Guid(source.id);
      const transferMethod = this.convertStringToEnum(
        TransferMethodEnum,
        source.transferMethod,
      );
      const status = new Status(source.status);
      const value = new DecimalValue(source.value);
      const netValue = new DecimalValue(source.netValue);
      const bankPayment = this.mapper.map(
        source.bankPayment,
        BankPaymentTypeormEntity,
        BankPaymentEntity,
      );

      return new BankTransferEntity({
        ...source,
        id,
        transferMethod,
        status,
        value,
        netValue,
        bankPayment,
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
      const id = source.id.toString();
      const transferMethod = source.transferMethod;
      const status = source.status.toString();
      const value = source.value.toString();
      const netValue = source.netValue.toString();
      const bankPayment = this.mapper.map(
        source.bankPayment,
        BankPaymentEntity,
        BankPaymentTypeormEntity,
      );

      return BankTransferTypeormEntity.build({
        ...source,
        id,
        transferMethod,
        status,
        value,
        netValue,
        bankPayment,
        affiliateCustomerPayment: undefined,
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
