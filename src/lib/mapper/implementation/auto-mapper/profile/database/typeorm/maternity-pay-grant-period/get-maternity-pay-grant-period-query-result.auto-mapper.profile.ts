import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { GetMaternityPayGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/query/result/get-maternity-pay-grant-period.query.result';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

@Injectable()
export class GetMaternityPayGrantPeriodQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMaternityPayGrantPeriodQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      MaternityPayGrantPeriodTypeormEntity,
      GetMaternityPayGrantPeriodQueryResult,
      constructUsing(
        (
          source: MaternityPayGrantPeriodTypeormEntity,
        ): GetMaternityPayGrantPeriodQueryResult =>
          GetMaternityPayGrantPeriodQueryResult.build({
            id: new MaternityPayGrantPeriodId(source.id),
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
