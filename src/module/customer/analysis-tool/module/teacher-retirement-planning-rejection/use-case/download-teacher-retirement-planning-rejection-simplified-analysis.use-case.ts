import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-result/command/teacher-retirement-planning-rejection-result.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';
import { TeacherRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-complete-analysis-download-not-found.error';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { TeacherRetirementPlanningRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-result-not-found.error';
import { TeacherRetirementPlanningRejectionSimplifiedAnalysisNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-simplified-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionResultCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionResultCommandRepositoryGateway: TeacherRetirementPlanningRejectionResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTeacherRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      teacherRetirementPlanningRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      TeacherRetirementPlanningRejectionNotFoundError,
    );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const rejection =
      await this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
        teacherRetirementPlanningRejectionId,
        TeacherRetirementPlanningRejectionNotFoundError,
      );

    const currentResult = rejection.result;

    if (currentResult === null) {
      throw new TeacherRetirementPlanningRejectionResultNotFoundError();
    }

    if (currentResult.completeAnalysis === null) {
      throw new TeacherRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError();
    }

    let responseAi = currentResult.simplifiedAnalysis;

    if (responseAi === null) {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getTeacherRetirementPlanningRejectionSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(currentResult.completeAnalysis, 'utf-8')],
        );

      const updatedResult = new TeacherRetirementPlanningRejectionResultEntity({
        id: new TeacherRetirementPlanningRejectionResultId(currentResult.id),
        inssDecisionAnalysis: currentResult.inssDecisionAnalysis,
        firstAnalysis: currentResult.firstAnalysis,
        completeAnalysis: currentResult.completeAnalysis,
        completeAnalysisDownload: currentResult.completeAnalysisDownload,
        simplifiedAnalysis: simplifiedAnalysis,
      });

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        this.teacherRetirementPlanningRejectionResultCommandRepositoryGateway.updateTeacherRetirementPlanningRejectionResult(
          updatedResult,
        ),
      ]);

      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new TeacherRetirementPlanningRejectionSimplifiedAnalysisNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(responseAi);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_indeferimento_aposentadoria_professor',
    );
  }
}
