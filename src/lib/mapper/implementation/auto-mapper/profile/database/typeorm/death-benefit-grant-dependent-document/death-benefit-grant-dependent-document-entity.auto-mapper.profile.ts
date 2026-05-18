import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent-document.typeorm.entity';
import { DeathBenefitGrantDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import { DeathBenefitGrantDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.entity';
import { DeathBenefitGrantDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/value-object/death-benefit-grant-dependent-document-id.value-object';

@Injectable()
export class DeathBenefitGrantDependentDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantDependentDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitGrantDependentDocumentTypeormEntity,
      DeathBenefitGrantDependentDocumentEntity,
      constructUsing(
        (
          source: DeathBenefitGrantDependentDocumentTypeormEntity,
        ): DeathBenefitGrantDependentDocumentEntity => {
          if (!source.deathBenefitGrantDependent) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantDependentDocumentEntity.name,
              sourceClass: DeathBenefitGrantDependentDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantDependentDocumentEntity({
            id: new DeathBenefitGrantDependentDocumentId(source.id),
            document: source.document,
            deathBenefitGrantDependentId: new DeathBenefitGrantDependentId(
              source.deathBenefitGrantDependent.id,
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
      DeathBenefitGrantDependentDocumentEntity,
      DeathBenefitGrantDependentDocumentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantDependentDocumentEntity,
        ): DeathBenefitGrantDependentDocumentTypeormEntity =>
          DeathBenefitGrantDependentDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            deathBenefitGrantDependent:
              DeathBenefitGrantDependentTypeormEntity.build({
                id: source.deathBenefitGrantDependentId.toString(),
              } as DeathBenefitGrantDependentTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
