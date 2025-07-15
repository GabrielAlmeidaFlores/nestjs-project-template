import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import { AvailableCreditPlanEntity } from '@core/domain/schema/entity/credit-plan/available-credit-plan/available-credit-plan.entity';
import { OrganizationCreditPlanPurchaseEntity } from '@core/domain/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.entity';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AvailableCreditPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-credit-plan.typeorm.entity';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { OrganizationCreditPlanPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-plan-purchase.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MissingRelationTypeError } from '@lib/mapper/implementation/auto-mapper/error/missing-relation-type.error';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class OrganizationCreditPlanPurchaseDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type =
    OrganizationCreditPlanPurchaseDatabaseAutoMapperProfile.name;

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
      source: OrganizationCreditPlanPurchaseTypeormEntity,
    ): OrganizationCreditPlanPurchaseEntity => {
      const sourceClassName = source.constructor.name;
      const targetClassName = OrganizationCreditPlanPurchaseEntity.name;

      if (!source.organization) {
        throw new MissingRelationTypeError({
          targetClassName,
          sourceClassName,
          relationName: 'organization',
        });
      }

      if (!source.bankPayment) {
        throw new MissingRelationTypeError({
          targetClassName,
          sourceClassName,
          relationName: 'bankPayment',
        });
      }

      return new OrganizationCreditPlanPurchaseEntity({
        ...source,
        id: new Guid(source.id),
        price: new DecimalValue(source.price),
        organization: new RelationModel<OrganizationEntity>({
          id: new Guid(source.organization.id),
        }),
        creditPlan: this.mapper.map(
          source.availableCreditPlan,
          AvailableCreditPlanTypeormEntity,
          AvailableCreditPlanEntity,
        ),
        bankPayment: new RelationModel<BankPaymentEntity>({
          id: new Guid(source.bankPayment.id),
        }),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      OrganizationCreditPlanPurchaseTypeormEntity,
      OrganizationCreditPlanPurchaseEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationCreditPlanPurchaseEntity,
    ): OrganizationCreditPlanPurchaseTypeormEntity => {
      return OrganizationCreditPlanPurchaseTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        price: source.price.toString(),
        organization: {
          id: source.organization.id.toString(),
        } as OrganizationTypeormEntity,
        availableCreditPlan: this.mapper.map(
          source.creditPlan,
          AvailableCreditPlanEntity,
          AvailableCreditPlanTypeormEntity,
        ),
        bankPayment: {
          id: source.bankPayment.id.toString(),
        } as BankPaymentTypeormEntity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      OrganizationCreditPlanPurchaseEntity,
      OrganizationCreditPlanPurchaseTypeormEntity,
      mappingFunction,
    );
  }
}
