import { Inject, Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/query/general-urban-retirement-grant-analysis-result.query.repository.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-time-accelerator-from-analysis.response.dto';
import { GeneralUrbanRetirementGrantAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-analysis-result-not-found.error';

type GeneralUrbanRetirementGrantTimeAcceleratorJsonType = {
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
export class GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantAnalysisResultQueryRepositoryGateway: GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementGrantAnalysisResultId: GeneralUrbanRetirementGrantAnalysisResultId,
  ): Promise<GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto> {
    const analysisResult =
      await this.generalUrbanRetirementGrantAnalysisResultQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantAnalysisResultIdOrFail(
        generalUrbanRetirementGrantAnalysisResultId,
        GeneralUrbanRetirementGrantAnalysisResultNotFoundError,
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

    let parsed: GeneralUrbanRetirementGrantTimeAcceleratorJsonType = {};
    try {
      parsed = JSON.parse(
        jsonString,
      ) as GeneralUrbanRetirementGrantTimeAcceleratorJsonType;
    } catch {
      parsed = {};
    }

    return GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto.build(
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
