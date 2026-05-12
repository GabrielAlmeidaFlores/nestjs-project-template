import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { TimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-analysis-type.enum';
import { TimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-recognition-inss.enum';
import { TimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/domain/schema/enum/time-accelerator-viability.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalyzeTeacherRetirementPlanningTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/analyze-teacher-retirement-planning-time-accelerator.request.dto';
import {
  AnalyzeTeacherRetirementPlanningTimeAcceleratorItemResponseDto,
  AnalyzeTeacherRetirementPlanningTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/analyze-teacher-retirement-planning-time-accelerator.response.dto';
import { InvalidTeacherRetirementPlanningTimeAcceleratorAnalysisJsonError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/invalid-teacher-retirement-planning-time-accelerator-analysis-json.error';
import type {
  TeacherRetirementPlanningTimeAcceleratorAnalysisResultInterface,
  TeacherRetirementPlanningTimeAcceleratorAnalysisResultItemInterface,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning/interface/teacher-retirement-planning-time-accelerator-analysis-result.interface';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeTeacherRetirementPlanningTimeAcceleratorUseCase {
  protected readonly _type =
    AnalyzeTeacherRetirementPlanningTimeAcceleratorUseCase.name;

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
    dto: AnalyzeTeacherRetirementPlanningTimeAcceleratorRequestDto,
  ): Promise<AnalyzeTeacherRetirementPlanningTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const paymentPlanPaidResourceType = this.getPaymentPlanPaidResourceType(
      dto.timeType,
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
      await this.analysisProcessorGateway.getTimeAcceleratorAnalysis(
        promptResponse.prompt,
        [
          Buffer.from(JSON.stringify({ timeType: dto.timeType })),
          dto.document.base64.decodeToBuffer(),
        ],
      );

    const parsedResult = this.parseAnalysisResult(analysisResult);

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    return AnalyzeTeacherRetirementPlanningTimeAcceleratorResponseDto.build({
      timeAccelerators: parsedResult.timeAccelerators.map(
        (
          timeAccelerator: TeacherRetirementPlanningTimeAcceleratorAnalysisResultItemInterface,
        ) =>
          AnalyzeTeacherRetirementPlanningTimeAcceleratorItemResponseDto.build({
            timeType:
              timeAccelerator.timeType as TimeAcceleratorAnalysisTypeEnum,
            recognitionInss:
              timeAccelerator.recognitionInss as TimeAcceleratorRecognitionInssEnum,
            viability:
              timeAccelerator.viability as TimeAcceleratorViabilityEnum,
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
            affectsQualifyingPeriod: timeAccelerator.affectsQualifyingPeriod,
          }),
      ),
    });
  }

  private parseAnalysisResult(
    analysisResult: string | null,
  ): TeacherRetirementPlanningTimeAcceleratorAnalysisResultInterface {
    if (analysisResult === null) {
      throw new InvalidTeacherRetirementPlanningTimeAcceleratorAnalysisJsonError();
    }

    let cleanedJson = analysisResult;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsedResult: unknown = JSON.parse(cleanedJson);

    if (!this.isAnalysisResult(parsedResult)) {
      throw new InvalidTeacherRetirementPlanningTimeAcceleratorAnalysisJsonError();
    }

    return parsedResult;
  }

  private isAnalysisResult(
    value: unknown,
  ): value is TeacherRetirementPlanningTimeAcceleratorAnalysisResultInterface {
    if (!this.isRecord(value) || !Array.isArray(value['timeAccelerators'])) {
      return false;
    }

    return value['timeAccelerators'].every((item: unknown) =>
      this.isAnalysisResultItem(item),
    );
  }

  private isAnalysisResultItem(
    value: unknown,
  ): value is TeacherRetirementPlanningTimeAcceleratorAnalysisResultItemInterface {
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

  private isTimeType(value: unknown): value is TimeAcceleratorAnalysisTypeEnum {
    return (
      typeof value === 'string' &&
      Object.values(TimeAcceleratorAnalysisTypeEnum).includes(
        value as TimeAcceleratorAnalysisTypeEnum,
      )
    );
  }

  private isRecognitionInss(
    value: unknown,
  ): value is TimeAcceleratorRecognitionInssEnum {
    return (
      typeof value === 'string' &&
      Object.values(TimeAcceleratorRecognitionInssEnum).includes(
        value as TimeAcceleratorRecognitionInssEnum,
      )
    );
  }

  private isViability(value: unknown): value is TimeAcceleratorViabilityEnum {
    return (
      typeof value === 'string' &&
      Object.values(TimeAcceleratorViabilityEnum).includes(
        value as TimeAcceleratorViabilityEnum,
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
    timeType: TimeAcceleratorAnalysisTypeEnum,
  ): PaymentPlanPaidResourceTypeEnum {
    const map: Record<
      TimeAcceleratorAnalysisTypeEnum,
      PaymentPlanPaidResourceTypeEnum
    > = {
      [TimeAcceleratorAnalysisTypeEnum.TEMPO_RURAL]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_RURAL_TIME_ANALYSIS,
      [TimeAcceleratorAnalysisTypeEnum.SERVICO_MILITAR]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_MILITARY_SERVICE_ANALYSIS,
      [TimeAcceleratorAnalysisTypeEnum.SERVICO_PUBLICO]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_PUBLIC_SERVICE_ANALYSIS,
      [TimeAcceleratorAnalysisTypeEnum.CTPS]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_CTPS_OUTSIDE_CNIS_ANALYSIS,
      [TimeAcceleratorAnalysisTypeEnum.ALUNO_APRENDIZ]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_STUDENT_APPRENTICE_ANALYSIS,
      [TimeAcceleratorAnalysisTypeEnum.TRABALHO_NO_EXTERIOR]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_WORK_ABROAD_ANALYSIS,
      [TimeAcceleratorAnalysisTypeEnum.TRABALHO_INFORMAL]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_INFORMAL_WORK_ANALYSIS,
      [TimeAcceleratorAnalysisTypeEnum.SENTENCA_TRABALHISTA]:
        PaymentPlanPaidResourceTypeEnum.TIME_ACCELERATOR_LABOR_COURT_DECISION_ANALYSIS,
    };

    return map[timeType];
  }
}
