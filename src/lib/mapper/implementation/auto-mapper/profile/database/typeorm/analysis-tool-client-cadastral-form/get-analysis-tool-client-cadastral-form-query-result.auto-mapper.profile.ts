import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientCadastralFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-cadastral-form.typeorm.entity';
import { GetAnalysisToolClientCadastralFormQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/result/get-analysis-tool-client-cadastral-form.query.result';
import { AnalysisToolClientCadastralFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/value-object/analysis-tool-client-cadastral-form-id/analysis-tool-client-cadastral-form-id.value-object';

@Injectable()
export class GetAnalysisToolClientCadastralFormQueryResultAutoMapperProfile {
  protected readonly _type = GetAnalysisToolClientCadastralFormQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: AnalysisToolClientCadastralFormTypeormEntity,
    ): GetAnalysisToolClientCadastralFormQueryResult => {
      return GetAnalysisToolClientCadastralFormQueryResult.build({
        ...source,
        id: new AnalysisToolClientCadastralFormId(source.id),
      });
    };

    createMap(
      this.mapper,
      AnalysisToolClientCadastralFormTypeormEntity,
      GetAnalysisToolClientCadastralFormQueryResult,
      constructUsing(convert),
    );
  }
}
