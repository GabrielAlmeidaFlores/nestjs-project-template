import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { TeacherRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/command/teacher-retirement-planning-rejection.command.repository.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-result/command/teacher-retirement-planning-rejection-result.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/enum/teacher-retirement-planning-rejection-document-type.enum';
import { TeacherRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';
import { CreateTeacherRetirementPlanningRejectionResultResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-result.response.dto';
import { InvalidTeacherRetirementPlanningRejectionResultJsonError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/invalid-teacher-retirement-planning-rejection-result-json.error';
import { TeacherRetirementPlanningRejectionCnisDocumentNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-cnis-document-not-found.error';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { TeacherRetirementPlanningRejectionResultInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/interface/teacher-retirement-planning-rejection-result.interface';

@Injectable()
export class CreateTeacherRetirementPlanningRejectionResultUseCase {
  protected readonly _type =
    CreateTeacherRetirementPlanningRejectionResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionCommandRepositoryGateway: TeacherRetirementPlanningRejectionCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionResultCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionResultCommandRepositoryGateway: TeacherRetirementPlanningRejectionResultCommandRepositoryGateway,
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
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): Promise<CreateTeacherRetirementPlanningRejectionResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const rejection =
      await this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
        teacherRetirementPlanningRejectionId,
        TeacherRetirementPlanningRejectionNotFoundError,
      );

    const cnisDocument = rejection.documents.find(
      (document) =>
        document.type ===
        TeacherRetirementPlanningRejectionDocumentTypeEnum.CNIS,
    );

    if (!cnisDocument) {
      throw new TeacherRetirementPlanningRejectionCnisDocumentNotFoundError();
    }

    const existingResult = rejection.result;

    const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisDocument.fileName,
    );

    const isCnisValid =
      await this.analysisProcessorGateway.validateCnisDocument(cnisBuffer);

    if (!isCnisValid) {
      throw new CnisDocumentIsNotValidError();
    }

    const analysisToolClient =
      await this.findAnalysisToolClientByAnalysisToolRecordOrFail(
        teacherRetirementPlanningRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const cnisData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisBuffer);

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const documentBuffers = await this.buildAllDocumentBuffers(
      rejection,
      cnisDocument.fileName,
      cnisBuffer,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS,
      );

    const simplifiedPromptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const consumeSimplifiedCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const completeAnalysis =
      await this.analysisProcessorGateway.getTeacherRetirementPlanningRejectionCompleteAnalysis(
        promptResponse.prompt,
        JSON.stringify(cnisAnalysis),
        [this.buildCompleteAnalysisDataBuffer(rejection), ...documentBuffers],
      );

    if (completeAnalysis === null) {
      throw new InvalidTeacherRetirementPlanningRejectionResultJsonError();
    }

    const parsedResult = this.parseResultAnalysis(completeAnalysis);

    const simplifiedAnalysis =
      await this.analysisProcessorGateway.getTeacherRetirementPlanningRejectionSimplifiedAnalysis(
        simplifiedPromptResponse.prompt,
        [],
        completeAnalysis,
      );

    const resultEntity = new TeacherRetirementPlanningRejectionResultEntity({
      ...(existingResult !== null && {
        id: new TeacherRetirementPlanningRejectionResultId(existingResult.id),
      }),
      inssDecisionAnalysis: existingResult?.inssDecisionAnalysis ?? null,
      firstAnalysis: existingResult?.firstAnalysis ?? null,
      completeAnalysis,
      simplifiedAnalysis: existingResult?.simplifiedAnalysis ?? null,
      completeAnalysisDownload: parsedResult.completeAnalysisDownload,
    });

    const resultTransaction =
      existingResult !== null
        ? this.teacherRetirementPlanningRejectionResultCommandRepositoryGateway.updateTeacherRetirementPlanningRejectionResult(
            resultEntity,
          )
        : this.teacherRetirementPlanningRejectionResultCommandRepositoryGateway.createTeacherRetirementPlanningRejectionResult(
            resultEntity,
          );

    const transactionOperations = [
      consumeCreditTransaction,
      consumeSimplifiedCreditTransaction,
      resultTransaction,
    ];

    if (existingResult === null) {
      transactionOperations.push(
        this.teacherRetirementPlanningRejectionCommandRepositoryGateway.updateTeacherRetirementPlanningRejectionResultId(
          teacherRetirementPlanningRejectionId,
          resultEntity.id,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTeacherRetirementPlanningRejectionResultResponseDto.build({
      teacherRetirementPlanningRejectionResult: parsedResult,
      ...(simplifiedAnalysis !== null && {
        teacherRetirementPlanningRejectionSimplifiedAnalysis:
          simplifiedAnalysis,
      }),
    });
  }

  private async findAnalysisToolClientByAnalysisToolRecordOrFail(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<AnalysisToolClientEntity> {
    const analysisToolRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTeacherRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        teacherRetirementPlanningRejectionId,
        organizationId,
        authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    return new AnalysisToolClientEntity({
      ...analysisToolRecord.analysisToolClient,
      createdBy: analysisToolRecord.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecord.analysisToolClient.updatedBy.id,
    });
  }

  private async buildAllDocumentBuffers(
    rejection: Awaited<
      ReturnType<
        typeof this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations
      >
    >,
    cnisFileName: string,
    cnisBuffer: Buffer,
  ): Promise<Buffer[]> {
    const otherDocumentBuffers = await Promise.all(
      rejection.documents
        .filter((doc) => doc.fileName !== cnisFileName)
        .map((doc) => this.fileProcessorGateway.getFileBuffer(doc.fileName)),
    );

    return [cnisBuffer, ...otherDocumentBuffers];
  }

  private buildCompleteAnalysisDataBuffer(
    rejection: Awaited<
      ReturnType<
        typeof this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations
      >
    >,
  ): Buffer {
    return Buffer.from(
      JSON.stringify({
        analysisName: rejection.analysisName,
        category: rejection.category,
        activityType: rejection.activityType,
        activityTypeDescription: rejection.activityTypeDescription,
        denialReason: rejection.denialReason,
        denialReasonDescription: rejection.denialReasonDescription,
        requestEntryDate: rejection.requestEntryDate,
        denialDate: rejection.denialDate,
        teachingPeriods: rejection.teachingPeriods,
        workPeriods: rejection.workPeriods,
        timeAccelerators: rejection.timeAccelerators,
        inssBenefits: rejection.inssBenefits,
      }),
    );
  }

  private parseResultAnalysis(
    raw: string,
  ): TeacherRetirementPlanningRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed: unknown = JSON.parse(cleanedJson);

    if (!this.isResultAnalysis(parsed)) {
      throw new InvalidTeacherRetirementPlanningRejectionResultJsonError();
    }

    return parsed;
  }

  private isResultAnalysis(
    value: unknown,
  ): value is TeacherRetirementPlanningRejectionResultInterface {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      Array.isArray(value['retirementRules']) &&
      value['retirementRules'].every((item: unknown) =>
        this.isRetirementRule(item),
      ) &&
      typeof value['analysisResult'] === 'string' &&
      typeof value['completeAnalysisDownload'] === 'string'
    );
  }

  private isRetirementRule(value: unknown): boolean {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['modality'] === 'string' &&
      typeof value['fulfilled'] === 'boolean' &&
      this.isNullableString(value['retirementDate']) &&
      this.isNullableNumber(value['expectedRmi']) &&
      this.isNullableNumber(value['estimatedCauseValue']) &&
      typeof value['bestRmi'] === 'boolean' &&
      typeof value['highestCauseValue'] === 'boolean' &&
      typeof value['detailedAnalysis'] === 'string'
    );
  }

  private isNullableNumber(value: unknown): value is number | null {
    return typeof value === 'number' || value === null;
  }

  private isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
