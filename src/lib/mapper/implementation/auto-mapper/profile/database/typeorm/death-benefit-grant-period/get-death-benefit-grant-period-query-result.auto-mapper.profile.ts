import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { GetDeathBenefitGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/query/result/get-death-benefit-grant-period.query.result';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

@Injectable()
export class GetDeathBenefitGrantPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDeathBenefitGrantPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      DeathBenefitGrantPeriodTypeormEntity,
      GetDeathBenefitGrantPeriodQueryResult,
      constructUsing(
        (
          source: DeathBenefitGrantPeriodTypeormEntity,
        ): GetDeathBenefitGrantPeriodQueryResult =>
          GetDeathBenefitGrantPeriodQueryResult.build({
            id: new DeathBenefitGrantPeriodId(source.id),
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
