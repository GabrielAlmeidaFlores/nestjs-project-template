import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-insured-status.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/temporary-disability-benefits-terminated-insured-status-document.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/value-object/temporary-disability-benefits-terminated-insured-status-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsTerminatedInsuredStatus) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity(
            {
              id: new TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsTerminatedInsuredStatusId:
                new TemporaryDisabilityBenefitsTerminatedInsuredStatusId(
                  source.temporaryDisabilityBenefitsTerminatedInsuredStatus.id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntity,
        ): TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsTerminatedInsuredStatus:
                TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsTerminatedInsuredStatusId.toString(),
                  } as TemporaryDisabilityBenefitsTerminatedInsuredStatusTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
