import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/temporary-incapacity-benefit-rejection-insured-status.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionInsuredStatusEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
      TemporaryIncapacityBenefitRejectionInsuredStatusEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionInsuredStatusEntity => {
          if (!source.temporaryIncapacityBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionInsuredStatusEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionInsuredStatusEntity({
            id: new TemporaryIncapacityBenefitRejectionInsuredStatusId(
              source.id,
            ),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            temporaryIncapacityBenefitRejectionId:
              new TemporaryIncapacityBenefitRejectionId(
                source.temporaryIncapacityBenefitRejection.id,
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
      TemporaryIncapacityBenefitRejectionInsuredStatusEntity,
      TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionInsuredStatusEntity,
        ): TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity =>
          TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity.build({
            id: source.id.toString(),
            involuntaryUnemployment: source.involuntaryUnemployment,
            intentionToProveInvoluntaryUnemployment:
              source.intentionToProveInvoluntaryUnemployment,
            ruralInsuredClient: source.ruralInsuredClient,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            documentsDescription: source.documentsDescription,
            temporaryIncapacityBenefitRejection:
              TemporaryIncapacityBenefitRejectionTypeormEntity.build({
                id: source.temporaryIncapacityBenefitRejectionId.toString(),
              } as TemporaryIncapacityBenefitRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
