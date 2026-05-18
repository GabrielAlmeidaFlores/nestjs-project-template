import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/value-object/temporary-disability-benefits-grant-insured-status-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsGrantInsuredStatus) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity(
            {
              id: new TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsGrantInsuredStatusId:
                new TemporaryDisabilityBenefitsGrantInsuredStatusId(
                  source.temporaryDisabilityBenefitsGrantInsuredStatus.id,
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
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity,
      TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity,
        ): TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsGrantInsuredStatus:
                TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsGrantInsuredStatusId.toString(),
                  } as TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
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
