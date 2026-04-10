import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-document.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';

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
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantDocumentEntity.name,
              sourceClass: DeathBenefitGrantDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantDocumentEntity({
            id: new DeathBenefitGrantDocumentId(source.id),
            document: source.document,
            type: source.type,
            deathBenefitGrantId: new DeathBenefitGrantId(
              source.deathBenefitGrant.id,
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
            deathBenefitGrant: DeathBenefitGrantTypeormEntity.build({
              id: source.deathBenefitGrantId.toString(),
            } as DeathBenefitGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
