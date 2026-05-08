import { Inject, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/command/teacher-retirement-planning-result.command.repository.gateway';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
import { TeacherRetirementPlanningResultNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-result-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class DownloadTeacherRetirementPlanningSimplifiedAnalysisRppsUseCase {
  protected readonly _type =
    DownloadTeacherRetirementPlanningSimplifiedAnalysisRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningResultCommandRepositoryGateway)
    private readonly teacherRetirementPlanningResultCommandRepositoryGateway: TeacherRetirementPlanningResultCommandRepositoryGateway,
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
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    const planning =
      await this.teacherRetirementPlanningQueryRepositoryGateway.findOneTeacherRetirementPlanningByIdWithRelations(
        teacherRetirementPlanningId,
      );

    if (planning === null) {
      throw new TeacherRetirementPlanningNotFoundError();
    }

    if (planning.result === null) {
      throw new TeacherRetirementPlanningResultNotFoundError();
    }

    if (
      planning.result.teacherRetirementPlanningCompleteAnalysis === null ||
      planning.result.teacherRetirementPlanningCompleteAnalysis === ''
    ) {
      throw new TeacherRetirementPlanningResultNotFoundError();
    }

    let responseAi =
      planning.result.teacherRetirementPlanningSimplifiedAnalysis;

    if (responseAi === null || responseAi === '') {
      const simplifiedAnalysis =
        await this.analysisProcessorGateway.getTeacherRetirementPlanningSimplifiedAnalysis(
          promptResponse.prompt,
          [
            Buffer.from(
              planning.result.teacherRetirementPlanningCompleteAnalysis,
              'utf-8',
            ),
          ],
        );

      const updatedResult = new TeacherRetirementPlanningResultEntity({
        ...planning.result,
        teacherRetirementPlanningSimplifiedAnalysis: simplifiedAnalysis,
      });

      const resultTransaction =
        this.teacherRetirementPlanningResultCommandRepositoryGateway.updateTeacherRetirementPlanningResult(
          updatedResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        resultTransaction,
      ]);

      await transaction.commit();

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new TeacherRetirementPlanningResultNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(responseAi);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_aposentadoria_professor',
    );
  }
}
