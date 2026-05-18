import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantInsuredStatusEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
      TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantInsuredStatusEntity => {
          if (!source.temporaryDisabilityBenefitsGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantInsuredStatusEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantInsuredStatusEntity({
            id: new TemporaryDisabilityBenefitsGrantInsuredStatusId(source.id),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            temporaryDisabilityBenefitsGrantId:
              new TemporaryDisabilityBenefitsGrantId(
                source.temporaryDisabilityBenefitsGrant.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
      TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
        ): TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity =>
          TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity.build({
            id: source.id.toString(),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            temporaryDisabilityBenefitsGrant:
              TemporaryDisabilityBenefitsGrantTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsGrantId.toString(),
              } as TemporaryDisabilityBenefitsGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
