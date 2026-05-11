import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionPeriodEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
      RetirementPermanentDisabilityRejectionPeriodEntity,
      constructUsing((source) => {
        if (!source.retirementPermanentDisabilityRejection) {
          throw new IncompleteSourceDataForMappingError({
            destinationClass:
              RetirementPermanentDisabilityRejectionPeriodEntity.name,
            sourceClass:
              RetirementPermanentDisabilityRejectionPeriodTypeormEntity.name,
          });
        }

        return new RetirementPermanentDisabilityRejectionPeriodEntity({
          id: new RetirementPermanentDisabilityRejectionPeriodId(source.id),
          bondOrigin: source.bondOrigin,
          category: source.category,
          activityDescription: source.activityDescription,
          startDate: source.startDate,
          endDate: source.endDate,
          workType: source.workType,
          isPendency: source.isPendency,
          competenceBelowTheMinimum: source.competenceBelowTheMinimum,
          contributionAverage:
            source.contributionAverage !== null
              ? new DecimalValue(source.contributionAverage)
              : null,
          pendencyReason: source.pendencyReason,
          periodConsideration: source.periodConsideration,
          wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
          status: source.status,
          local: source.local,
          retirementPermanentDisabilityRejectionId:
            new RetirementPermanentDisabilityRejectionId(
              source.retirementPermanentDisabilityRejection.id,
            ),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        });
      }),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRejectionPeriodEntity,
      RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
      constructUsing((source) =>
        RetirementPermanentDisabilityRejectionPeriodTypeormEntity.build({
          id: source.id.toString(),
          bondOrigin: source.bondOrigin,
          category: source.category,
          activityDescription: source.activityDescription,
          startDate: source.startDate,
          endDate: source.endDate,
          workType: source.workType,
          isPendency: source.isPendency,
          competenceBelowTheMinimum: source.competenceBelowTheMinimum,
          contributionAverage:
            source.contributionAverage !== null
              ? source.contributionAverage.toString()
              : null,
          pendencyReason: source.pendencyReason,
          periodConsideration: source.periodConsideration,
          wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
          status: source.status,
          local: source.local,
          retirementPermanentDisabilityRejection:
            RetirementPermanentDisabilityRejectionTypeormEntity.build({
              id: source.retirementPermanentDisabilityRejectionId.toString(),
            } as RetirementPermanentDisabilityRejectionTypeormEntity),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        }),
      ),
    );
  }
}
