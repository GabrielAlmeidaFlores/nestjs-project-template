import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/general-urban-retirement-review-analysis-result.query.repository.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/command/general-urban-retirement-review-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.entity';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-time-accelerator.request.dto';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-time-accelerator.response.dto';
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
export class CreateGeneralUrbanRetirementReviewTimeAcceleratorUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementReviewTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway: GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway: GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateGeneralUrbanRetirementReviewTimeAcceleratorRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto> {
    const analysisResult =
      await this.generalUrbanRetirementReviewAnalysisResultQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewAnalysisResultIdOrFail(
        dto.json.generalUrbanRetirementReviewAnalysisResultId,
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
      parsed = JSON.parse(jsonString) as object;
    } catch {
      parsed = {};
    }

    const generalUrbanRetirementReview =
      analysisResult.generalUrbanRetirementReview;
    if (!generalUrbanRetirementReview) {
      throw new GeneralUrbanRetirementReviewAnalysisResultNotFoundError();
    }

    const timeAccelerator =
      new GeneralUrbanRetirementReviewTimeAcceleratorEntity({
        timeType: parsed.tipo ?? 'N/A',
        name: parsed.nome ?? 'N/A',
        institution: parsed.empresa ?? 'N/A',
        periodStart: parsed.periodoInicio
          ? new Date(parsed.periodoInicio)
          : null,
        periodEnd: parsed.periodoFim ? new Date(parsed.periodoFim) : null,
        viability: parsed.viabilidade ?? 'N/A',
        technicalNote: parsed.observacaoTecnica ?? 'N/A',
        affectsQualifyingPeriod: parsed.impactoCarencia === 'true',
        timeGained: parsed.tempoContribuicao ?? 'N/A',
        recognitionInss: parsed.reconhecimentoINSS ?? 'N/A',
        recognitionJudicial: parsed.reconhecimentoJudicial ?? 'N/A',
        generalUrbanRetirementReview,
      });

    const createTx =
      this.generalUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway.createGeneralUrbanRetirementReviewTimeAccelerator(
        timeAccelerator,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      createTx,
    ]);

    await transactions.commit();

    return CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto.build({
      generalUrbanRetirementReviewTimeAcceleratorId: timeAccelerator.id,
    });
  }
}
