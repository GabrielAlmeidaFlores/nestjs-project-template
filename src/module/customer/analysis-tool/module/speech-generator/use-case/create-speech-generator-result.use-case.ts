import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/command/speech-generator-result.command.repository.gateway';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import { CreateSpeechGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/create-speech-generator-result.response.dto';
import { SpeechGeneratorDocumentRequiredError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-document-required.error';
import { SpeechGeneratorNotFoundError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-not-found.error';
import { SpeechGeneratorResultAlreadyExistsError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpeechGeneratorResultUseCase {
  protected readonly _type = CreateSpeechGeneratorResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpeechGeneratorCommandRepositoryGateway)
    private readonly speechGeneratorCommandRepositoryGateway: SpeechGeneratorCommandRepositoryGateway,
    @Inject(SpeechGeneratorResultCommandRepositoryGateway)
    private readonly speechGeneratorResultCommandRepositoryGateway: SpeechGeneratorResultCommandRepositoryGateway,
    @Inject(SpeechGeneratorQueryRepositoryGateway)
    private readonly speechGeneratorQueryRepositoryGateway: SpeechGeneratorQueryRepositoryGateway,
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
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    speechGeneratorId: SpeechGeneratorId,
  ): Promise<CreateSpeechGeneratorResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const promptCompleteResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.SPEECH_GENERATOR_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPEECH_GENERATOR_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpeechGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        speechGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpeechGeneratorNotFoundError,
      );

    const speechGeneratorQueryResult =
      await this.speechGeneratorQueryRepositoryGateway.findOneBySpeechGeneratorIdAndOrganizationIdWithRelationsOrFail(
        speechGeneratorId,
        organizationSessionData.organizationId,
        SpeechGeneratorNotFoundError,
      );

    if (speechGeneratorQueryResult.speechGeneratorResult !== null) {
      throw new SpeechGeneratorResultAlreadyExistsError();
    }

    if (speechGeneratorQueryResult.speechGeneratorDocument.length === 0) {
      throw new SpeechGeneratorDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(analysisToolRecordQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const documentsBuffer = await Promise.all(
      speechGeneratorQueryResult.speechGeneratorDocument.map(async (doc) =>
        this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );
    const files = [...documentsBuffer, clientDataBuffer];

    let clientName: string | null = null;
    let clientFederalDocument: FederalDocument | null = null;
    let clientBirthDate: Date | null = null;

    const firstDocumentBuffer = documentsBuffer[0];
    if (firstDocumentBuffer !== undefined) {
      try {
        const cnisDocumentData =
          await this.analysisProcessorGateway.parseCnisDocument(
            firstDocumentBuffer,
          );

        clientName = cnisDocumentData.affiliateIdentification?.nome ?? null;
        clientBirthDate =
          cnisDocumentData.affiliateIdentification?.dataDeNascimento ?? null;
        clientFederalDocument =
          cnisDocumentData.affiliateIdentification?.cpf !== undefined
            ? new FederalDocument(cnisDocumentData.affiliateIdentification.cpf)
            : null;
      } catch {
        clientName = null;
        clientFederalDocument = null;
        clientBirthDate = null;
      }
    }

    const speechGeneratorCompleteContentMarkdown =
      await this.analysisProcessorGateway.getSpeechGeneratorCompleteAnalysis(
        promptCompleteResponse.prompt,
        files,
      );

    if (speechGeneratorCompleteContentMarkdown === null) {
      throw new Error('Failed to generate speech generator complete content');
    }

    const speechGeneratorResult = new SpeechGeneratorResultEntity({
      clientName,
      clientFederalDocument,
      clientBirthDate,
      speechGeneratorCompleteContent: speechGeneratorCompleteContentMarkdown,
      speechGeneratorSimplifiedContent: null,
    });

    const speechGenerator = new SpeechGeneratorEntity({
      id: speechGeneratorQueryResult.id,
      speechGeneratorResult,
      speechGeneratorDocument: [],
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
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
      speechGenerator,
      analysisToolClient,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      this.speechGeneratorResultCommandRepositoryGateway.createSpeechGeneratorResult(
        speechGeneratorResult,
      ),
      this.speechGeneratorCommandRepositoryGateway.updateSpeechGenerator(
        speechGenerator.id,
        speechGenerator,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    ]);
    await transaction.commit();

    const completeContentMarkdown =
      speechGeneratorResult.speechGeneratorCompleteContent;
    const completeContentHtml =
      completeContentMarkdown !== null
        ? await this.markdownConverterGateway.convertToHtml(
            completeContentMarkdown,
          )
        : null;

    const simplifiedContentMarkdown =
      speechGeneratorResult.speechGeneratorSimplifiedContent;
    const simplifiedContentHtml =
      simplifiedContentMarkdown !== null
        ? await this.markdownConverterGateway.convertToHtml(
            simplifiedContentMarkdown,
          )
        : null;

    return CreateSpeechGeneratorResultResponseDto.build({
      speechGeneratorCompleteContent: completeContentHtml,
      speechGeneratorSimplifiedContent: simplifiedContentHtml,
    });
  }
}
