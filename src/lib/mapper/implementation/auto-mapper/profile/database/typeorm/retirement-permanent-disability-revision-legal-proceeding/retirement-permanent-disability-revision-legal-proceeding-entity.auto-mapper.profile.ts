import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-legal-proceeding.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/retirement-permanent-disability-revision-legal-proceeding.entity';
import { RetirementPermanentDisabilityRevisionLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/value-object/retirement-permanent-disability-revision-legal-proceeding-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
    ): RetirementPermanentDisabilityRevisionLegalProceedingEntity => {
      if (!source.retirementPermanentDisabilityRevision) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionLegalProceedingEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionLegalProceedingEntity({
        id: new RetirementPermanentDisabilityRevisionLegalProceedingId(
          source.id,
        ),
        legalProceedingNumber: source.legalProceedingNumber,
        retirementPermanentDisabilityRevisionId:
          new RetirementPermanentDisabilityRevisionId(
            source.retirementPermanentDisabilityRevision.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
      RetirementPermanentDisabilityRevisionLegalProceedingEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionLegalProceedingEntity,
    ): RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity => {
      return RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity.build(
        {
          id: source.id.toString(),
          legalProceedingNumber: source.legalProceedingNumber,
          retirementPermanentDisabilityRevision: {
            id: source.retirementPermanentDisabilityRevisionId.toString(),
          } as RetirementPermanentDisabilityRevisionTypeormEntity,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionLegalProceedingEntity,
      RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
      constructUsing(convert),
    );
  }
}
