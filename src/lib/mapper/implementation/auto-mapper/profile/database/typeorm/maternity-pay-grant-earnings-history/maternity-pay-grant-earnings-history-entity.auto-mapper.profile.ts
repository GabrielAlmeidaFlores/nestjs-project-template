import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-earnings-history.typeorm.entity';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity';
import { MaternityPayGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/value-object/maternity-pay-grant-earnings-history-id.value-object';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

@Injectable()
export class MaternityPayGrantEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayGrantEarningsHistoryEntityAutoMapperProfile.name;

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
      MaternityPayGrantEarningsHistoryTypeormEntity,
      MaternityPayGrantEarningsHistoryEntity,
      constructUsing(
        (
          source: MaternityPayGrantEarningsHistoryTypeormEntity,
        ): MaternityPayGrantEarningsHistoryEntity => {
          if (!source.maternityPayGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: MaternityPayGrantEarningsHistoryEntity.name,
              sourceClass: MaternityPayGrantEarningsHistoryTypeormEntity.name,
            });
          }

          return new MaternityPayGrantEarningsHistoryEntity({
            id: new MaternityPayGrantEarningsHistoryId(source.id),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            maternityPayGrantId: new MaternityPayGrantId(
              source.maternityPayGrant.id,
            ),
            maternityPayGrantPeriodId:
              source.maternityPayGrantPeriod !== null &&
              source.maternityPayGrantPeriod !== undefined
                ? new MaternityPayGrantPeriodId(
                    source.maternityPayGrantPeriod.id,
                  )
                : null,
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
      MaternityPayGrantEarningsHistoryEntity,
      MaternityPayGrantEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: MaternityPayGrantEarningsHistoryEntity,
        ): MaternityPayGrantEarningsHistoryTypeormEntity => {
          const maternityPayGrantPeriod =
            source.maternityPayGrantPeriodId !== null
              ? MaternityPayGrantPeriodTypeormEntity.build({
                  id: source.maternityPayGrantPeriodId.toString(),
                } as MaternityPayGrantPeriodTypeormEntity)
              : null;

          return MaternityPayGrantEarningsHistoryTypeormEntity.build({
            id: source.id.toString(),
            competence: source.competence,
            remuneration: source.remuneration,
            indicators: source.indicators,
            paymentDate: source.paymentDate,
            contribution: source.contribution,
            contributionSalary: source.contributionSalary,
            analysis: source.analysis,
            competenceBelowTheMinimum: source.competenceBelowTheMinimum,
            maternityPayGrant: MaternityPayGrantTypeormEntity.build({
              id: source.maternityPayGrantId.toString(),
            } as MaternityPayGrantTypeormEntity),
            maternityPayGrantPeriod,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }
}
