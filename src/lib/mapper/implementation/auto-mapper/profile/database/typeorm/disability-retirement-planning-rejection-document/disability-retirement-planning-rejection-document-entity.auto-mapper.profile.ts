import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-document.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity';
import { DisabilityRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/value-object/disability-retirement-planning-rejection-document-id/disability-retirement-planning-rejection-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionDocumentEntityAutoMapperProfile.name;

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
      DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
      DisabilityRetirementPlanningRejectionDocumentEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
        ): DisabilityRetirementPlanningRejectionDocumentEntity => {
          if (!source.disabilityRetirementPlanningRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DisabilityRetirementPlanningRejectionDocumentEntity.name,
              sourceClass:
                DisabilityRetirementPlanningRejectionDocumentTypeormEntity.name,
            });
          }

          return new DisabilityRetirementPlanningRejectionDocumentEntity({
            id: new DisabilityRetirementPlanningRejectionDocumentId(source.id),
            document: source.document,
            type: source.type,
            disabilityRetirementPlanningRejectionId:
              new DisabilityRetirementPlanningRejectionId(
                source.disabilityRetirementPlanningRejection.id,
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
      DisabilityRetirementPlanningRejectionDocumentEntity,
      DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionDocumentEntity,
        ): DisabilityRetirementPlanningRejectionDocumentTypeormEntity =>
          DisabilityRetirementPlanningRejectionDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            disabilityRetirementPlanningRejection:
              DisabilityRetirementPlanningRejectionTypeormEntity.build({
                id: source.disabilityRetirementPlanningRejectionId.toString(),
              } as DisabilityRetirementPlanningRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
