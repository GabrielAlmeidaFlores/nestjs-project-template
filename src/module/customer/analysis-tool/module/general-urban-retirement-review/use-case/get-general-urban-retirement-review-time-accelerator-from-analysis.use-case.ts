import { Inject, Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/general-urban-retirement-review-analysis-result.query.repository.gateway';
import { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';
import { GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-time-accelerator-from-analysis.response.dto';
import { GeneralUrbanRetirementReviewAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-analysis-result-not-found.error';

type GeneralUrbanRetirementReviewTimeAcceleratorJsonType = {
  tipo?: string;
  nome?: string;
  empresa?: string;
  periodoInicio?: Date;
  periodoFim?: Date;
  viabilidade?: string;
  reconhecimentoINSS?: string;
  impactoCarencia?: string;
  reconhecimentoJudicial?: string;
  tempoContribuicao?: string;
  observacaoTecnica?: string;
};

@Injectable()
export class GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway: GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewAnalysisResultId: GeneralUrbanRetirementReviewAnalysisResultId,
  ): Promise<GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisResponseDto> {
    const analysisResult =
      await this.generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewAnalysisResultIdOrFail(
        generalUrbanRetirementReviewAnalysisResultId,
        GeneralUrbanRetirementReviewAnalysisResultNotFoundError,
      );

    const rawResponse = analysisResult.response ?? '';

    let jsonString = '';
    const codeFenceMatch = rawResponse.match(
      /```(?:json)?\s*([\s\S]*?)\s*```/i,
    );

    if (
      codeFenceMatch !== null &&
      typeof codeFenceMatch[1] === 'string' &&
      codeFenceMatch[1].trim() !== ''
    ) {
      jsonString = codeFenceMatch[1].trim();
    } else {
      const objMatch = rawResponse.match(/\{[\s\S]*\}/);
      jsonString = objMatch ? objMatch[0] : '{}';
    }

    let parsed: GeneralUrbanRetirementReviewTimeAcceleratorJsonType = {};
    try {
      parsed = JSON.parse(
        jsonString,
      ) as GeneralUrbanRetirementReviewTimeAcceleratorJsonType;
    } catch {
      parsed = {};
    }

    return GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisResponseDto.build(
      {
        timeType: parsed.tipo ?? null,
        name: parsed.nome ?? null,
        institution: parsed.empresa ?? null,
        periodStart:
          typeof parsed.periodoInicio === 'string'
            ? new Date(parsed.periodoInicio)
            : null,
        periodEnd:
          typeof parsed.periodoFim === 'string'
            ? new Date(parsed.periodoFim)
            : null,
        viability: parsed.viabilidade ?? null,
        recognitionINSS: parsed.reconhecimentoINSS ?? null,
        impactoCarencia: parsed.impactoCarencia ?? null,
        reconhecimentoJudicial: parsed.reconhecimentoJudicial ?? null,
        timeGained: parsed.tempoContribuicao ?? null,
        technicalNote: parsed.observacaoTecnica ?? null,
      },
    );
  }
}
