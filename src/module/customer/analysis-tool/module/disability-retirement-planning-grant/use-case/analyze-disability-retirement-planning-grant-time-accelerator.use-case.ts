import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';
import { AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/analyze-disability-retirement-planning-grant-time-accelerator.request.dto';
import {
  AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorItemResponseDto,
  AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/analyze-disability-retirement-planning-grant-time-accelerator.response.dto';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import { InvalidDisabilityRetirementPlanningGrantTimeAcceleratorAnalysisJsonError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/invalid-disability-retirement-planning-grant-time-accelerator-analysis-json.error';
import { UnsupportedDisabilityRetirementPlanningGrantTimeAcceleratorTypeError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/unsupported-disability-retirement-planning-grant-time-accelerator-type.error';
import {
  DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultInterface,
  DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-time-accelerator-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase {
  protected readonly _type =
    AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase.name;

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
    dto: AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto> {
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
      await this.analysisProcessorGateway.getDisabilityRetirementPlanningGrantTimeAcceleratorAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new DisabilityRetirementPlanningGrantNotFoundError();
    }

    const parsedResult: DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultInterface =
      this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto.build(
      {
        timeAccelerators: parsedResult.timeAccelerators.map(
          (
            timeAccelerator: DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultItemInterface,
          ) =>
            AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorItemResponseDto.build(
              {
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
                affectsQualifyingPeriod:
                  timeAccelerator.affectsQualifyingPeriod,
              },
            ),
        ),
      },
    );
  }

  private parseAnalysisResult(
    analysisResult: string,
  ): DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidDisabilityRetirementPlanningGrantTimeAcceleratorAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultInterface {
    if (!this.isRecord(value) || !Array.isArray(value['timeAccelerators'])) {
      return false;
    }

    return value['timeAccelerators'].every((timeAccelerator: unknown) =>
      this.isAnalysisResultItem(timeAccelerator),
    );
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is DisabilityRetirementPlanningGrantTimeAcceleratorAnalysisResultItemInterface {
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
  ): value is DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum,
      ).includes(
        value as DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum,
      )
    );
  }

  private isRecognitionJudicial(
    value: unknown,
  ): value is DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum,
      ).includes(
        value as DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum,
      )
    );
  }

  private isViability(
    value: unknown,
  ): value is DisabilityRetirementPlanningGrantViabilityEnum {
    return (
      typeof value === 'string' &&
      Object.values(DisabilityRetirementPlanningGrantViabilityEnum).includes(
        value as DisabilityRetirementPlanningGrantViabilityEnum,
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
    if (value === null) {
      return {};
    }
    const d = new Date(value);
    return isNaN(d.getTime()) ? {} : { [key]: d };
  }

  private getPaymentPlanPaidResourceType(
    type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum,
  ): PaymentPlanPaidResourceTypeEnum {
    switch (type) {
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.TEMPO_RURAL:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_RURAL_TIME_ANALYSIS;
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.SERVICO_MILITAR:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_MILITARY_SERVICE_ANALYSIS;
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.SERVICO_PUBLICO:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_PUBLIC_SERVICE_ANALYSIS;
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.CTPS:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS;
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.ALUNO_APRENDIZ:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_STUDENT_APPRENTICE_ANALYSIS;
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.TRABALHO_NO_EXTERIOR:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_WORK_ABROAD_ANALYSIS;
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.TRABALHO_INFORMAL:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_INFORMAL_WORK_ANALYSIS;
      case DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum.SENTENCA_TRABALHISTA:
        return PaymentPlanPaidResourceTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT_LABOR_COURT_DECISION_ANALYSIS;
      default:
        throw new UnsupportedDisabilityRetirementPlanningGrantTimeAcceleratorTypeError();
    }
  }
}
