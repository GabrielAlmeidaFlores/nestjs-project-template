import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityAutoMapperProfile {
  protected readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    ): SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity.name,
          sourceClass:
            SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity.name,
        });
      }

      return new SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity({
        id: new SurvivorPensionAnalysisBenefitOriginatorIdentificationId(
          source.id,
        ),
        survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
          source.survivorPensionAnalysis.id,
        ),
        clientName: source.clientName,
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? new FederalDocument(source.clientFederalDocument)
            : null,
        clientBirthDate: source.clientBirthDate,
        clientGender: source.clientGender as GenderEnum | null,
        deathDate: source.deathDate,
        federativeEntity: source.federativeEntity,
        stateCode: source.stateCode,
        beneficiaryWasRetired: source.beneficiaryWasRetired,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
    ): SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity => {
      return SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity.build(
        {
          id: source.id.toString(),
          clientName: source.clientName,
          clientFederalDocument:
            source.clientFederalDocument !== null
              ? source.clientFederalDocument.toString()
              : null,
          clientBirthDate: source.clientBirthDate,
          clientGender: source.clientGender,
          deathDate: source.deathDate,
          federativeEntity: source.federativeEntity,
          stateCode: source.stateCode,
          beneficiaryWasRetired: source.beneficiaryWasRetired,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
          survivorPensionAnalysis: SurvivorPensionAnalysisTypeormEntity.build({
            id: source.survivorPensionAnalysisId.toString(),
          } as SurvivorPensionAnalysisTypeormEntity),
          documents: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
      mappingFunction,
    );
  }
}
