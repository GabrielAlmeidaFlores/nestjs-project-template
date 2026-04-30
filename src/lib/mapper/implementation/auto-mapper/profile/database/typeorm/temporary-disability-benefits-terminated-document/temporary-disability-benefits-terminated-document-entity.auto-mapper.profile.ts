import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/temporary-disability-benefits-terminated-document.entity';
import { TemporaryDisabilityBenefitsTerminatedDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/value-object/temporary-disability-benefits-terminated-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedDocumentEntity({
            id: new TemporaryDisabilityBenefitsTerminatedDocumentId(source.id),
            fileName: source.fileName,
            type: source.type,
            temporaryDisabilityBenefitsTerminatedId:
              new TemporaryDisabilityBenefitsTerminatedId(
                source.temporaryDisabilityBenefitsTerminated.id,
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
      TemporaryDisabilityBenefitsTerminatedDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDocumentEntity,
        ): TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedDocumentTypeormEntity.build({
            id: source.id.toString(),
            fileName: source.fileName,
            type: source.type,
            temporaryDisabilityBenefitsTerminated:
              TemporaryDisabilityBenefitsTerminatedTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsTerminatedId.toString(),
              } as TemporaryDisabilityBenefitsTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
