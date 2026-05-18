import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialPeriodEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodEntityAutoMapperProfile.name;

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
      GeneralUrbanRetirementDenialPeriodTypeormEntity,
      GeneralUrbanRetirementDenialPeriodEntity,
      constructUsing((source) => {
        if (!source.generalUrbanRetirementDenial) {
          throw new IncompleteSourceDataForMappingError({
            destinationClass: GeneralUrbanRetirementDenialPeriodEntity.name,
            sourceClass: GeneralUrbanRetirementDenialPeriodTypeormEntity.name,
          });
        }

        return new GeneralUrbanRetirementDenialPeriodEntity({
          id: new GeneralUrbanRetirementDenialPeriodId(source.id),
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
          shouldConsiderLastRemunerationAsExitDate:
            source.shouldConsiderLastRemunerationAsExitDate,
          status: source.status,
          generalUrbanRetirementDenialId: new GeneralUrbanRetirementDenialId(
            source.generalUrbanRetirementDenial.id,
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
      GeneralUrbanRetirementDenialPeriodEntity,
      GeneralUrbanRetirementDenialPeriodTypeormEntity,
      constructUsing((source) =>
        GeneralUrbanRetirementDenialPeriodTypeormEntity.build({
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
          shouldConsiderLastRemunerationAsExitDate:
            source.shouldConsiderLastRemunerationAsExitDate,
          status: source.status,
          generalUrbanRetirementDenial:
            GeneralUrbanRetirementDenialTypeormEntity.build({
              id: source.generalUrbanRetirementDenialId.toString(),
            } as GeneralUrbanRetirementDenialTypeormEntity),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        }),
      ),
    );
  }
}
