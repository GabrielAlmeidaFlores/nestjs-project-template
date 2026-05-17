import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolClientCadastralFormQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/analysis-tool-client-cadastral-form.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { GetAnalysisToolClientCadastralFormResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-cadastral-form.response.dto';

@Injectable()
export class GetAnalysisToolClientCadastralFormUseCase {
  protected readonly _type = GetAnalysisToolClientCadastralFormUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientCadastralFormQueryRepositoryGateway)
    private readonly cadastralFormQueryRepositoryGateway: AnalysisToolClientCadastralFormQueryRepositoryGateway,
  ) {}

  public async execute(
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientCadastralFormResponseDto> {
    const result =
      await this.cadastralFormQueryRepositoryGateway.findByAnalysisToolClientId(
        analysisToolClientId,
      );

    if (result === null) {
      return GetAnalysisToolClientCadastralFormResponseDto.build({});
    }

    return GetAnalysisToolClientCadastralFormResponseDto.build({ ...result });
  }
}
