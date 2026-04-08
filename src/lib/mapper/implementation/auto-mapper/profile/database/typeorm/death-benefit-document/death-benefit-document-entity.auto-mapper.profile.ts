import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-document.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity';
import { DeathBenefitDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/value-object/death-benefit-document-id.value-object';

@Injectable()
export class DeathBenefitDocumentEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitDocumentTypeormEntity,
      DeathBenefitDocumentEntity,
      constructUsing(
        (source: DeathBenefitDocumentTypeormEntity): DeathBenefitDocumentEntity => {
          if (!source.deathBenefit) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitDocumentEntity.name,
              sourceClass: DeathBenefitDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitDocumentEntity({
            id: new DeathBenefitDocumentId(source.id),
            document: source.document,
            type: source.type,
            deathBenefitId: new DeathBenefitId(source.deathBenefit.id),
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
      DeathBenefitDocumentEntity,
      DeathBenefitDocumentTypeormEntity,
      constructUsing(
        (source: DeathBenefitDocumentEntity): DeathBenefitDocumentTypeormEntity =>
          DeathBenefitDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            deathBenefit: DeathBenefitTypeormEntity.build({
              id: source.deathBenefitId.toString(),
            } as DeathBenefitTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
