import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/query/rural-timeline-cnis-contribution-period-document.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/simulate-rural-timeline-analysis-cnis-contribution-period-adjustment.request.dto';
import { SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/simulate-rural-timeline-analysis-cnis-contribution-period-adjustment.response.dto';
import { RuralTimelineAnalysisCnisContributionPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-cnis-contribution-period-not-found.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface AiAnalysisResultInterface {
  contributionTimeGainedYears: number;
  contributionTimeGainedMonths: number;
  contributionTimeGainedDays: number;
  technicalObservation: string;
}

@Injectable()
export class SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentUseCase {
  protected readonly _type =
    SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway)
    private readonly cnisContributionPeriodQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
    @Inject(RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway)
    private readonly cnisContributionPeriodDocumentQueryRepositoryGateway: RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    cnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    dto: SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto,
  ): Promise<SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    );

    const cnisContributionPeriod =
      await this.cnisContributionPeriodQueryRepositoryGateway.findOneById(
        cnisContributionPeriodId,
      );

    if (cnisContributionPeriod === null) {
      throw new RuralTimelineAnalysisCnisContributionPeriodNotFoundError();
    }

    const periodDocuments =
      await this.cnisContributionPeriodDocumentQueryRepositoryGateway.listRuralTimelineCnisContributionPeriodDocumentsByPeriodId(
        cnisContributionPeriodId,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION,
      );

    const creditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RURAL_TIMELINE_CNIS_CONTRIBUTION_PERIOD_ADJUSTMENT_SIMULATION,
        organizationMember.id,
      );

    const documentBuffers = await Promise.all(
      periodDocuments.map((doc) =>
        this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );

    const aiAnalysis = await this.generateAiAnalysis(
      dto,
      promptResponse.prompt,
      cnisContributionPeriod,
      documentBuffers,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(creditTransaction);
    await transaction.commit();

    const technicalObservationHtml =
      await this.markdownConverterGateway.convertToHtml(
        aiAnalysis.technicalObservation,
      );

    return SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto.build(
      {
        contributionTimeGainedYears: aiAnalysis.contributionTimeGainedYears,
        contributionTimeGainedMonths: aiAnalysis.contributionTimeGainedMonths,
        contributionTimeGainedDays: aiAnalysis.contributionTimeGainedDays,
        technicalObservation: technicalObservationHtml,
        conventionalPeriodStartDate: dto.conventionalPeriodStartDate,
        conventionalPeriodEndDate: dto.conventionalPeriodEndDate,
      },
    );
  }

  private async generateAiAnalysis(
    dto: SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto,
    systemInstruction: string,
    period: RuralTimelineAnalysisCnisContributionPeriodEntity,
    documentBuffers: Buffer[],
  ): Promise<AiAnalysisResultInterface> {
    const originalStart =
      dto.originalPeriodStartDate.toLocaleDateString('pt-BR');
    const originalEnd = dto.originalPeriodEndDate.toLocaleDateString('pt-BR');
    const conventionalStart =
      dto.conventionalPeriodStartDate.toLocaleDateString('pt-BR');
    const conventionalEnd =
      dto.conventionalPeriodEndDate.toLocaleDateString('pt-BR');

    const periodStart =
      period.startDate?.toLocaleDateString('pt-BR') ?? 'não informado';
    const periodEnd =
      period.endDate?.toLocaleDateString('pt-BR') ?? 'não informado';

    const adjustmentIntentLabel = this.resolveAdjustmentIntentLabel(
      period.contributionAdjustmentIntent,
    );
    const statusLabel = this.resolveStatusLabel(period.status);

    const daysPerMonth = 30;
    const daysPerYear = 360;
    const originalDays = this.calcPrevidenciarioDays(
      dto.originalPeriodStartDate,
      dto.originalPeriodEndDate,
    );
    const conventionalDays = this.calcPrevidenciarioDays(
      dto.conventionalPeriodStartDate,
      dto.conventionalPeriodEndDate,
    );
    const diffDays = Math.max(0, conventionalDays - originalDays);
    const gainYears = Math.floor(diffDays / daysPerYear);
    const gainMonths = Math.floor((diffDays % daysPerYear) / daysPerMonth);
    const gainDays = diffDays % daysPerMonth;

    const prompt = `## Dados do Período de Contribuição CNIS

**Empregador / Origem do vínculo:** ${period.employmentRelationshipSource ?? 'não informado'}
**Categoria do segurado:** ${period.category ?? 'não informado'}
**Período registrado no CNIS:** ${periodStart} a ${periodEnd}
**Status do período:** ${statusLabel}
**Período de carência (meses):** ${period.qualifyingPeriod ?? 'não informado'}
**Valor médio de contribuição:** ${period.averageContributionAmount ? `R$ ${period.averageContributionAmount.toNumber().toFixed(2)}` : 'não informado'}
**Intenção de ajuste:** ${adjustmentIntentLabel}
**Suplementação externa prevista:** ${period.externalSupplementationIntent ? 'Sim' : 'Não'}
**Período considerado nos cálculos:** ${period.shouldConsiderPeriod ? 'Sim' : 'Não'}
**Utilizar última remuneração como data de saída:** ${period.shouldConsiderLastRemunerationAsExitDate ? 'Sim' : 'Não'}
${period.impactAnalysis !== null ? `\n**Análise de impacto existente:**\n${period.impactAnalysis}` : ''}

## Ajuste Proposto

**Período original (CNIS):** ${originalStart} a ${originalEnd} (${originalDays} dias previdenciários)
**Período convencional proposto:** ${conventionalStart} a ${conventionalEnd} (${conventionalDays} dias previdenciários)

## Resultado do Cálculo Previdenciário (já calculado — use exatamente estes valores no JSON)

**Dias de acréscimo:** ${diffDays} dias previdenciários (1 mês = 30 dias, 1 ano = 360 dias)
**Tempo de contribuição ganho:** ${gainYears} anos, ${gainMonths} meses e ${gainDays} dias

> Atenção: o período convencional ${conventionalDays <= originalDays ? 'não supera o original — o ajuste é uma regularização sem acréscimo de tempo' : 'supera o original — há ganho de tempo de contribuição'}.

## Instrução para o campo "technicalObservation"

Com base nos dados acima, gere uma observação técnica previdenciária detalhada.

**IMPORTANTE — regras obrigatórias para o campo "technicalObservation":**
- Use EXCLUSIVAMENTE Markdown puro: cabeçalhos com #/##/###, listas com -, tabelas com |, negrito com **
- NÃO use tags HTML (<h1>, <strong>, <br>, etc.) em nenhuma hipótese
- Estruture com as seções: 1. Identificação do vínculo e contextualização; 2. Fundamentação técnica e legal (Lei 8.213/91, Decreto 3.048/99, IN INSS 128/2022); 3. Impacto no tempo de contribuição (use os valores calculados acima); 4. Conclusão`;

    const result =
      await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction,
          prompt,
          promptFiles: documentBuffers,
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: {
              type: 'object',
              properties: {
                contributionTimeGainedYears: {
                  type: 'integer',
                  description:
                    'Anos de contribuição ganhos — use exatamente o valor calculado no prompt (mínimo 0)',
                },
                contributionTimeGainedMonths: {
                  type: 'integer',
                  description:
                    'Meses além dos anos — use exatamente o valor calculado no prompt (0-11)',
                },
                contributionTimeGainedDays: {
                  type: 'integer',
                  description:
                    'Dias além dos meses — use exatamente o valor calculado no prompt (0-29)',
                },
                technicalObservation: {
                  type: 'string',
                  description:
                    'Observação técnica previdenciária detalhada em formato Markdown',
                },
              },
              required: [
                'contributionTimeGainedYears',
                'contributionTimeGainedMonths',
                'contributionTimeGainedDays',
                'technicalObservation',
              ],
            },
          }),
        }),
      );

    if (result === null) {
      return this.buildFallbackAnalysis(dto, gainYears, gainMonths, gainDays);
    }

    try {
      const parsed = JSON.parse(result) as Partial<AiAnalysisResultInterface>;
      // Use TypeScript-computed values (reliable arithmetic); AI values are discarded.
      return {
        contributionTimeGainedYears: gainYears,
        contributionTimeGainedMonths: gainMonths,
        contributionTimeGainedDays: gainDays,
        technicalObservation: parsed.technicalObservation ?? '',
      };
    } catch {
      return this.buildFallbackAnalysis(dto, gainYears, gainMonths, gainDays);
    }
  }

  private calcPrevidenciarioDays(start: Date, end: Date): number {
    const msPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const msPerDay =
      msPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay;
    return Math.max(
      0,
      Math.round((end.getTime() - start.getTime()) / msPerDay) + 1,
    );
  }

  private resolveAdjustmentIntentLabel(
    intent: ContributionAdjustmentIntentTypeEnum,
  ): string {
    const labels: Record<ContributionAdjustmentIntentTypeEnum, string> = {
      [ContributionAdjustmentIntentTypeEnum.INCLUDE]: 'Incluir',
      [ContributionAdjustmentIntentTypeEnum.EXCLUDE]: 'Excluir',
      [ContributionAdjustmentIntentTypeEnum.PROVISIONAL]: 'Provisório',
    };
    return labels[intent];
  }

  private resolveStatusLabel(
    status: RuralTimelineAnalysisCnisContributionPeriodStatusEnum | null,
  ): string {
    if (status === null) {
      return 'não informado';
    }
    const labels: Record<
      RuralTimelineAnalysisCnisContributionPeriodStatusEnum,
      string
    > = {
      [RuralTimelineAnalysisCnisContributionPeriodStatusEnum.VALID]: 'Válido',
      [RuralTimelineAnalysisCnisContributionPeriodStatusEnum.PENDING]:
        'Pendente',
    };
    return labels[status];
  }

  private buildFallbackAnalysis(
    dto: SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto,
    gainYears: number,
    gainMonths: number,
    gainDays: number,
  ): AiAnalysisResultInterface {
    const originalStart =
      dto.originalPeriodStartDate.toLocaleDateString('pt-BR');
    const originalEnd = dto.originalPeriodEndDate.toLocaleDateString('pt-BR');
    const conventionalStart =
      dto.conventionalPeriodStartDate.toLocaleDateString('pt-BR');
    const conventionalEnd =
      dto.conventionalPeriodEndDate.toLocaleDateString('pt-BR');

    return {
      contributionTimeGainedYears: gainYears,
      contributionTimeGainedMonths: gainMonths,
      contributionTimeGainedDays: gainDays,
      technicalObservation: `Ajuste de período de contribuição CNIS: período original de ${originalStart} a ${originalEnd} substituído pelo período convencional de ${conventionalStart} a ${conventionalEnd}.`,
    };
  }
}
