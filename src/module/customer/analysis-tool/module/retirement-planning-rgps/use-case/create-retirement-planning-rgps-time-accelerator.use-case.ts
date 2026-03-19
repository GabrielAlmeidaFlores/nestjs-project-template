import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { MarkdownConverterGateway } from '@lib/markdown-converter/markdown-converter.gateway';
import { RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-analysis-result/query/retirement-planning-rgps-analysis-result.query.repository.gateway.ts';
import { RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/command/retirement-planning-rgps-time-accelerator.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.entity';
import { CreateRetirementPlanningRgpsTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-retirement-planning-rgps-time-accelerator.request.dto';
import { CreateRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps-time-accelerator.response.dto';
import { RetirementPlanningRgpsAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-analysis-result-not-found.error';

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
  observacaoTecnica?: string;
};

@Injectable()
export class CreateRetirementPlanningRgpsTimeAcceleratorUseCase {
  protected readonly _type =
    CreateRetirementPlanningRgpsTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway)
    private readonly retirementPlanningRgpsAnalysisResultQueryRepositoryGateway: RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway)
    private readonly retirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway: RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
  ) {}

  public async execute(
    dto: CreateRetirementPlanningRgpsTimeAcceleratorRequestDto,
  ): Promise<CreateRetirementPlanningRgpsTimeAcceleratorResponseDto> {
    const analysisResult =
      await this.retirementPlanningRgpsAnalysisResultQueryRepositoryGateway.findOneByRetirementPlanningRgpsAnalysisResultIdOrFail(
        dto.json.retirementPlanningRgpsAnalysisResultId,
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
      parsed = JSON.parse(jsonString) as object;
    } catch {
      parsed = {};
    }

    const timeAccelerator = new RetirementPlanningRgpsTimeAcceleratorEntity({
      timeType: parsed.tipo ?? 'N/A',
      name: parsed.nome ?? 'N/A',
      institution: parsed.empresa ?? 'N/A',
      periodStart: parsed.periodoInicio ? new Date(parsed.periodoInicio) : null,
      periodEnd: parsed.periodoFim ? new Date(parsed.periodoFim) : null,
      viability: parsed.viabilidade ?? 'N/A',
      technicalNote: parsed.observacaoTecnica
        ? await this.markdownConverterGateway.convertToHtml(parsed.observacaoTecnica)
        : 'N/A',
      affectsQualifyingPeriod: parsed.impactoCarencia === 'true',
      recognitionInss: parsed.reconhecimentoINSS ?? 'N/A',
      recognitionJudicial: parsed.reconhecimentoJudicial ?? 'N/A',
      retirementPlanningRgps: analysisResult.retirementPlanningRgps,
    });

    const createTx =
      this.retirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway.createRetirementPlanningRgpsTimeAccelerator(
        timeAccelerator,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      createTx,
    ]);

    await transactions.commit();

    return CreateRetirementPlanningRgpsTimeAcceleratorResponseDto.build({
      retirementPlanningRgpsTimeAcceleratorId: timeAccelerator.id,
    });
  }
}
