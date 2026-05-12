import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import { DeathBenefitRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-type.enum';
import { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';
import { AnalyzeDeathBenefitRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/analyze-death-benefit-rejection-time-accelerator.request.dto';
import {
  AnalyzeDeathBenefitRejectionTimeAcceleratorItemResponseDto,
  AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/analyze-death-benefit-rejection-time-accelerator.response.dto';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { InvalidDeathBenefitRejectionTimeAcceleratorAnalysisJsonError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/invalid-death-benefit-rejection-time-accelerator-analysis-json.error';
import { UnsupportedDeathBenefitRejectionTimeAcceleratorTypeError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/unsupported-death-benefit-rejection-time-accelerator-type.error';
import {
  DeathBenefitRejectionTimeAcceleratorAnalysisResultInterface,
  DeathBenefitRejectionTimeAcceleratorAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/death-benefit-rejection/model/interface/death-benefit-rejection-time-accelerator-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeDeathBenefitRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    AnalyzeDeathBenefitRejectionTimeAcceleratorUseCase.name;

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
    dto: AnalyzeDeathBenefitRejectionTimeAcceleratorRequestDto,
  ): Promise<AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const paymentPlanPaidResourceType = this.getPaymentPlanPaidResourceType(
      dto.json.type,
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

    const fileBuffers = [dto.document.base64.decodeToBuffer()];

    const analysisResult =
      await this.analysisProcessorGateway.getDeathBenefitRejectionTimeAcceleratorAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new DeathBenefitRejectionNotFoundError();
    }

    const parsedResult: DeathBenefitRejectionTimeAcceleratorAnalysisResultInterface =
      this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto.build({
      timeAccelerators: parsedResult.timeAccelerators.map(
        (
          timeAccelerator: DeathBenefitRejectionTimeAcceleratorAnalysisResultItemInterface,
        ) =>
          AnalyzeDeathBenefitRejectionTimeAcceleratorItemResponseDto.build({
            type: dto.json.type,
            recognitionInss: timeAccelerator.recognitionInss,
            recognitionJudicial: timeAccelerator.recognitionJudicial,
            viability: timeAccelerator.viability,
            ...(timeAccelerator.technicalNote !== null && {
              technicalNote: timeAccelerator.technicalNote,
            }),
            ...this.toValidDateProp('startDate', timeAccelerator.startDate),
            ...this.toValidDateProp('endDate', timeAccelerator.endDate),
            ...(timeAccelerator.institution !== null && {
              institution: timeAccelerator.institution,
            }),
            affectsQualifyingPeriod: timeAccelerator.affectsQualifyingPeriod,
          }),
      ),
    });
  }

  private parseAnalysisResult(
    analysisResult: string,
  ): DeathBenefitRejectionTimeAcceleratorAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidDeathBenefitRejectionTimeAcceleratorAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is DeathBenefitRejectionTimeAcceleratorAnalysisResultInterface {
    if (!this.isRecord(value) || !Array.isArray(value['timeAccelerators'])) {
      return false;
    }

    return value['timeAccelerators'].every((timeAccelerator: unknown) =>
      this.isAnalysisResultItem(timeAccelerator),
    );
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is DeathBenefitRejectionTimeAcceleratorAnalysisResultItemInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      this.isRecognitionInss(value['recognitionInss']) &&
      this.isRecognitionJudicial(value['recognitionJudicial']) &&
      this.isViability(value['viability']) &&
      this.isNullableString(value['technicalNote']) &&
      this.isNullableString(value['startDate']) &&
      this.isNullableString(value['endDate']) &&
      this.isNullableString(value['institution']) &&
      typeof value['affectsQualifyingPeriod'] === 'boolean'
    );
  }

  private isRecognitionInss(
    value: unknown,
  ): value is DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum,
      ).includes(
        value as DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum,
      )
    );
  }

  private isRecognitionJudicial(
    value: unknown,
  ): value is DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum,
      ).includes(
        value as DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum,
      )
    );
  }

  private isViability(
    value: unknown,
  ): value is DeathBenefitRejectionTimeAcceleratorViabilityEnum {
    return (
      typeof value === 'string' &&
      Object.values(DeathBenefitRejectionTimeAcceleratorViabilityEnum).includes(
        value as DeathBenefitRejectionTimeAcceleratorViabilityEnum,
      )
    );
  }

  private isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private toValidDateProp(
    key: 'startDate' | 'endDate',
    value: string | null,
  ): Record<string, Date> {
    if (value === null) return {};
    const d = new Date(value);
    return isNaN(d.getTime()) ? {} : { [key]: d };
  }

    private getPaymentPlanPaidResourceType(
    type: DeathBenefitRejectionTimeAcceleratorTypeEnum,
  ): PaymentPlanPaidResourceTypeEnum {
    switch (type) {
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.TEMPO_RURAL:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_RURAL_TIME_ANALYSIS;
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.SERVICO_MILITAR:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_MILITARY_SERVICE_ANALYSIS;
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.SERVICO_PUBLICO:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_PUBLIC_SERVICE_ANALYSIS;
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.CTPS:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS;
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.ALUNO_APRENDIZ:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_STUDENT_APPRENTICE_ANALYSIS;
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.TRABALHO_NO_EXTERIOR:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_WORK_ABROAD_ANALYSIS;
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.TRABALHO_INFORMAL:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_INFORMAL_WORK_ANALYSIS;
      case DeathBenefitRejectionTimeAcceleratorTypeEnum.SENTENCA_TRABALHISTA:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_REJECTION_LABOR_COURT_DECISION_ANALYSIS;
      default:
        throw new UnsupportedDeathBenefitRejectionTimeAcceleratorTypeError();
    }
  }
}
