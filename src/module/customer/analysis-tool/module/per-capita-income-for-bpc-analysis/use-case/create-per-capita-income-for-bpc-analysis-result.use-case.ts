import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/command/per-capita-income-for-bpc-analysis.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/command/per-capita-income-for-bpc-analysis-result.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';
import { CreatePerCapitaIncomeForBpcAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis-result.response.dto';
import { PerCapitaIncomeForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePerCapitaIncomeForBpcAnalysisResultUseCase {
  protected readonly _type =
    CreatePerCapitaIncomeForBpcAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    console.log('=== ANALYSIS TOOL RECORD QUERY RESULT ===');
    console.log(JSON.stringify(analysisToolRecordQueryResult, null, 2));

    const perCapitaIncomeForBpcAnalysisQueryResult =
      analysisToolRecordQueryResult.perCapitaIncomeForBpcAnalysis;

    console.log('=== PER CAPITA INCOME FOR BPC ANALYSIS ===');
    console.log(JSON.stringify(perCapitaIncomeForBpcAnalysisQueryResult, null, 2));

    if (perCapitaIncomeForBpcAnalysisQueryResult === null) {
      throw new PerCapitaIncomeForBpcAnalysisNotFoundError();
    }

    // Preparar dados do cliente
    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );

    // Preparar dados dos documentos
    const documents =
      perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisDocument;
    const documentBuffers: Buffer[] = [];

    console.log('=== DOCUMENTS FROM MAIN ANALYSIS ===');
    console.log('Documents count:', documents?.length ?? 0);
    console.log('Documents:', JSON.stringify(documents, null, 2));

    if (documents !== undefined && documents !== null) {
      for (const doc of documents) {
        const buffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        documentBuffers.push(buffer);
      }
    }

    // Preparar dados dos membros da família
    const familyMembers =
      perCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisFamilyMember;

    console.log('=== FAMILY MEMBERS ===');
    console.log('Family members count:', familyMembers?.length ?? 0);
    console.log('Family members:', JSON.stringify(familyMembers, null, 2));

    const familyMembersData =
      familyMembers !== undefined && familyMembers !== null
        ? familyMembers.map((member) => ({
            fullName: member.fullName,
            birthDate: member.birthDate,
            kinship: member.kinship,
            livesInSameResidence: member.livesInSameResidence,
            hasIncome: member.hasIncome,
            monthlyIncomeAmount: member.monthlyIncomeAmount,
            incomeType: member.incomeType,
            documentsCount:
              member.perCapitaIncomeForBpcAnalysisFamilyMemberDocument?.length ?? 0,
          }))
        : [];

    // Preparar buffers dos documentos dos family members
    const familyMemberDocumentBuffers: Buffer[] = [];
    if (familyMembers !== undefined && familyMembers !== null) {
      for (const member of familyMembers) {
        const memberDocuments =
          member.perCapitaIncomeForBpcAnalysisFamilyMemberDocument;
        console.log(`=== DOCUMENTS FOR FAMILY MEMBER: ${member.fullName} ===`);
        console.log('Documents count:', memberDocuments?.length ?? 0);
        console.log('Documents:', JSON.stringify(memberDocuments, null, 2));
        if (memberDocuments !== undefined && memberDocuments !== null) {
          for (const doc of memberDocuments) {
            const buffer = await this.fileProcessorGateway.getFileBuffer(
              doc.document,
            );
            familyMemberDocumentBuffers.push(buffer);
          }
        }
      }
    }

    // Preparar dados completos para análise
    const analysisData = {
      client: analysisToolRecordQueryResult.analysisToolClient,
      familyMembers: familyMembersData,
      documentsCount: documentBuffers.length,
      familyMemberDocumentsCount: familyMemberDocumentBuffers.length,
    };

    console.log('=== CONSOLIDATED ANALYSIS DATA ===');
    console.log('Main documents count:', documentBuffers.length);
    console.log('Family member documents count:', familyMemberDocumentBuffers.length);
    console.log('Total buffers being sent to IA:', 2 + documentBuffers.length + familyMemberDocumentBuffers.length);
    console.log('Analysis data:', JSON.stringify(analysisData, null, 2));

    const analysisDataBuffer = Buffer.from(
      JSON.stringify(analysisData, null, 2),
      'utf-8',
    );

    // Gerar análise completa via IA
    const completeAnalysis =
      await this.analysisProcessorGateway.getPerCapitaIncomeForBpcCompleteAnalysis(
        promptResponse.prompt,
        [
          analysisDataBuffer,
          clientDataBuffer,
          ...documentBuffers,
          ...familyMemberDocumentBuffers,
        ],
      );

    // Criar resultado da análise
    const perCapitaIncomeForBpcAnalysisResult =
      new PerCapitaIncomeForBpcAnalysisResultEntity({
        completeAnalysis,
        simplifiedAnalysis: null,
        perCapitaIncomeForBpcAnalysis: new PerCapitaIncomeForBpcAnalysisEntity({
          id: perCapitaIncomeForBpcAnalysisQueryResult.id,
          perCapitaIncomeForBpcAnalysisResult: null,
          createdBy: analysisToolRecordQueryResult.createdBy.id,
          updatedBy: analysisToolRecordQueryResult.updatedBy.id,
        }),
      });

    const perCapitaIncomeForBpcAnalysis =
      new PerCapitaIncomeForBpcAnalysisEntity({
        id: perCapitaIncomeForBpcAnalysisQueryResult.id,
        perCapitaIncomeForBpcAnalysisResult,
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: analysisToolRecordQueryResult.updatedBy.id,
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
      perCapitaIncomeForBpcAnalysis,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      disabilityAssessmentForBpcAnalysis: null,
    });

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const createPerCapitaIncomeForBpcAnalysisResultTransaction =
      this.perCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysisResult(
        perCapitaIncomeForBpcAnalysisResult,
      );

    const updatePerCapitaIncomeForBpcAnalysisTransaction =
      this.perCapitaIncomeForBpcAnalysisCommandRepositoryGateway.updatePerCapitaIncomeForBpcAnalysis(
        perCapitaIncomeForBpcAnalysis.id,
        perCapitaIncomeForBpcAnalysis,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createPerCapitaIncomeForBpcAnalysisResultTransaction,
      updatePerCapitaIncomeForBpcAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    const analysisAsHtml =
      perCapitaIncomeForBpcAnalysisResult.completeAnalysis !== null
        ? await this.exportDocumentGateway.convertMarkdownToHtml(
            perCapitaIncomeForBpcAnalysisResult.completeAnalysis,
          )
        : null;

    return CreatePerCapitaIncomeForBpcAnalysisResultResponseDto.build({
      ...perCapitaIncomeForBpcAnalysisResult,
      completeAnalysis: analysisAsHtml,
    });
  }
}
