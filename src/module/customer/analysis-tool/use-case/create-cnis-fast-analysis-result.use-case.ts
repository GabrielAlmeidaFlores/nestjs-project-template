import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity';
import { ChatPersonaTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { GetConversationResponseDto } from '@module/ai/infra/chat/dto/response/get-conversation.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CnisDocumentRequiredError } from '@module/customer/analysis-tool/error/cnis-document-required.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
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
    @Inject(ConversationCommandRepositoryGateway)
    private readonly conversationCommandRepositoryGateway: ConversationCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
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

    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
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

    if (cnisFastAnalysisQueryResult.cnisDocument === null) {
      throw new CnisDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisFastAnalysisQueryResult.cnisDocument,
    );
    const cnisDocumentData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisDocumentBuffer);

    const cnisAnalyzerResponse =
      await this.cnisAnalysisGateway.analyzeCnisDocument(
        cnisDocumentData,
        analysisToolRecordQueryResult.analysisToolClient,
      );

    const jsonCnisAnalyzerResponse = JSON.stringify(
      cnisAnalyzerResponse,
      null,
      2,
    );

    const cnisCompleteAnalysis =
      await this.analysisProcessorGateway.getCnisCompleteAnalysis(
        [clientDataBuffer],
        jsonCnisAnalyzerResponse,
      );

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

    const cnisFastAnalysisResult = new CnisFastAnalysisResultEntity({
      clientLastAffiliationDate,
      cnisCompleteAnalysis,
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

    const conversationEntity = new ConversationEntity({
      customerId: new CustomerId(customer.id.toString()),
      assistantType: ChatPersonaTypeEnum.DUVIDAS_PREVIDENCIARIAS,
      status: null,
      lastAIMessageAt: null,
      archivedAt: null,
      createdAt: new Date(),
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      ...analysisToolRecordQueryResult,
      status: AnalysisStatusEnum.COMPLETED,
      analysisToolClient,
      cnisFastAnalysis,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      retirementPlanningRgps: null,
      conversation: conversationEntity,
    });

    const createConversationTransaction =
      this.conversationCommandRepositoryGateway.createConversation(
        conversationEntity,
      );

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

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createCnisFastAnalysisResultTransaction,
      createConversationTransaction,
      updateCnisFastAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
    ]);
    await transaction.commit();

    const conversationResponseDto = GetConversationResponseDto.build({
      ...conversationEntity,
    });

    return CreateCnisFastAnalysisResultResponseDto.build({
      ...cnisFastAnalysisResult,
      conversation: conversationResponseDto,
    });
  }
}
