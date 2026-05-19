import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability-document.typeorm.entity';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/value-object/disability-retirement-planning-period-disability-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningPeriodDisabilityDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
    ): DisabilityRetirementPlanningPeriodDisabilityDocumentEntity => {
      if (!source.disabilityRetirementPlanningPeriodDisability) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            DisabilityRetirementPlanningPeriodDisabilityDocumentEntity.name,
          sourceClass:
            DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity.name,
        });
      }

      const disabilityRetirementPlanningPeriodDisability = this.mapper.map(
        source.disabilityRetirementPlanningPeriodDisability,
        DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
        DisabilityRetirementPlanningPeriodDisabilityEntity,
      );

      return new DisabilityRetirementPlanningPeriodDisabilityDocumentEntity({
        id: new DisabilityRetirementPlanningPeriodDisabilityDocumentId(
          source.id,
        ),
        document: source.document,
        type: source.type,
        disabilityRetirementPlanningPeriodDisability,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
      DisabilityRetirementPlanningPeriodDisabilityDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: DisabilityRetirementPlanningPeriodDisabilityDocumentEntity,
    ): DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity => {
      const disabilityRetirementPlanningPeriodDisability = this.mapper.map(
        source.disabilityRetirementPlanningPeriodDisability,
        DisabilityRetirementPlanningPeriodDisabilityEntity,
        DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
      );

      return DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity.build(
        {
          id: source.id.toString(),
          document: source.document,
          type: source.type,
          disabilityRetirementPlanningPeriodDisability,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningPeriodDisabilityDocumentEntity,
      DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
