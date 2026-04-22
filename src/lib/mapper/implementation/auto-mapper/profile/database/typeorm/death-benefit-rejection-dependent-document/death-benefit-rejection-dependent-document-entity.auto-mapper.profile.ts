import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent-document.typeorm.entity';
import { DeathBenefitRejectionDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import { DeathBenefitRejectionDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.entity';
import { DeathBenefitRejectionDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/value-object/death-benefit-rejection-dependent-document-id.value-object';

@Injectable()
export class DeathBenefitRejectionDependentDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionDependentDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionDependentDocumentTypeormEntity,
      DeathBenefitRejectionDependentDocumentEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionDependentDocumentTypeormEntity,
        ): DeathBenefitRejectionDependentDocumentEntity => {
          if (!source.deathBenefitRejectionDependent) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DeathBenefitRejectionDependentDocumentEntity.name,
              sourceClass:
                DeathBenefitRejectionDependentDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionDependentDocumentEntity({
            id: new DeathBenefitRejectionDependentDocumentId(source.id),
            document: source.document,
            deathBenefitRejectionDependentId:
              new DeathBenefitRejectionDependentId(
                source.deathBenefitRejectionDependent.id,
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
      DeathBenefitRejectionDependentDocumentEntity,
      DeathBenefitRejectionDependentDocumentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionDependentDocumentEntity,
        ): DeathBenefitRejectionDependentDocumentTypeormEntity =>
          DeathBenefitRejectionDependentDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            deathBenefitRejectionDependent:
              DeathBenefitRejectionDependentTypeormEntity.build({
                id: source.deathBenefitRejectionDependentId.toString(),
              } as DeathBenefitRejectionDependentTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
