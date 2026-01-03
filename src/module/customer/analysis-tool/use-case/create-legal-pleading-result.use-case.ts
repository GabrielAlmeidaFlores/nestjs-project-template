import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity';
import { ChatPersonaTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { GetConversationResponseDto } from '@module/ai/infra/chat/dto/response/get-conversation.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { LegalPleadingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/command/legal-pleading.repository.gateway';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import { CreateLegalPleadingResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-result.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateLegalPleadingResultUseCase {
  protected readonly _type = CreateLegalPleadingResultUseCase.name;

  public constructor(
    @Inject(AnalysisProcessorGateway)
    protected readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(FileProcessorGateway)
    protected readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(LegalPleadingCommandRepositoryGateway)
    private readonly legalPleadingCommandRepositoryGateway: LegalPleadingCommandRepositoryGateway,
    @Inject(LegalPleadingResultCommandRepositoryGateway)
    private readonly legalPleadingResultCommandRepositoryGateway: LegalPleadingResultCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(ConversationCommandRepositoryGateway)
    private readonly conversationCommandRepositoryGateway: ConversationCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
  ): Promise<CreateLegalPleadingResultResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const legalPleadingQueryResult =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        LegalPleadingNotFoundError,
      );

    const documentsBuffer: Buffer[] = [
      Buffer.from(JSON.stringify(legalPleadingQueryResult, null, 2), 'utf-8'),
    ];

    await Promise.all(
      legalPleadingQueryResult.legalPleadingDocument.map(async (item) => {
        let documentBuffer = await this.fileProcessorGateway.getFileBuffer(
          item.document,
        );

        if (item.type === LegalPleadingDocumentTypeEnum.CNIS) {
          const isValidCnis =
            await this.analysisProcessorGateway.validateCnisDocument(
              documentBuffer,
            );

          if (isValidCnis) {
            const extractedCnisData =
              await this.analysisProcessorGateway.parseCnisDocument(
                documentBuffer,
              );

            documentBuffer = Buffer.from(
              JSON.stringify(extractedCnisData, null, 2),
              'utf-8',
            );
          }
        }

        documentsBuffer.push(documentBuffer);
      }),
    );

    const legalPleadingCompleteAnalysis =
      await this.analysisProcessorGateway.getLegalPleadingCompleteAnalysis(
        documentsBuffer,
      );

    const legalPleadingResult = new LegalPleadingResultEntity({
      legalPleadingCompleteAnalysis,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...legalPleadingQueryResult.analysisToolClient,
      createdBy: legalPleadingQueryResult.analysisToolClient.createdBy.id,
      updatedBy: legalPleadingQueryResult.analysisToolClient.updatedBy.id,
    });

    const legalPleadingAddress = legalPleadingQueryResult.legalPleadingAddress
      ? new LegalPleadingAddressEntity({
          ...legalPleadingQueryResult.legalPleadingAddress,
        })
      : null;

    const legalPleading = new LegalPleadingEntity({
      ...legalPleadingQueryResult,
      legalPleadingResult,
      analysisToolClient,
      legalPleadingAddress,
      createdBy: legalPleadingQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const conversationEntity = new ConversationEntity({
      customerId: new CustomerId(customer.id.toString()),
      assistantType: ChatPersonaTypeEnum.DUVIDAS_PREVIDENCIARIAS,
      status: null,
      lastAIMessageAt: null,
      contextPrompt: legalPleadingCompleteAnalysis,
      archivedAt: null,
      createdAt: new Date(),
    });

    const createConversationTransaction =
      this.conversationCommandRepositoryGateway.createConversation(
        conversationEntity,
      );

    const legalPleadingTransaction =
      this.legalPleadingCommandRepositoryGateway.updateLegalPleading(
        legalPleading.id,
        legalPleading,
      );

    const legalPleadingResultTransaction =
      this.legalPleadingResultCommandRepositoryGateway.createLegalPleadingResult(
        legalPleadingResult,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      legalPleadingResultTransaction,
      createConversationTransaction,
      legalPleadingTransaction,
    ]);
    await transaction.commit();

    const conversationResponseDto = GetConversationResponseDto.build({
      ...conversationEntity,
    });

    return CreateLegalPleadingResultResponseDto.build({
      legalPleadingCompleteAnalysis,
      conversation: conversationResponseDto,
    });
  }
}
