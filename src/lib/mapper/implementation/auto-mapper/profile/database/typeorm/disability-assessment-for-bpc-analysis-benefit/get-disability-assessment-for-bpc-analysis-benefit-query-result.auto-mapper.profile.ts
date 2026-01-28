import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-benefit.entity';
import { GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-benefit.query.result';

@Injectable()
export class GetDisabilityAssessmentForBpcAnalysisBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityAssessmentForBpcAnalysisBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
    ): GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult => {
      return GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult.build({
        ...source,
        id: new Guid(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
      GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult,
    ): DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity => {
      return DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        disabilityAssessmentForBpcAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult,
      DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
