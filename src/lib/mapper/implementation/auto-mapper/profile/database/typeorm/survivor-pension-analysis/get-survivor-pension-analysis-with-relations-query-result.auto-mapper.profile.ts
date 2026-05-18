import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { GetSurvivorPensionAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/result/get-survivor-pension-analysis-with-relations.query.result';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/result/get-survivor-pension-analysis-benefit-originator-identification.query.result';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/result/get-survivor-pension-analysis-customer-profile-identification.query.result';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/result/get-survivor-pension-analysis-deceased-benefit-dependents.query.result';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/result/get-survivor-pension-analysis-deceased-work-history.query.result';
import { GetSurvivorPensionAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/result/get-survivor-pension-analysis-result.query.result';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';

@Injectable()
export class GetSurvivorPensionAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSurvivorPensionAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SurvivorPensionAnalysisTypeormEntity,
    ): GetSurvivorPensionAnalysisWithRelationsQueryResult => {
      const customerProfileIdentification = source.customerProfileIdentification
        ? this.mapper.map(
            source.customerProfileIdentification,
            SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
            GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult,
          )
        : null;

      const benefitOriginatorIdentification =
        source.benefitOriginatorIdentification
          ? this.mapper.map(
              source.benefitOriginatorIdentification,
              SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
              GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult,
            )
          : null;

      const deceasedWorkHistory = source.deceasedWorkHistory
        ? this.mapper.map(
            source.deceasedWorkHistory,
            SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
            GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult,
          )
        : null;

      const deceasedBenefitDependents = (
        source.deceasedBenefitDependents ?? []
      ).map((dependent) =>
        this.mapper.map(
          dependent,
          SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
          GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult,
        ),
      );

      const result = source.result
        ? this.mapper.map(
            source.result,
            SurvivorPensionAnalysisResultTypeormEntity,
            GetSurvivorPensionAnalysisResultQueryResult,
          )
        : null;

      return GetSurvivorPensionAnalysisWithRelationsQueryResult.build({
        id: new SurvivorPensionAnalysisId(source.id),
        customerProfileIdentification,
        benefitOriginatorIdentification,
        deceasedWorkHistory,
        deceasedBenefitDependents,
        result,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SurvivorPensionAnalysisTypeormEntity,
      GetSurvivorPensionAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
