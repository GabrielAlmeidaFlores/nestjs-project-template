import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity';
import { RetirementPermanentDisabilityRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/value-object/retirement-permanent-disability-rejection-period-document-id/retirement-permanent-disability-rejection-period-document-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodDocumentEntityAutoMapperProfile.name;

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
      RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
      RetirementPermanentDisabilityRejectionPeriodDocumentEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
        ): RetirementPermanentDisabilityRejectionPeriodDocumentEntity => {
          if (!source.retirementPermanentDisabilityRejectionPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                RetirementPermanentDisabilityRejectionPeriodDocumentEntity.name,
              sourceClass:
                RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity.name,
            });
          }

          return new RetirementPermanentDisabilityRejectionPeriodDocumentEntity(
            {
              id: new RetirementPermanentDisabilityRejectionPeriodDocumentId(
                source.id,
              ),
              document: source.document,
              retirementPermanentDisabilityRejectionPeriodId:
                new RetirementPermanentDisabilityRejectionPeriodId(
                  source.retirementPermanentDisabilityRejectionPeriod.id,
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
      RetirementPermanentDisabilityRejectionPeriodDocumentEntity,
      RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: RetirementPermanentDisabilityRejectionPeriodDocumentEntity,
        ): RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity =>
          RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              document: source.document,
              retirementPermanentDisabilityRejectionPeriod:
                RetirementPermanentDisabilityRejectionPeriodTypeormEntity.build(
                  {
                    id: source.retirementPermanentDisabilityRejectionPeriodId.toString(),
                  } as RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
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
