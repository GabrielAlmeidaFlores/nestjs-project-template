import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import { PaymentMethodEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MissingRelationTypeError } from '@lib/mapper/implementation/auto-mapper/error/missing-relation-type.error';
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
      const sourceClassName = source.constructor.name;
      const targetClassName = BankPaymentEntity.name;

      if (!source.createdBy) {
        throw new MissingRelationTypeError({
          targetClassName,
          sourceClassName,
          relationName: 'createdBy',
        });
      }

      if (!source.updatedBy) {
        throw new MissingRelationTypeError({
          targetClassName,
          sourceClassName,
          relationName: 'updatedBy',
        });
      }

      const id = new Guid(source.id);
      const paymentMethod = this.convertStringToEnum(
        PaymentMethodEnum,
        source.paymentMethod,
      );
      const status = this.convertStringToEnum(PaymentStatusEnum, source.status);
      const value = new DecimalValue(source.value);
      const netValue = new DecimalValue(source.netValue);

      return new BankPaymentEntity({
        ...source,
        id,
        paymentMethod,
        status,
        value,
        netValue,
        createdBy: new RelationModel<CustomerEntity>({
          id: new Guid(source.createdBy.id),
        }),
        updatedBy: new RelationModel<CustomerEntity>({
          id: new Guid(source.updatedBy.id),
        }),
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
      const paymentMethod = source.paymentMethod;
      const status = source.status;
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
        organizationCreditPlanPurchase: undefined,
        createdBy: {
          id: source.createdBy.id.toString(),
        } as CustomerTypeormEntity,
        updatedBy: {
          id: source.updatedBy.id.toString(),
        } as CustomerTypeormEntity,
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
