import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';
import { AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/analyze-general-urban-retirement-denial-time-accelerator.request.dto';
import {
  AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorItemResponseDto,
  AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/analyze-general-urban-retirement-denial-time-accelerator.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { InvalidGeneralUrbanRetirementDenialTimeAcceleratorAnalysisJsonError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/invalid-general-urban-retirement-denial-time-accelerator-analysis-json.error';
import { UnsupportedGeneralUrbanRetirementDenialTimeAcceleratorTypeError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/unsupported-general-urban-retirement-denial-time-accelerator-type.error';
import {
  GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultInterface,
  GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/model/interface/general-urban-retirement-denial-time-accelerator-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase {
  protected readonly _type =
    AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase.name;

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
    dto: AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorResponseDto> {
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
      await this.analysisProcessorGateway.getGeneralUrbanRetirementDenialTimeAcceleratorAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new GeneralUrbanRetirementDenialNotFoundError();
    }

    const parsedResult: GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultInterface =
      this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorResponseDto.build({
      timeAccelerators: parsedResult.timeAccelerators.map(
        (
          timeAccelerator: GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultItemInterface,
        ) =>
          AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorItemResponseDto.build(
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
              affectsQualifyingPeriod: timeAccelerator.affectsQualifyingPeriod,
            },
          ),
      ),
    });
  }

  private parseAnalysisResult(
    analysisResult: string,
  ): GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidGeneralUrbanRetirementDenialTimeAcceleratorAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultInterface {
    if (!this.isRecord(value) || !Array.isArray(value['timeAccelerators'])) {
      return false;
    }

    return value['timeAccelerators'].every((timeAccelerator: unknown) =>
      this.isAnalysisResultItem(timeAccelerator),
    );
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is GeneralUrbanRetirementDenialTimeAcceleratorAnalysisResultItemInterface {
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
  ): value is GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum,
      ).includes(
        value as GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum,
      )
    );
  }

  private isRecognitionJudicial(
    value: unknown,
  ): value is GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum,
      ).includes(
        value as GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum,
      )
    );
  }

  private isViability(
    value: unknown,
  ): value is GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum,
      ).includes(
        value as GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum,
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
    type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum,
  ): PaymentPlanPaidResourceTypeEnum {
    switch (type) {
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.TEMPO_RURAL:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_RURAL_TIME_ANALYSIS;
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.SERVICO_MILITAR:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_MILITARY_SERVICE_ANALYSIS;
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.SERVICO_PUBLICO:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_PUBLIC_SERVICE_ANALYSIS;
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.CTPS:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_CTPS_OUTSIDE_CNIS_ANALYSIS;
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.ALUNO_APRENDIZ:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_STUDENT_APPRENTICE_ANALYSIS;
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.TRABALHO_NO_EXTERIOR:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_WORK_ABROAD_ANALYSIS;
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.TRABALHO_INFORMAL:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_INFORMAL_WORK_ANALYSIS;
      case GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum.SENTENCA_TRABALHISTA:
        return PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_LABOR_COURT_DECISION_ANALYSIS;
      default:
        throw new UnsupportedGeneralUrbanRetirementDenialTimeAcceleratorTypeError();
    }
  }
}
