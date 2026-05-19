import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/query/general-urban-retirement-grant-analysis-result.query.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/command/general-urban-retirement-grant-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.entity';
import { CreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant-time-accelerator.request.dto';
import { CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-time-accelerator.response.dto';
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
export class CreateGeneralUrbanRetirementGrantTimeAcceleratorUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementGrantTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantAnalysisResultQueryRepositoryGateway: GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway: GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto> {
    const analysisResult =
      await this.generalUrbanRetirementGrantAnalysisResultQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantAnalysisResultIdOrFail(
        dto.json.generalUrbanRetirementGrantAnalysisResultId,
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
      parsed = JSON.parse(jsonString) as object;
    } catch {
      parsed = {};
    }

    const generalUrbanRetirementGrant =
      analysisResult.generalUrbanRetirementGrant;
    if (!generalUrbanRetirementGrant) {
      throw new GeneralUrbanRetirementGrantAnalysisResultNotFoundError();
    }

    const timeAccelerator =
      new GeneralUrbanRetirementGrantTimeAcceleratorEntity({
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
        generalUrbanRetirementGrant,
      });

    const createTx =
      this.generalUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway.createGeneralUrbanRetirementGrantTimeAccelerator(
        timeAccelerator,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      createTx,
    ]);

    await transactions.commit();

    return CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto.build({
      generalUrbanRetirementGrantTimeAcceleratorId: timeAccelerator.id,
    });
  }
}
