import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.entity';
import { DisabilityRetirementPlanningGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/value-object/disability-retirement-planning-grant-period-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodDocumentEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
      DisabilityRetirementPlanningGrantPeriodDocumentEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
        ): DisabilityRetirementPlanningGrantPeriodDocumentEntity => {
          if (!source.disabilityRetirementPlanningGrantPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantPeriodDocumentEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantPeriodDocumentEntity({
            id: new DisabilityRetirementPlanningGrantPeriodDocumentId(
              source.id,
            ),
            document: source.document,
            disabilityRetirementPlanningGrantPeriodId:
              new DisabilityRetirementPlanningGrantPeriodId(
                source.disabilityRetirementPlanningGrantPeriod.id,
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
      DisabilityRetirementPlanningGrantPeriodDocumentEntity,
      DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantPeriodDocumentEntity,
        ): DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity =>
          DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            disabilityRetirementPlanningGrantPeriod:
              DisabilityRetirementPlanningGrantPeriodTypeormEntity.build({
                id: source.disabilityRetirementPlanningGrantPeriodId.toString(),
              } as DisabilityRetirementPlanningGrantPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
