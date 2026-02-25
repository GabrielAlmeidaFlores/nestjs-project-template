import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
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

interface ContributionTimeDifferenceInterface {
  years: number;
  months: number;
  days: number;
}

@Injectable()
export class SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentUseCase {
  protected readonly _type =
    SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentUseCase.name;

  private readonly PREVIDENCIARIO_DAYS_PER_MONTH = 30;
  private readonly PREVIDENCIARIO_DAYS_PER_YEAR = 360;
  private readonly MS_PER_SECOND = 1000;
  private readonly SECONDS_PER_MINUTE = 60;
  private readonly MINUTES_PER_HOUR = 60;
  private readonly HOURS_PER_DAY = 24;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway)
    private readonly cnisContributionPeriodQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {
    this.PREVIDENCIARIO_DAYS_PER_MONTH = this.PREVIDENCIARIO_DAYS_PER_MONTH;
    this.PREVIDENCIARIO_DAYS_PER_YEAR = this.PREVIDENCIARIO_DAYS_PER_YEAR;
    this.MS_PER_SECOND = this.MS_PER_SECOND;
    this.SECONDS_PER_MINUTE = this.SECONDS_PER_MINUTE;
    this.MINUTES_PER_HOUR = this.MINUTES_PER_HOUR;
    this.HOURS_PER_DAY = this.HOURS_PER_DAY;
  }

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

    const timeDifference = this.calculateContributionTimeDifference(
      dto.originalPeriodStartDate,
      dto.originalPeriodEndDate,
      dto.conventionalPeriodStartDate,
      dto.conventionalPeriodEndDate,
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

    const technicalObservation = await this.generateTechnicalObservation(
      dto,
      timeDifference,
      promptResponse.prompt,
      cnisContributionPeriod,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(creditTransaction);
    await transaction.commit();

    return SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto.build(
      {
        contributionTimeGainedYears: timeDifference.years,
        contributionTimeGainedMonths: timeDifference.months,
        contributionTimeGainedDays: timeDifference.days,
        technicalObservation,
      },
    );
  }

  private calculateContributionTimeDifference(
    originalStartDate: Date,
    originalEndDate: Date,
    conventionalStartDate: Date,
    conventionalEndDate: Date,
  ): ContributionTimeDifferenceInterface {
    const originalDays = this.calculatePeriodDaysPrevidenciario(
      originalStartDate,
      originalEndDate,
    );
    const conventionalDays = this.calculatePeriodDaysPrevidenciario(
      conventionalStartDate,
      conventionalEndDate,
    );

    const differenceDays = conventionalDays - originalDays;

    const years = Math.floor(
      differenceDays / this.PREVIDENCIARIO_DAYS_PER_YEAR,
    );
    const remainingAfterYears =
      differenceDays % this.PREVIDENCIARIO_DAYS_PER_YEAR;
    const months = Math.floor(
      remainingAfterYears / this.PREVIDENCIARIO_DAYS_PER_MONTH,
    );
    const days = remainingAfterYears % this.PREVIDENCIARIO_DAYS_PER_MONTH;

    return { years, months, days };
  }

  private calculatePeriodDaysPrevidenciario(
    startDate: Date,
    endDate: Date,
  ): number {
    const msPerDay =
      this.MS_PER_SECOND *
      this.SECONDS_PER_MINUTE *
      this.MINUTES_PER_HOUR *
      this.HOURS_PER_DAY;
    return Math.round((endDate.getTime() - startDate.getTime()) / msPerDay) + 1;
  }

  private async generateTechnicalObservation(
    dto: SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto,
    timeDifference: ContributionTimeDifferenceInterface,
    systemInstruction: string,
    period: RuralTimelineAnalysisCnisContributionPeriodEntity,
  ): Promise<string> {
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
${period.impactAnalysis ? `\n**Análise de impacto existente:**\n${period.impactAnalysis}` : ''}

## Ajuste Proposto

**Período original (CNIS):** ${originalStart} a ${originalEnd}
**Período convencional proposto:** ${conventionalStart} a ${conventionalEnd}
**Tempo de contribuição ganho com o ajuste:** ${timeDifference.years} anos, ${timeDifference.months} meses e ${timeDifference.days} dias`;

    const result =
      await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction,
          prompt,
          promptFiles: [],
        }),
      );

    return (
      result ?? this.buildFallbackTechnicalObservation(dto, timeDifference)
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

  private buildFallbackTechnicalObservation(
    dto: SimulateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto,
    timeDifference: ContributionTimeDifferenceInterface,
  ): string {
    const originalStart =
      dto.originalPeriodStartDate.toLocaleDateString('pt-BR');
    const originalEnd = dto.originalPeriodEndDate.toLocaleDateString('pt-BR');
    const conventionalStart =
      dto.conventionalPeriodStartDate.toLocaleDateString('pt-BR');
    const conventionalEnd =
      dto.conventionalPeriodEndDate.toLocaleDateString('pt-BR');

    return `Ajuste de período de contribuição CNIS: período original de ${originalStart} a ${originalEnd} substituído pelo período convencional de ${conventionalStart} a ${conventionalEnd}. Ganho de ${timeDifference.years} anos, ${timeDifference.months} meses e ${timeDifference.days} dias no cômputo do tempo de contribuição rural.`;
  }
}
