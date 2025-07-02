import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import { OrganizationCreditPurchaseEntity } from '@core/domain/schema/entity/organization-credit/organization-credit-purchase/organization-credit-purchase.entity';
import { RelationModel } from '@core/domain/schema/model/relation.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
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
      const id = new Guid(source.id);
      const organization = this.mapper.map(
        source.organization,
        OrganizationTypeormEntity,
        RelationModel<OrganizationEntity>,
      );
      const bankPayment = this.mapper.map(
        source.bankPayment,
        BankPaymentTypeormEntity,
        RelationModel<BankPaymentEntity>,
      );

      return new OrganizationCreditPurchaseEntity({
        ...source,
        id,
        organization,
        bankPayment,
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
      const organization = this.mapper.map(
        source.organization,
        RelationModel<OrganizationEntity>,
        OrganizationTypeormEntity,
      );
      const bankPayment = this.mapper.map(
        source.bankPayment,
        RelationModel<BankPaymentEntity>,
        BankPaymentTypeormEntity,
      );

      return OrganizationCreditPurchaseTypeormEntity.build({
        ...source,
        id,
        organization,
        bankPayment,
        createdBy: new CustomerTypeormEntity(),
        updatedBy: new CustomerTypeormEntity(),
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
