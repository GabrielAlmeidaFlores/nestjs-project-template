import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class PaymentPlanPaidResourceEntityAutoMapperProfile {
  protected readonly _type =
    PaymentPlanPaidResourceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PaymentPlanPaidResourceTypeormEntity,
    ): PaymentPlanPaidResourceEntity => {
      return new PaymentPlanPaidResourceEntity({
        id: new PaymentPlanPaidResourceId(source.id),
        resource: source.resource,
        creditCost: source.creditCost,
        description: source.description,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };
    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PaymentPlanPaidResourceTypeormEntity,
      PaymentPlanPaidResourceEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PaymentPlanPaidResourceEntity,
    ): PaymentPlanPaidResourceTypeormEntity => {
      return PaymentPlanPaidResourceTypeormEntity.build({
        id: source.id.toString(),
        resource: source.resource,
        creditCost: source.creditCost,
        description: source.description,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };
    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);
    createMap(
      this.mapper,
      PaymentPlanPaidResourceEntity,
      PaymentPlanPaidResourceTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PaymentPlanPaidResourceTypeormEntity,
    ): GetPaymentPlanPaidResourceQueryResult => {
      return GetPaymentPlanPaidResourceQueryResult.build({
        id: new PaymentPlanPaidResourceId(source.id),
        resource: source.resource,
        creditCost: source.creditCost.toString(),
        description: source.description,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PaymentPlanPaidResourceTypeormEntity,
      GetPaymentPlanPaidResourceQueryResult,
      mappingFunction,
    );
  }
}
