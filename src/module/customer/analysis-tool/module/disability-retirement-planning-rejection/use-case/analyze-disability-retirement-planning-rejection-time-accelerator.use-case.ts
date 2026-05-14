import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-type.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-viability.enum';
import { AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/analyze-disability-retirement-planning-rejection-time-accelerator.request.dto';
import {
  AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorItemResponseDto,
  AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/analyze-disability-retirement-planning-rejection-time-accelerator.response.dto';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { InvalidDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/invalid-disability-retirement-planning-rejection-time-accelerator-analysis-json.error';
import { UnsupportedDisabilityRetirementPlanningRejectionTimeAcceleratorTypeError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/unsupported-disability-retirement-planning-rejection-time-accelerator-type.error';
import {
  DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultInterface,
  DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/interface/disability-retirement-planning-rejection-time-accelerator-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase.name;

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
    dto: AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto> {
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
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new DisabilityRetirementPlanningRejectionNotFoundError();
    }

    const parsedResult: DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultInterface =
      this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto.build(
      {
        timeAccelerators: parsedResult.timeAccelerators.map(
          (
            timeAccelerator: DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultItemInterface,
          ) =>
            AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorItemResponseDto.build(
              {
                type: dto.json.type,
                recognitionInss:
                  DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum[
                    timeAccelerator.recognitionInss as keyof typeof DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum
                  ],
                recognitionJudicial:
                  DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum[
                    timeAccelerator.recognitionJudicial as keyof typeof DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum
                  ],
                viability:
                  DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum[
                    timeAccelerator.viability as keyof typeof DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum
                  ],
                ...(this.hasValue(timeAccelerator.technicalNote) && {
                  technicalNote: timeAccelerator.technicalNote,
                }),
                ...this.toValidDateProp('startDate', timeAccelerator.startDate),
                ...this.toValidDateProp('endDate', timeAccelerator.endDate),
                ...(this.hasValue(timeAccelerator.institution) && {
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

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private parseAnalysisResult(
    analysisResult: string,
  ): DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidDisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultInterface {
    if (!this.isRecord(value) || !Array.isArray(value['timeAccelerators'])) {
      return false;
    }

    return value['timeAccelerators'].every((timeAccelerator: unknown) =>
      this.isAnalysisResultItem(timeAccelerator),
    );
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultItemInterface {
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
  ): value is DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum,
      ).includes(
        value as DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum,
      )
    );
  }

  private isRecognitionJudicial(
    value: unknown,
  ): value is DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum,
      ).includes(
        value as DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum,
      )
    );
  }

  private isViability(
    value: unknown,
  ): value is DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum,
      ).includes(
        value as DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum,
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
    value: string | null | undefined,
  ): Record<string, Date> {
    if (value === null || value === undefined || value.trim() === '') {
      return {};
    }
    const d = new Date(value);
    return isNaN(d.getTime()) ? {} : { [key]: d };
  }

  private getPaymentPlanPaidResourceType(
    type: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum,
  ): PaymentPlanPaidResourceTypeEnum {
    switch (type) {
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.TEMPO_RURAL:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_RURAL_TIME_ANALYSIS;
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.SERVICO_MILITAR:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_MILITARY_SERVICE_ANALYSIS;
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.SERVICO_PUBLICO:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_PUBLIC_SERVICE_ANALYSIS;
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.CTPS:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_CTPS_OUTSIDE_CNIS_ANALYSIS;
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.ALUNO_APRENDIZ:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_STUDENT_APPRENTICE_ANALYSIS;
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.TRABALHO_NO_EXTERIOR:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_WORK_ABROAD_ANALYSIS;
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.TRABALHO_INFORMAL:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_INFORMAL_WORK_ANALYSIS;
      case DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum.SENTENCA_TRABALHISTA:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_REJECTION_LABOR_COURT_DECISION_ANALYSIS;
      default:
        throw new UnsupportedDisabilityRetirementPlanningRejectionTimeAcceleratorTypeError();
    }
  }
}
