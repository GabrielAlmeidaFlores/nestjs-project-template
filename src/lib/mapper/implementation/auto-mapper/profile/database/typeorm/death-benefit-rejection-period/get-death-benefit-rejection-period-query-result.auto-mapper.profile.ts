import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';
import { GetDeathBenefitRejectionPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/query/result/get-death-benefit-rejection-period.query.result';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

@Injectable()
export class GetDeathBenefitRejectionPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDeathBenefitRejectionPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      DeathBenefitRejectionPeriodTypeormEntity,
      GetDeathBenefitRejectionPeriodQueryResult,
      constructUsing(
        (
          source: DeathBenefitRejectionPeriodTypeormEntity,
        ): GetDeathBenefitRejectionPeriodQueryResult =>
          GetDeathBenefitRejectionPeriodQueryResult.build({
            id: new DeathBenefitRejectionPeriodId(source.id),
            startDate: source.startDate,
            endDate: source.endDate,
            category: source.category,
            isPendency: source.isPendency,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            pendencyReason: source.pendencyReason,
            typeOfContribution: source.typeOfContribution,
            status: source.status,
            periodConsideration: source.periodConsideration,
            contributionAverage:
              source.contributionAverage !== null
                ? new DecimalValue(source.contributionAverage)
                : null,
            bondOrigin: source.bondOrigin,
            impact: source.impact,
            gracePeriod: source.gracePeriod,
            complementViaMyInss: source.complementViaMyInss,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
