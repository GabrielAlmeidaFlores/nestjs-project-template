import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/value-object/disability-retirement-planning-grant-disability-period-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
        ): DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity => {
          if (!source.disabilityRetirementPlanningGrantDisabilityPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity(
            {
              id: new DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId(
                source.id,
              ),
              document: source.document,
              type: source.type,
              disabilityRetirementPlanningGrantDisabilityPeriodId:
                new DisabilityRetirementPlanningGrantDisabilityPeriodId(
                  source.disabilityRetirementPlanningGrantDisabilityPeriod.id,
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

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity,
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity,
        ): DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity =>
          DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              document: source.document,
              type: source.type,
              disabilityRetirementPlanningGrantDisabilityPeriod:
                DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity.build(
                  {
                    id: source.disabilityRetirementPlanningGrantDisabilityPeriodId.toString(),
                  } as DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
