import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/command/speech-generator-result.command.repository.gateway';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import { SpeechGeneratorDoesNotContainCompleteContentError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-does-not-contain-complete-content.error';
import { SpeechGeneratorDoesNotContainSimplifiedContentError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-does-not-contain-simplified-content.error';
import { SpeechGeneratorNotFoundError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSpeechGeneratorSimplifiedContentUseCase {
  protected readonly _type =
    DownloadSpeechGeneratorSimplifiedContentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpeechGeneratorQueryRepositoryGateway)
    private readonly speechGeneratorQueryRepositoryGateway: SpeechGeneratorQueryRepositoryGateway,
    @Inject(SpeechGeneratorCommandRepositoryGateway)
    private readonly speechGeneratorCommandRepositoryGateway: SpeechGeneratorCommandRepositoryGateway,
    @Inject(SpeechGeneratorResultCommandRepositoryGateway)
    private readonly speechGeneratorResultCommandRepositoryGateway: SpeechGeneratorResultCommandRepositoryGateway,
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
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    speechGeneratorId: SpeechGeneratorId,
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
        PaymentPlanPaidResourceTypeEnum.SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.SPEECH_GENERATOR_SIMPLIFIED_ANALYSIS,
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

    if (speechGeneratorQueryResult.speechGeneratorResult === null) {
      throw new SpeechGeneratorDoesNotContainCompleteContentError();
    }

    const currentResult = speechGeneratorQueryResult.speechGeneratorResult;

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    if (currentResult.speechGeneratorSimplifiedContent === null) {
      if (currentResult.speechGeneratorCompleteContent === null) {
        throw new SpeechGeneratorDoesNotContainCompleteContentError();
      }

      const speechGeneratorSimplifiedContentMarkdown =
        await this.analysisProcessorGateway.getSpeechGeneratorSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(currentResult.speechGeneratorCompleteContent, 'utf-8')],
        );

      if (speechGeneratorSimplifiedContentMarkdown === null) {
        throw new SpeechGeneratorDoesNotContainSimplifiedContentError();
      }

      const simplifiedResultEntity = new SpeechGeneratorResultEntity({
        ...currentResult,
        speechGeneratorSimplifiedContent:
          speechGeneratorSimplifiedContentMarkdown,
      });

      const speechGenerator = new SpeechGeneratorEntity({
        id: speechGeneratorQueryResult.id,
        speechGeneratorResult: simplifiedResultEntity,
        speechGeneratorDocument: [],
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      });

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        this.speechGeneratorResultCommandRepositoryGateway.updateSpeechGeneratorResult(
          currentResult.id,
          simplifiedResultEntity,
        ),
        this.speechGeneratorCommandRepositoryGateway.updateSpeechGenerator(
          speechGenerator.id,
          speechGenerator,
        ),
      ]);
      await transaction.commit();

      return await this.exportDocumentGateway.downloadFileAsStreamable(
        speechGeneratorSimplifiedContentMarkdown,
        format,
        'discurso_simplificado_gerador_discurso',
        exportOptions,
      );
    }

    return await this.exportDocumentGateway.downloadFileAsStreamable(
      currentResult.speechGeneratorSimplifiedContent,
      format,
      'discurso_simplificado_gerador_discurso',
      exportOptions,
    );
  }
}
