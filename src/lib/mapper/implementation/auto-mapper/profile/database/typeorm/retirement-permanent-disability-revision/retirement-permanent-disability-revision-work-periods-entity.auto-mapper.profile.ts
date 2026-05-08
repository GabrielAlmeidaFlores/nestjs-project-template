import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/retirement-permanent-disability-revision-work-periods.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionWorkPeriodsEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
      RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
        ): RetirementPermanentDisabilityRevisionWorkPeriodsEntity => {
          if (!source.retirementPermanentDisabilityRevision) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRevisionWorkPeriodsEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRevisionWorkPeriodsEntity({
            id: new RetirementPermanentDisabilityRevisionWorkPeriodsId(
              source.id,
            ),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? new DecimalValue(source.contributionAverage)
                : null,
            status: source.status,
            gracePeriod: source.gracePeriod,
            retirementPermanentDisabilityRevisionId:
              new RetirementPermanentDisabilityRevisionId(
                source.retirementPermanentDisabilityRevision.id,
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
      RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
      RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRevisionWorkPeriodsEntity,
        ): RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity =>
          RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity.build({
            id: source.id.toString(),
            bondOrigin: source.bondOrigin,
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? source.contributionAverage.toString()
                : null,
            status: source.status,
            gracePeriod: source.gracePeriod,
            retirementPermanentDisabilityRevision:
              RetirementPermanentDisabilityRevisionTypeormEntity.build({
                id: source.retirementPermanentDisabilityRevisionId.toString(),
              } as RetirementPermanentDisabilityRevisionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
      GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
        ): GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult => {
          if (!source.retirementPermanentDisabilityRevision) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult.name,
              sourceClass:
                RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity.name,
            });
          }

          return GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult.build(
            {
              retirementPermanentDisabilityRevisionWorkPeriodsId:
                new RetirementPermanentDisabilityRevisionWorkPeriodsId(
                  source.id,
                ),
              bondOrigin: source.bondOrigin,
              startDate: source.startDate,
              endDate: source.endDate,
              category: source.category,
              competenceBelowTheMinimum: source.competenceBelowTheMinimum,
              pendencyReason: source.pendencyReason,
              periodConsideration: source.periodConsideration,
              contributionAverage:
                source.contributionAverage !== null
                  ? new DecimalValue(source.contributionAverage)
                  : null,
              status: source.status,
              gracePeriod: source.gracePeriod,
              retirementPermanentDisabilityRevisionId:
                new RetirementPermanentDisabilityRevisionId(
                  source.retirementPermanentDisabilityRevision.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }
}
