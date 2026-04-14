import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import { DeathBenefitGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-type.enum';
import { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';
import { AnalyzeDeathBenefitGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/analyze-death-benefit-grant-time-accelerator.request.dto';
import {
  AnalyzeDeathBenefitGrantTimeAcceleratorItemResponseDto,
  AnalyzeDeathBenefitGrantTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/analyze-death-benefit-grant-time-accelerator.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { InvalidDeathBenefitGrantTimeAcceleratorAnalysisJsonError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/invalid-death-benefit-grant-time-accelerator-analysis-json.error';
import { UnsupportedDeathBenefitGrantTimeAcceleratorTypeError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/unsupported-death-benefit-grant-time-accelerator-type.error';
import {
  DeathBenefitGrantTimeAcceleratorAnalysisResultInterface,
  DeathBenefitGrantTimeAcceleratorAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/death-benefit-grant/model/interface/death-benefit-grant-time-accelerator-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeDeathBenefitGrantTimeAcceleratorUseCase {
  protected readonly _type =
    AnalyzeDeathBenefitGrantTimeAcceleratorUseCase.name;

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
    dto: AnalyzeDeathBenefitGrantTimeAcceleratorRequestDto,
  ): Promise<AnalyzeDeathBenefitGrantTimeAcceleratorResponseDto> {
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
      await this.analysisProcessorGateway.getDeathBenefitGrantTimeAcceleratorAnalysis(
        promptResponse.prompt,
        fileBuffers,
      );

    if (analysisResult === null) {
      throw new DeathBenefitGrantNotFoundError();
    }

    const parsedResult: DeathBenefitGrantTimeAcceleratorAnalysisResultInterface =
      this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeDeathBenefitGrantTimeAcceleratorResponseDto.build({
      timeAccelerators: parsedResult.timeAccelerators.map(
        (
          timeAccelerator: DeathBenefitGrantTimeAcceleratorAnalysisResultItemInterface,
        ) =>
          AnalyzeDeathBenefitGrantTimeAcceleratorItemResponseDto.build({
            type: dto.json.type,
            recognitionInss: timeAccelerator.recognitionInss,
            recognitionJudicial: timeAccelerator.recognitionJudicial,
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
  ): DeathBenefitGrantTimeAcceleratorAnalysisResultInterface {
    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidDeathBenefitGrantTimeAcceleratorAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is DeathBenefitGrantTimeAcceleratorAnalysisResultInterface {
    if (!this.isRecord(value) || !Array.isArray(value['timeAccelerators'])) {
      return false;
    }

    return value['timeAccelerators'].every((timeAccelerator: unknown) =>
      this.isAnalysisResultItem(timeAccelerator),
    );
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is DeathBenefitGrantTimeAcceleratorAnalysisResultItemInterface {
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
  ): value is DeathBenefitGrantTimeAcceleratorRecognitionInssEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DeathBenefitGrantTimeAcceleratorRecognitionInssEnum,
      ).includes(value as DeathBenefitGrantTimeAcceleratorRecognitionInssEnum)
    );
  }

  private isRecognitionJudicial(
    value: unknown,
  ): value is DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum {
    return (
      typeof value === 'string' &&
      Object.values(
        DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum,
      ).includes(
        value as DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum,
      )
    );
  }

  private isViability(
    value: unknown,
  ): value is DeathBenefitGrantTimeAcceleratorViabilityEnum {
    return (
      typeof value === 'string' &&
      Object.values(DeathBenefitGrantTimeAcceleratorViabilityEnum).includes(
        value as DeathBenefitGrantTimeAcceleratorViabilityEnum,
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
    type: DeathBenefitGrantTimeAcceleratorTypeEnum,
  ): PaymentPlanPaidResourceTypeEnum {
    switch (type) {
      case DeathBenefitGrantTimeAcceleratorTypeEnum.TEMPO_RURAL:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_RURAL_TIME_ANALYSIS;
      case DeathBenefitGrantTimeAcceleratorTypeEnum.SERVICO_MILITAR:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_MILITARY_SERVICE_ANALYSIS;
      case DeathBenefitGrantTimeAcceleratorTypeEnum.SERVICO_PUBLICO:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_PUBLIC_SERVICE_ANALYSIS;
      case DeathBenefitGrantTimeAcceleratorTypeEnum.CTPS:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_CTPS_OUTSIDE_CNIS_ANALYSIS;
      case DeathBenefitGrantTimeAcceleratorTypeEnum.ALUNO_APRENDIZ:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_STUDENT_APPRENTICE_ANALYSIS;
      case DeathBenefitGrantTimeAcceleratorTypeEnum.TRABALHO_NO_EXTERIOR:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_WORK_ABROAD_ANALYSIS;
      case DeathBenefitGrantTimeAcceleratorTypeEnum.TRABALHO_INFORMAL:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_INFORMAL_WORK_ANALYSIS;
      case DeathBenefitGrantTimeAcceleratorTypeEnum.SENTENCA_TRABALHISTA:
        return PaymentPlanPaidResourceTypeEnum.DEATH_BENEFIT_GRANT_LABOR_COURT_DECISION_ANALYSIS;
      default:
        throw new UnsupportedDeathBenefitGrantTimeAcceleratorTypeError();
    }
  }
}
