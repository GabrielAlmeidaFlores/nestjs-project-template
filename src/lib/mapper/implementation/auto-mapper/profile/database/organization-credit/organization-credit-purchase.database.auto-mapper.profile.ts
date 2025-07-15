import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { OrganizationCreditPurchaseEntity } from '@core/domain/schema/entity/organization-credit/organization-credit-purchase/organization-credit-purchase.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { MissingRelationTypeError } from '@lib/mapper/implementation/auto-mapper/error/missing-relation-type.error';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class OrganizationCreditPurchaseDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type =
    OrganizationCreditPurchaseDatabaseAutoMapperProfile.name;

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
      source: OrganizationCreditPurchaseTypeormEntity,
    ): OrganizationCreditPurchaseEntity => {
      const sourceClassName = source.constructor.name;
      const targetClassName = OrganizationCreditPurchaseEntity.name;

      if (!source.bankPayment) {
        throw new MissingRelationTypeError({
          targetClassName,
          sourceClassName,
          relationName: 'bankPayment',
        });
      }

      if (!source.organization) {
        throw new MissingRelationTypeError({
          targetClassName,
          sourceClassName,
          relationName: 'organization',
        });
      }

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

      return new OrganizationCreditPurchaseEntity({
        ...source,
        id: new Guid(source.id),
        organization: new RelationModel<OrganizationEntity>({
          id: new Guid(source.organization.id),
        }),
        bankPayment: new RelationModel<BankPaymentEntity>({
          id: new Guid(source.bankPayment.id),
        }),
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
      OrganizationCreditPurchaseTypeormEntity,
      OrganizationCreditPurchaseEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: OrganizationCreditPurchaseEntity,
    ): OrganizationCreditPurchaseTypeormEntity => {
      const id = source.id.toString();

      return OrganizationCreditPurchaseTypeormEntity.build({
        ...source,
        id,
        organization: {
          id: source.organization.id.toString(),
        } as OrganizationTypeormEntity,
        bankPayment: {
          id: source.bankPayment.id.toString(),
        } as BankPaymentTypeormEntity,
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
      OrganizationCreditPurchaseEntity,
      OrganizationCreditPurchaseTypeormEntity,
      mappingFunction,
    );
  }
}
