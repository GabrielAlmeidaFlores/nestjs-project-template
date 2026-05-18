import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification-document.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/result/get-survivor-pension-analysis-customer-profile-identification.query.result';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification-document/query/result/get-survivor-pension-analysis-customer-profile-identification-document.query.result';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    ): GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult => {
      if (!source.survivorPensionAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult.name,
          sourceClass:
            SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity.name,
        });
      }

      const documents = (source.documents ?? []).map((doc) =>
        this.mapper.map(
          doc,
          SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
          GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult,
        ),
      );

      return GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult.build(
        {
          id: new SurvivorPensionAnalysisCustomerProfileIdentificationId(
            source.id,
          ),
          survivorPensionAnalysisId: new SurvivorPensionAnalysisId(
            source.survivorPensionAnalysis.id,
          ),
          analysisToolClientId:
            source.analysisToolClientId !== null
              ? new AnalysisToolClientId(source.analysisToolClientId)
              : null,
          clientJobTitle: source.clientJobTitle,
          legalProceedingNumber: source.legalProceedingNumber,
          inssBenefitNumber: source.inssBenefitNumber,
          analysisName: source.analysisName,
          analysisPurpose: source.analysisPurpose,
          documents,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult,
      mappingFunction,
    );
  }
}
