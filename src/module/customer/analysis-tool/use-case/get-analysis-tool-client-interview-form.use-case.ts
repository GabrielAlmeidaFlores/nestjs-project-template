import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolClientInterviewFormQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/query/analysis-tool-client-interview-form.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { GetAnalysisToolClientInterviewFormResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-interview-form.response.dto';

@Injectable()
export class GetAnalysisToolClientInterviewFormUseCase {
  protected readonly _type = GetAnalysisToolClientInterviewFormUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientInterviewFormQueryRepositoryGateway)
    private readonly interviewFormQueryRepositoryGateway: AnalysisToolClientInterviewFormQueryRepositoryGateway,
  ) {}

  public async execute(
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientInterviewFormResponseDto> {
    const result =
      await this.interviewFormQueryRepositoryGateway.findByAnalysisToolClientId(
        analysisToolClientId,
      );

    if (result === null) {
      return GetAnalysisToolClientInterviewFormResponseDto.build({});
    }

    return GetAnalysisToolClientInterviewFormResponseDto.build({ ...result });
  }
}
