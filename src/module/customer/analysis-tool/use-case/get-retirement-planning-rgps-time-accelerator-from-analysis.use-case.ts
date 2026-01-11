import { Inject, Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/query/retirement-planning-rgps-analysis-result.query.repository.gateway.ts';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import { GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-time-accelerator-from-analysis.response.dto';
import { RetirementPlanningRgpsAnalysisResultNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-analysis-result-not-found.error';

type RetirementPlanningRgpsTimeAcceleratorJsonType = {
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
export class GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase {
  protected readonly _type =
    GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway)
    private readonly retirementPlanningRgpsAnalysisResultQueryRepositoryGateway: RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsAnalysisResultId: RetirementPlanningRgpsAnalysisResultId,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisResponseDto> {
    const analysisResult =
      await this.retirementPlanningRgpsAnalysisResultQueryRepositoryGateway.findOneByRetirementPlanningRgpsAnalysisResultIdOrFail(
        retirementPlanningRgpsAnalysisResultId,
        RetirementPlanningRgpsAnalysisResultNotFoundError,
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

    let parsed: RetirementPlanningRgpsTimeAcceleratorJsonType = {};
    try {
      parsed = JSON.parse(
        jsonString,
      ) as RetirementPlanningRgpsTimeAcceleratorJsonType;
    } catch {
      parsed = {};
    }

    return GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisResponseDto.build(
      {
        timeType: parsed.tipo as string,
        name: parsed.nome as string,
        institution: parsed.empresa as string,
        periodStart:
          typeof parsed.periodoInicio === 'string'
            ? new Date(parsed.periodoInicio)
            : null,
        periodEnd:
          typeof parsed.periodoFim === 'string'
            ? new Date(parsed.periodoFim)
            : null,
        viability: parsed.viabilidade as string,
        recognitionINSS: parsed.reconhecimentoINSS as string,
        impactoCarencia: parsed.impactoCarencia as string,
        reconhecimentoJudicial: parsed.reconhecimentoJudicial as string,
        timeGained: parsed.tempoContribuicao as string,
        technicalNote: parsed.observacaoTecnica as string,
      },
    );
  }
}
