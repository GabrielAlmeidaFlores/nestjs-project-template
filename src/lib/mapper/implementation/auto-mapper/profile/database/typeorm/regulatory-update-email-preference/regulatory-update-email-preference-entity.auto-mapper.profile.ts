import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RegulatoryUpdateEmailPreferenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-email-preference.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { GetRegulatoryUpdateEmailPreferenceQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/result/get-regulatory-update-email-preference.query.result';
import { RegulatoryUpdateEmailPreferenceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/regulatory-update-email-preference.entity';
import { RegulatoryUpdateEmailPreferenceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/value-object/regulatory-update-email-preference-id/regulatory-update-email-preference-id.value-object';

@Injectable()
export class RegulatoryUpdateEmailPreferenceEntityAutoMapperProfile {
  protected readonly _type =
    RegulatoryUpdateEmailPreferenceEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmToDomain();
    this.mapOrmToQueryResult();
  }

  private mapOrmToDomain(): void {
    const convert = (
      source: RegulatoryUpdateEmailPreferenceTypeormEntity,
    ): RegulatoryUpdateEmailPreferenceEntity => {
      if (!source.customer) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: RegulatoryUpdateEmailPreferenceEntity.name,
          sourceClass: RegulatoryUpdateEmailPreferenceTypeormEntity.name,
        });
      }

      return new RegulatoryUpdateEmailPreferenceEntity({
        id: new RegulatoryUpdateEmailPreferenceId(source.id),
        customerId: new CustomerId(source.customer.id),
        emailEnabled: source.emailEnabled,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateEmailPreferenceTypeormEntity,
      RegulatoryUpdateEmailPreferenceEntity,
      constructUsing(convert),
    );
  }

  private mapOrmToQueryResult(): void {
    const convert = (
      source: RegulatoryUpdateEmailPreferenceTypeormEntity,
    ): GetRegulatoryUpdateEmailPreferenceQueryResult => {
      if (!source.customer?.authIdentity) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetRegulatoryUpdateEmailPreferenceQueryResult.name,
          sourceClass: RegulatoryUpdateEmailPreferenceTypeormEntity.name,
        });
      }

      return GetRegulatoryUpdateEmailPreferenceQueryResult.build({
        id: new RegulatoryUpdateEmailPreferenceId(source.id),
        customerId: new CustomerId(source.customer.id),
        emailEnabled: source.emailEnabled,
        customerEmail: source.customer.authIdentity.email,
      });
    };

    createMap(
      this.mapper,
      RegulatoryUpdateEmailPreferenceTypeormEntity,
      GetRegulatoryUpdateEmailPreferenceQueryResult,
      constructUsing(convert),
    );
  }
}
