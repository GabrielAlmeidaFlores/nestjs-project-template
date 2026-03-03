import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AudienceQuestionGeneratorBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/audience-question-generator-benefit.typeorm.entity';
import { GetAudienceQuestionGeneratorBenefitQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-benefit/query/result/get-audience-question-generator-benefit.query.result';
import { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';

@Injectable()
export class GetAudienceQuestionGeneratorBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAudienceQuestionGeneratorBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AudienceQuestionGeneratorBenefitTypeormEntity,
    ): GetAudienceQuestionGeneratorBenefitQueryResult => {
      return GetAudienceQuestionGeneratorBenefitQueryResult.build({
        ...source,
        id: new AudienceQuestionGeneratorBenefitId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      AudienceQuestionGeneratorBenefitTypeormEntity,
      GetAudienceQuestionGeneratorBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAudienceQuestionGeneratorBenefitQueryResult,
    ): AudienceQuestionGeneratorBenefitTypeormEntity => {
      return AudienceQuestionGeneratorBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        audienceQuestionGenerator: undefined,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetAudienceQuestionGeneratorBenefitQueryResult,
      AudienceQuestionGeneratorBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
