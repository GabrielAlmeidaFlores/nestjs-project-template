import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/temporary-disability-benefits-terminated-insured-status.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedInsuredStatusEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity => {
          if (!source.temporaryDisabilityBenefitsTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity({
            id: new TemporaryDisabilityBenefitsTerminatedInsuredStatusId(
              source.id,
            ),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            temporaryDisabilityBenefitsTerminatedId:
              new TemporaryDisabilityBenefitsTerminatedId(
                source.temporaryDisabilityBenefitsTerminated.id,
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
      TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity,
      TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity,
        ): TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity.build(
            {
              id: source.id.toString(),
              involuntaryUnemployment: source.involuntaryUnemployment,
              intentionToProveInvoluntaryUnemployment:
                source.intentionToProveInvoluntaryUnemployment,
              ruralInsuredClient: source.ruralInsuredClient,
              ruralPeriodStartDate: source.ruralPeriodStartDate,
              ruralPeriodEndDate: source.ruralPeriodEndDate,
              documentsDescription: source.documentsDescription,
              temporaryDisabilityBenefitsTerminated:
                TemporaryDisabilityBenefitsTerminatedTypeormEntity.build({
                  id: source.temporaryDisabilityBenefitsTerminatedId.toString(),
                } as TemporaryDisabilityBenefitsTerminatedTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
