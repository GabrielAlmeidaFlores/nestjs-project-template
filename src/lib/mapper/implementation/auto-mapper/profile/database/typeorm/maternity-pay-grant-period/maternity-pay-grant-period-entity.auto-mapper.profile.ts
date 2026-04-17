import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

@Injectable()
export class MaternityPayGrantPeriodEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayGrantPeriodEntityAutoMapperProfile.name;

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
      MaternityPayGrantPeriodTypeormEntity,
      MaternityPayGrantPeriodEntity,
      constructUsing(
        (
          source: MaternityPayGrantPeriodTypeormEntity,
        ): MaternityPayGrantPeriodEntity => {
          if (!source.maternityPayGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: MaternityPayGrantPeriodEntity.name,
              sourceClass: MaternityPayGrantPeriodTypeormEntity.name,
            });
          }

          return new MaternityPayGrantPeriodEntity({
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
            maternityPayGrantId: new MaternityPayGrantId(
              source.maternityPayGrant.id,
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
      MaternityPayGrantPeriodEntity,
      MaternityPayGrantPeriodTypeormEntity,
      constructUsing(
        (
          source: MaternityPayGrantPeriodEntity,
        ): MaternityPayGrantPeriodTypeormEntity =>
          MaternityPayGrantPeriodTypeormEntity.build({
            id: source.id.toString(),
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
                ? source.contributionAverage.toString()
                : null,
            bondOrigin: source.bondOrigin,
            impact: source.impact,
            gracePeriod: source.gracePeriod,
            complementViaMyInss: source.complementViaMyInss,
            maternityPayGrant: MaternityPayGrantTypeormEntity.build({
              id: source.maternityPayGrantId.toString(),
            } as MaternityPayGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
