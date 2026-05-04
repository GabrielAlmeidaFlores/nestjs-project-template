import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/temporary-incapacity-benefit-termination-insured-status.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationInsuredStatusEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
      TemporaryIncapacityBenefitTerminationInsuredStatusEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationInsuredStatusEntity => {
          if (!source.temporaryIncapacityBenefitTermination) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationInsuredStatusEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationInsuredStatusEntity({
            id: new TemporaryIncapacityBenefitTerminationInsuredStatusId(
              source.id,
            ),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            temporaryIncapacityBenefitTerminationId:
              new TemporaryIncapacityBenefitTerminationId(
                source.temporaryIncapacityBenefitTermination.id,
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
      TemporaryIncapacityBenefitTerminationInsuredStatusEntity,
      TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationInsuredStatusEntity,
        ): TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity =>
          TemporaryIncapacityBenefitTerminationInsuredStatusTypeormEntity.build(
            {
              id: source.id.toString(),
              involuntaryUnemployment: source.involuntaryUnemployment,
              intentionToProveInvoluntaryUnemployment:
                source.intentionToProveInvoluntaryUnemployment,
              ruralInsuredClient: source.ruralInsuredClient,
              ruralPeriodStartDate: source.ruralPeriodStartDate,
              ruralPeriodEndDate: source.ruralPeriodEndDate,
              documentsDescription: source.documentsDescription,
              temporaryIncapacityBenefitTermination:
                TemporaryIncapacityBenefitTerminationTypeormEntity.build({
                  id: source.temporaryIncapacityBenefitTerminationId.toString(),
                } as TemporaryIncapacityBenefitTerminationTypeormEntity),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
