import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent-document.typeorm.entity';
import { DeathBenefitDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';
import { DeathBenefitDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/death-benefit-dependent-document.entity';
import { DeathBenefitDependentDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/value-object/death-benefit-dependent-document-id.value-object';

@Injectable()
export class DeathBenefitDependentDocumentEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitDependentDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitDependentDocumentTypeormEntity,
      DeathBenefitDependentDocumentEntity,
      constructUsing(
        (source: DeathBenefitDependentDocumentTypeormEntity): DeathBenefitDependentDocumentEntity => {
          if (!source.deathBenefitDependent) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitDependentDocumentEntity.name,
              sourceClass: DeathBenefitDependentDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitDependentDocumentEntity({
            id: new DeathBenefitDependentDocumentId(source.id),
            document: source.document,
            deathBenefitDependentId: new DeathBenefitDependentId(source.deathBenefitDependent.id),
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
      DeathBenefitDependentDocumentEntity,
      DeathBenefitDependentDocumentTypeormEntity,
      constructUsing(
        (source: DeathBenefitDependentDocumentEntity): DeathBenefitDependentDocumentTypeormEntity =>
          DeathBenefitDependentDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            deathBenefitDependent: DeathBenefitDependentTypeormEntity.build({
              id: source.deathBenefitDependentId.toString(),
            } as DeathBenefitDependentTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
