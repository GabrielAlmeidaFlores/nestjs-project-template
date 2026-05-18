import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-inss-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/retirement-permanent-disability-revision-benefit.entity';
import { RetirementPermanentDisabilityRevisionInssBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/value-object/retirement-permanent-disability-revision-inss-benefit-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
    ): RetirementPermanentDisabilityRevisionInssBenefitEntity => {
      if (!source.retirementPermanentDisabilityRevision) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionInssBenefitEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionInssBenefitEntity({
        id: new RetirementPermanentDisabilityRevisionInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        retirementPermanentDisabilityRevision:
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
      RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
      RetirementPermanentDisabilityRevisionInssBenefitEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionInssBenefitEntity,
    ): RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity => {
      return RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity.build(
        {
          id: source.id.toString(),
          inssBenefitNumber: source.inssBenefitNumber,
          retirementPermanentDisabilityRevision: {
            id: source.retirementPermanentDisabilityRevision.toString(),
          } as RetirementPermanentDisabilityRevisionTypeormEntity,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionInssBenefitEntity,
      RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
      constructUsing(convert),
    );
  }
}
