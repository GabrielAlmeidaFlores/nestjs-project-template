import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionPeriodEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
      DisabilityRetirementPlanningRejectionPeriodEntity,
      constructUsing((source) => {
        if (!source.disabilityRetirementPlanningRejection) {
          throw new IncompleteSourceDataForMappingError({
            destinationClass:
              DisabilityRetirementPlanningRejectionPeriodEntity.name,
            sourceClass:
              DisabilityRetirementPlanningRejectionPeriodTypeormEntity.name,
          });
        }

        return new DisabilityRetirementPlanningRejectionPeriodEntity({
          id: new DisabilityRetirementPlanningRejectionPeriodId(source.id),
          bondOrigin: source.bondOrigin,
          category: source.category,
          activityDescription: source.activityDescription,
          startDate: source.startDate,
          endDate: source.endDate,
          workType: source.workType,
          impactMonths: source.impactMonths,
          graceMonths: source.graceMonths,
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
          pcdStatus: source.pcdStatus,
          local: source.local,
          disabilityRetirementPlanningRejectionId:
            new DisabilityRetirementPlanningRejectionId(
              source.disabilityRetirementPlanningRejection.id,
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
      DisabilityRetirementPlanningRejectionPeriodEntity,
      DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
      constructUsing((source) =>
        DisabilityRetirementPlanningRejectionPeriodTypeormEntity.build({
          id: source.id.toString(),
          bondOrigin: source.bondOrigin,
          category: source.category,
          activityDescription: source.activityDescription,
          startDate: source.startDate,
          endDate: source.endDate,
          workType: source.workType,
          impactMonths: source.impactMonths,
          graceMonths: source.graceMonths,
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
          pcdStatus: source.pcdStatus,
          local: source.local,
          disabilityRetirementPlanningRejection:
            DisabilityRetirementPlanningRejectionTypeormEntity.build({
              id: source.disabilityRetirementPlanningRejectionId.toString(),
            } as DisabilityRetirementPlanningRejectionTypeormEntity),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        }),
      ),
    );
  }
}
