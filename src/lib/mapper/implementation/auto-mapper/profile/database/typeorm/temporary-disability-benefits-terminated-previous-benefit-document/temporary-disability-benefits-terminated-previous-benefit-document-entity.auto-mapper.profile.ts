import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/temporary-disability-benefits-terminated-previous-benefit-document.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/value-object/temporary-disability-benefits-terminated-previous-benefit-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsTerminatedPreviousBenefit) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity(
            {
              id: new TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId(
                source.id,
              ),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsTerminatedPreviousBenefitId:
                new TemporaryDisabilityBenefitsTerminatedPreviousBenefitId(
                  source.temporaryDisabilityBenefitsTerminatedPreviousBenefit
                    .id,
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
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity,
        ): TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              fileName: source.fileName,
              type: source.type,
              temporaryDisabilityBenefitsTerminatedPreviousBenefit:
                TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsTerminatedPreviousBenefitId.toString(),
                  } as TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
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
