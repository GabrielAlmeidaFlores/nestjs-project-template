import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedInsuredStatusEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/permanent-incapacity-benefit-terminated-insured-status.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedInsuredStatusEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
      PermanentIncapacityBenefitTerminatedInsuredStatusEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedInsuredStatusEntity => {
          if (!source.permanentIncapacityBenefitTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedInsuredStatusEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedInsuredStatusEntity({
            id: new PermanentIncapacityBenefitTerminatedInsuredStatusId(
              source.id,
            ),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            permanentIncapacityBenefitTerminatedId:
              new PermanentIncapacityBenefitTerminatedId(
                source.permanentIncapacityBenefitTerminated.id,
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
      PermanentIncapacityBenefitTerminatedInsuredStatusEntity,
      PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedInsuredStatusEntity,
        ): PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity =>
          PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity.build({
            id: source.id.toString(),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            permanentIncapacityBenefitTerminated:
              PermanentIncapacityBenefitTerminatedTypeormEntity.build({
                id: source.permanentIncapacityBenefitTerminatedId.toString(),
              } as PermanentIncapacityBenefitTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
