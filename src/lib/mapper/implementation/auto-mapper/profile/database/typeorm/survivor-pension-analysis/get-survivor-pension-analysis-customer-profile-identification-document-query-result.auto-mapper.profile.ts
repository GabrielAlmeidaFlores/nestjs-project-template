import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification-document.typeorm.entity';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification-document/query/result/get-survivor-pension-analysis-customer-profile-identification-document.query.result';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/value-object/survivor-pension-analysis-customer-profile-identification-document-id/survivor-pension-analysis-customer-profile-identification-document-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
    ): GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult => {
      return GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult.build(
        {
          id: new SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId(
            source.id,
          ),
          documentType: source.documentType,
          documentName: source.documentName,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
        },
      );
    };

    createMap(
      this.mapper,
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
      GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
