import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity';
import { DisabilityRetirementPlanningGrantDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/value-object/disability-retirement-planning-grant-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantDocumentEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningGrantDocumentTypeormEntity,
      DisabilityRetirementPlanningGrantDocumentEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantDocumentTypeormEntity,
        ): DisabilityRetirementPlanningGrantDocumentEntity => {
          if (!source.disabilityRetirementPlanningGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningGrantDocumentEntity.name,
              sourceClass:
                DisabilityRetirementPlanningGrantDocumentTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningGrantDocumentEntity({
            id: new DisabilityRetirementPlanningGrantDocumentId(source.id),
            document: source.document,
            type: source.type,
            disabilityRetirementPlanningGrantId:
              new DisabilityRetirementPlanningGrantId(
                source.disabilityRetirementPlanningGrant.id,
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
      DisabilityRetirementPlanningGrantDocumentEntity,
      DisabilityRetirementPlanningGrantDocumentTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantDocumentEntity,
        ): DisabilityRetirementPlanningGrantDocumentTypeormEntity =>
          DisabilityRetirementPlanningGrantDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            disabilityRetirementPlanningGrant:
              DisabilityRetirementPlanningGrantTypeormEntity.build({
                id: source.disabilityRetirementPlanningGrantId.toString(),
              } as DisabilityRetirementPlanningGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
