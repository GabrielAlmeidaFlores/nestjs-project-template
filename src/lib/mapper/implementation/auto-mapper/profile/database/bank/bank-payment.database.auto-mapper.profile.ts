import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PaymentMethod } from '@core/domain/schema/value-object/payment-method/payment-method.value-object';
import { Status } from '@core/domain/schema/value-object/status/status.value-object';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class BankPaymentDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type = BankPaymentDatabaseAutoMapperProfile.name;

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
      source: BankPaymentTypeormEntity,
    ): BankPaymentEntity => {
      const id = new Guid(source.id);
      const paymentMethod = new PaymentMethod(source.paymentMethod);
      const status = new Status(source.status);
      const value = new DecimalValue(source.value);
      const netValue = new DecimalValue(source.netValue);

      return new BankPaymentEntity({
        ...source,
        id,
        paymentMethod,
        status,
        value,
        netValue,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      BankPaymentTypeormEntity,
      BankPaymentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BankPaymentEntity,
    ): BankPaymentTypeormEntity => {
      const id = source.id.toString();
      const paymentMethod = source.paymentMethod.toString();
      const status = source.status.toString();
      const value = source.value.toString();
      const netValue = source.netValue.toString();

      return BankPaymentTypeormEntity.build({
        ...source,
        id,
        paymentMethod,
        status,
        value,
        netValue,
        bankTransfer: undefined,
        organizationCreditPurchase: undefined,
        createdBy: new CustomerTypeormEntity(),
        updatedBy: new CustomerTypeormEntity(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      BankPaymentEntity,
      BankPaymentTypeormEntity,
      mappingFunction,
    );
  }
}
