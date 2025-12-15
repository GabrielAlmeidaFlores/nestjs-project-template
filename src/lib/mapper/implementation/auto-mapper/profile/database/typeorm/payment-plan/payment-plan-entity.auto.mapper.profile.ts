import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';
import { GetPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan/query/result/get-payment-plan.query.result';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

@Injectable()
export class PaymentPlanEntityAutoMapperProfile {
  protected readonly _type = PaymentPlanEntityAutoMapperProfile.name;

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
      source: PaymentPlanTypeormEntity,
    ): PaymentPlanEntity => {
      return new PaymentPlanEntity({
        ...source,
        id: new PaymentPlanId(source.id),
        name: source.name,
        description: source.description,
        price: source.price,
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        active: source.active,
        cycle: source.cycle as PaymentPlanCycleEnum,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PaymentPlanTypeormEntity,
      PaymentPlanEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PaymentPlanEntity,
    ): PaymentPlanTypeormEntity => {
      return PaymentPlanTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        name: source.name,
        description: source.description,
        price: source.price,
        maxMemberCount: source.maxMemberCount,
        monthlyCreditAmount: source.monthlyCreditAmount,
        active: source.active,
        cycle: source.cycle,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PaymentPlanEntity,
      PaymentPlanTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: PaymentPlanTypeormEntity,
    ): GetPaymentPlanQueryResult => {
      const result = new GetPaymentPlanQueryResult();
      result.id = new PaymentPlanId(source.id);
      result.name = source.name;
      result.description = source.description;
      result.price = source.price;
      result.maxMemberCount = source.maxMemberCount;
      result.monthlyCreditAmount = source.monthlyCreditAmount;
      result.active = source.active;
      result.cycle = source.cycle as PaymentPlanCycleEnum;
      result.createdAt = source.createdAt;
      result.updatedAt = source.updatedAt;
      return result;
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      PaymentPlanTypeormEntity,
      GetPaymentPlanQueryResult,
      mappingFunction,
    );
  }
}
