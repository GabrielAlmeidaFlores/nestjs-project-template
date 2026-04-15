import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';
import { AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/analyze-rural-or-hybrid-retirement-rejection-time-accelerator.request.dto';
import {
  AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorItemResponseDto,
  AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/analyze-rural-or-hybrid-retirement-rejection-time-accelerator.response.dto';
import { InvalidRuralOrHybridRetirementRejectionTimeAcceleratorAnalysisJsonError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/invalid-rural-or-hybrid-retirement-rejection-time-accelerator-analysis-json.error';
import {
  RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultInterface,
  RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
  ): Promise<AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const paymentPlanPaidResourceType = this.getPaymentPlanPaidResourceType(
      dto.json.timeType,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        paymentPlanPaidResourceType,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        paymentPlanPaidResourceType,
        organizationMember.id,
      );

    const analysisResult =
      await this.analysisProcessorGateway.getRuralOrHybridRetirementRejectionTimeAcceleratorAnalysis(
        promptResponse.prompt,
        [dto.document.base64.decodeToBuffer()],
      );

    const parsedResult = this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto.build(
      {
        timeAccelerators: parsedResult.timeAccelerators.map(
          (
            timeAccelerator: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultItemInterface,
          ) =>
            AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorItemResponseDto.build(
              {
                timeType: timeAccelerator.timeType,
                recognitionInss: timeAccelerator.recognitionInss,
                viability: timeAccelerator.viability,
                ...(timeAccelerator.technicalNote !== null && {
                  technicalNote: timeAccelerator.technicalNote,
                }),
                ...(timeAccelerator.startDate !== null && {
                  startDate: new Date(timeAccelerator.startDate),
                }),
                ...(timeAccelerator.endDate !== null && {
                  endDate: new Date(timeAccelerator.endDate),
                }),
                ...(timeAccelerator.gracePeriod !== null && {
                  gracePeriod: timeAccelerator.gracePeriod,
                }),
                ...(timeAccelerator.institution !== null && {
                  institution: timeAccelerator.institution,
                }),
                affectsQualifyingPeriod:
                  timeAccelerator.affectsQualifyingPeriod,
              },
            ),
        ),
      },
    );
  }

  private parseAnalysisResult(
    analysisResult: string | null,
  ): RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultInterface {
    if (analysisResult === null) {
      throw new InvalidRuralOrHybridRetirementRejectionTimeAcceleratorAnalysisJsonError();
    }

    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidRuralOrHybridRetirementRejectionTimeAcceleratorAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultInterface {
    if (!this.isRecord(value) || !Array.isArray(value['timeAccelerators'])) {
      return false;
    }

    return value['timeAccelerators'].every((timeAccelerator: unknown) =>
      this.isAnalysisResultItem(timeAccelerator),
    );
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisResultItemInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      this.isTimeType(value['timeType']) &&
      this.isRecognitionInss(value['recognitionInss']) &&
      this.isViability(value['viability']) &&
      this.isNullableString(value['technicalNote']) &&
      this.isNullableString(value['startDate']) &&
      this.isNullableString(value['endDate']) &&
      this.isNullableString(value['gracePeriod']) &&
      this.isNullableString(value['institution']) &&
      typeof value['affectsQualifyingPeriod'] === 'boolean'
    );
  }

  private isTimeType(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
      ).includes(
        value as RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
      )
    );
  }

  private isRecognitionInss(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum,
      ).includes(
        value as RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum,
      )
    );
  }

  private isViability(
    value: unknown,
  ): value is RuralOrHybridRetirementRejectionViabilityEnum {
    return (
      typeof value === 'string' &&
      Object.values(RuralOrHybridRetirementRejectionViabilityEnum).includes(
        value as RuralOrHybridRetirementRejectionViabilityEnum,
      )
    );
  }

  private isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private getPaymentPlanPaidResourceType(
    timeType: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
  ): PaymentPlanPaidResourceTypeEnum {
    const paymentPlanPaidResourceTypeByTimeType: Record<
      RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum,
      PaymentPlanPaidResourceTypeEnum
    > = {
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.TEMPO_RURAL]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_RURAL_TIME_ANALYSIS,
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.SERVICO_MILITAR]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_MILITARY_SERVICE_ANALYSIS,
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.SERVICO_PUBLICO]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_PUBLIC_SERVICE_ANALYSIS,
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.CTPS]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_CTPS_OUTSIDE_CNIS_ANALYSIS,
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.ALUNO_APRENDIZ]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_STUDENT_APPRENTICE_ANALYSIS,
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.TRABALHO_NO_EXTERIOR]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_WORK_ABROAD_ANALYSIS,
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.TRABALHO_INFORMAL]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_INFORMAL_WORK_ANALYSIS,
      [RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum.SENTENCA_TRABALHISTA]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_LABOR_COURT_DECISION_ANALYSIS,
    };

    return paymentPlanPaidResourceTypeByTimeType[timeType];
  }
}
