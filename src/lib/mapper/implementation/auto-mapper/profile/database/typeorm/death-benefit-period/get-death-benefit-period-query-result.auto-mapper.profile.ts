import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';
import { GetDeathBenefitPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/query/result/get-death-benefit-period.query.result';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

@Injectable()
export class GetDeathBenefitPeriodQueryResultAutoMapperProfile {
  protected readonly _type = GetDeathBenefitPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      DeathBenefitPeriodTypeormEntity,
      GetDeathBenefitPeriodQueryResult,
      constructUsing(
        (source: DeathBenefitPeriodTypeormEntity): GetDeathBenefitPeriodQueryResult =>
          GetDeathBenefitPeriodQueryResult.build({
            id: new DeathBenefitPeriodId(source.id),
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
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
