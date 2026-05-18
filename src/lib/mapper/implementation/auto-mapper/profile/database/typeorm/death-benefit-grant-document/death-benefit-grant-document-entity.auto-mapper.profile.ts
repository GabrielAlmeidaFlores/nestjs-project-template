import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-document.typeorm.entity';
import { DeathBenefitGrantInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-institutor.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';
import { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

@Injectable()
export class DeathBenefitGrantDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitGrantDocumentTypeormEntity,
      DeathBenefitGrantDocumentEntity,
      constructUsing(
        (
          source: DeathBenefitGrantDocumentTypeormEntity,
        ): DeathBenefitGrantDocumentEntity => {
          if (!source.deathBenefitGrantInstitutor) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantDocumentEntity.name,
              sourceClass: DeathBenefitGrantDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantDocumentEntity({
            id: new DeathBenefitGrantDocumentId(source.id),
            document: source.document,
            type: source.type,
            deathBenefitGrantInstitorId: new DeathBenefitGrantInstitorId(
              source.deathBenefitGrantInstitutor.id,
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
      DeathBenefitGrantDocumentEntity,
      DeathBenefitGrantDocumentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantDocumentEntity,
        ): DeathBenefitGrantDocumentTypeormEntity =>
          DeathBenefitGrantDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            deathBenefitGrantInstitutor:
              DeathBenefitGrantInstitorTypeormEntity.build({
                id: source.deathBenefitGrantInstitorId.toString(),
              } as DeathBenefitGrantInstitorTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
