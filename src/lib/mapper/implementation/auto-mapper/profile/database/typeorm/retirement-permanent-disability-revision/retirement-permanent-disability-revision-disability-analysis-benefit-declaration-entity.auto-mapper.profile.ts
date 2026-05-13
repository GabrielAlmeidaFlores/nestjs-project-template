import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-declaration-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity => {
      if (!source.retirementPerDisRevDisAnalysisBenefit) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity(
        {
          id: new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationId(
            source.id,
          ),
          retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId:
            new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId(
              source.retirementPerDisRevDisAnalysisBenefit.id,
            ),
          fileName: source.fileName,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity,
    ): RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity.build(
        {
          id: source.id.toString(),
          fileName: source.fileName,
          retirementPerDisRevDisAnalysisBenefit: {
            id: source.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId.toString(),
          } as RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity,
      constructUsing(convert),
    );
  }
}
