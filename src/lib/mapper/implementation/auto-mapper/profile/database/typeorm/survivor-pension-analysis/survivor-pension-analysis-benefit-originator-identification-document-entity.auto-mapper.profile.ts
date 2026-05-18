import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/survivor-pension-analysis-benefit-originator-identification-document.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/value-object/survivor-pension-analysis-benefit-originator-identification-document-id/survivor-pension-analysis-benefit-originator-identification-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntityAutoMapperProfile.name;

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
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
        ): SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity => {
          if (!source.benefitOriginatorIdentification) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity.name,
              sourceClass:
                SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity.name,
            });
          }

          return new SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity(
            {
              id: new SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId(
                source.id,
              ),
              documentType: source.documentType,
              documentName: source.documentName,
              survivorPensionAnalysisBenefitOriginatorIdentificationId:
                new SurvivorPensionAnalysisBenefitOriginatorIdentificationId(
                  source.benefitOriginatorIdentification.id,
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
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
      constructUsing(
        (
          source: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity,
        ): SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity =>
          SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity.build(
            {
              id: source.id.toString(),
              documentType: source.documentType,
              documentName: source.documentName,
              benefitOriginatorIdentification:
                SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity.build(
                  {
                    id: source.survivorPensionAnalysisBenefitOriginatorIdentificationId.toString(),
                  } as SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
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
