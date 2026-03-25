import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CnisDocumentRequiredError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-required.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-fast-analysis-not-found.error';
import { CnisFastAnalysisResultAlreadyExistsError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-fast-analysis-result-already-exists.error';
import { CnisFastAnalysisTemplateService } from '@module/customer/analysis-tool/module/cnis-fast-analysis/service/cnis-fast-analysis-template.service';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateCnisFastAnalysisResultUseCase {
  protected readonly _type = CreateCnisFastAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(CnisFastAnalysisResultCommandRepositoryGateway)
    private readonly cnisFastAnalysisResultCommandRepositoryGateway: CnisFastAnalysisResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalysisGateway: CnisAnalyzerGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(CnisFastAnalysisTemplateService)
    private readonly cnisFastAnalysisTemplateService: CnisFastAnalysisTemplateService,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<CreateCnisFastAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByCnisFastAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        CnisFastAnalysisNotFoundError,
      );

    const cnisFastAnalysisQueryResult =
      analysisToolRecordQueryResult.cnisFastAnalysis;

    if (cnisFastAnalysisQueryResult === null) {
      throw new CnisFastAnalysisNotFoundError();
    }

    if (
      analysisToolRecordQueryResult.cnisFastAnalysis?.cnisFastAnalysisResult !==
      null
    ) {
      throw new CnisFastAnalysisResultAlreadyExistsError();
    }

    if (cnisFastAnalysisQueryResult.cnisDocument === null) {
      throw new CnisDocumentRequiredError();
    }

    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisFastAnalysisQueryResult.cnisDocument,
    );
    const cnisDocumentData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisDocumentBuffer);

    const cnisAnalyzerResponse =
      await this.cnisAnalysisGateway.analyzeCnisDocument(
        cnisDocumentData,
        new AnalysisToolClientEntity({
          ...analysisToolRecordQueryResult.analysisToolClient,
          createdBy:
            analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
          updatedBy:
            analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
        }),
      );

    const cnisCompleteAnalysis =
      await this.cnisFastAnalysisTemplateService.render(cnisAnalyzerResponse);

    let clientLastAffiliationDate: Date | null = null;

    cnisDocumentData.socialSecurityRelations?.forEach(
      (socialSecurityRelation) => {
        if (
          socialSecurityRelation.socialSecurityAffiliationInfo.dataFim ===
          undefined
        ) {
          return;
        }

        if (clientLastAffiliationDate === null) {
          clientLastAffiliationDate =
            socialSecurityRelation.socialSecurityAffiliationInfo.dataFim ??
            null;
          return;
        }

        if (
          socialSecurityRelation.socialSecurityAffiliationInfo.dataFim >
          clientLastAffiliationDate
        ) {
          clientLastAffiliationDate =
            socialSecurityRelation.socialSecurityAffiliationInfo.dataFim;
        }
      },
    );

    const analysisAsMarkdown =
      this.exportDocumentGateway.convertHtmlToMarkdown(cnisCompleteAnalysis);

    const cnisFastAnalysisResult = new CnisFastAnalysisResultEntity({
      clientLastAffiliationDate,
      cnisCompleteAnalysis: analysisAsMarkdown,
      clientBirthDate:
        cnisDocumentData.affiliateIdentification?.dataDeNascimento ?? null,
      clientName: cnisDocumentData.affiliateIdentification?.nome ?? null,
      clientFederalDocument:
        cnisDocumentData.affiliateIdentification?.cpf !== undefined
          ? new FederalDocument(cnisDocumentData.affiliateIdentification.cpf)
          : null,
    });

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      ...cnisFastAnalysisQueryResult,
      cnisFastAnalysisResult,
      cnisDocument: cnisFastAnalysisQueryResult.cnisDocument,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      cnisFastAnalysis,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createCnisFastAnalysisResultTransaction =
      this.cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult(
        cnisFastAnalysisResult,
      );
    const updateCnisFastAnalysisTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis(
        cnisFastAnalysis.id,
        cnisFastAnalysis,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.RESULT_ADDED,
        analysisType: AnalysisToolRecordTypeEnum.CNIS_FAST_ANALYSIS,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: [
          consumeCreditTransaction,
          createCnisFastAnalysisResultTransaction,
          updateCnisFastAnalysisTransaction,
          updateAnalysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    return CreateCnisFastAnalysisResultResponseDto.build({
      ...cnisFastAnalysisResult,
      cnisCompleteAnalysis,
    });
  }
}
