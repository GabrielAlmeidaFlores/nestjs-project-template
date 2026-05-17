import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientInterviewFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-interview-form.typeorm.entity';
import { GetAnalysisToolClientInterviewFormQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/query/result/get-analysis-tool-client-interview-form.query.result';
import { AnalysisToolClientInterviewFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/value-object/analysis-tool-client-interview-form-id/analysis-tool-client-interview-form-id.value-object';

@Injectable()
export class GetAnalysisToolClientInterviewFormQueryResultAutoMapperProfile {
  protected readonly _type = GetAnalysisToolClientInterviewFormQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: AnalysisToolClientInterviewFormTypeormEntity,
    ): GetAnalysisToolClientInterviewFormQueryResult => {
      return GetAnalysisToolClientInterviewFormQueryResult.build({
        ...source,
        id: new AnalysisToolClientInterviewFormId(source.id),
      });
    };

    createMap(
      this.mapper,
      AnalysisToolClientInterviewFormTypeormEntity,
      GetAnalysisToolClientInterviewFormQueryResult,
      constructUsing(convert),
    );
  }
}
