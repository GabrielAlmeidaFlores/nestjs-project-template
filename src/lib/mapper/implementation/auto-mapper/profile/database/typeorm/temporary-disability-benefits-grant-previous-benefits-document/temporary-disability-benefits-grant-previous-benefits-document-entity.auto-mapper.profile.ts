import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/value-object/temporary-disability-benefits-grant-previous-benefits-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsGrantPreviousBenefits) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity(
            {
              id: new TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsGrantPreviousBenefitsId:
                new TemporaryDisabilityBenefitsGrantPreviousBenefitsId(
                  source.temporaryDisabilityBenefitsGrantPreviousBenefits.id,
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
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity,
      TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity,
        ): TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsGrantPreviousBenefits:
                TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsGrantPreviousBenefitsId.toString(),
                  } as TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
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
