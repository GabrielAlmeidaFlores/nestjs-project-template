import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity';
import { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantDocumentTypeormEntity,
      TemporaryDisabilityBenefitsGrantDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantDocumentEntity({
            id: new TemporaryDisabilityBenefitsGrantDocumentId(source.id),
            fileName: source.fileName,
            type: source.type,
            temporaryDisabilityBenefitsGrantId:
              new TemporaryDisabilityBenefitsGrantId(
                source.temporaryDisabilityBenefitsGrant.id,
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
      TemporaryDisabilityBenefitsGrantDocumentEntity,
      TemporaryDisabilityBenefitsGrantDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantDocumentEntity,
        ): TemporaryDisabilityBenefitsGrantDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsGrantDocumentTypeormEntity.build({
            id: source.id.toString(),
            fileName: source.fileName,
            type: source.type,
            temporaryDisabilityBenefitsGrant:
              TemporaryDisabilityBenefitsGrantTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsGrantId.toString(),
              } as TemporaryDisabilityBenefitsGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
