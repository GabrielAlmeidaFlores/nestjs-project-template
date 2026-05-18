import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/value-object/general-urban-retirement-denial-period-earnings-history-id/general-urban-retirement-denial-period-earnings-history-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialPeriodEarningsHistoryEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialPeriodEarningsHistoryEntityAutoMapperProfile.name;

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
      GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
      GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
        ): GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity => {
          if (!source.generalUrbanRetirementDenialPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity.name,
              sourceClass:
                GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity.name,
            });
          }

          return new GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity({
            id: new GeneralUrbanRetirementDenialPeriodEarningsHistoryId(
              source.id,
            ),
            competence: source.competence,
            value: source.value,
            generalUrbanRetirementDenialPeriodId:
              new GeneralUrbanRetirementDenialPeriodId(
                source.generalUrbanRetirementDenialPeriod.id,
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
      GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity,
      GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity,
        ): GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity =>
          GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity.build({
            id: source.id.toString(),
            competence: source.competence,
            value: source.value,
            generalUrbanRetirementDenialPeriod:
              GeneralUrbanRetirementDenialPeriodTypeormEntity.build({
                id: source.generalUrbanRetirementDenialPeriodId.toString(),
              } as GeneralUrbanRetirementDenialPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
