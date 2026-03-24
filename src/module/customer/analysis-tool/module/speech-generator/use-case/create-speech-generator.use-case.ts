import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-benefit/command/speech-generator-benefit.command.repository.gateway';
import { SpeechGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-document/command/speech-generator-document.command.repository.gateway';
import { SpeechGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-legal-proceeding/command/speech-generator-legal-proceeding.command.repository.gateway';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-benefit/speech-generator-benefit.entity';
import { SpeechGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/enum/speech-generator-document-type.enum';
import { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import { SpeechGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-legal-proceeding/speech-generator-legal-proceeding.entity';
import { CreateSpeechGeneratorRequestDto } from '@module/customer/analysis-tool/module/speech-generator/dto/request/create-speech-generator.request.dto';
import { CreateSpeechGeneratorResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/create-speech-generator.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpeechGeneratorUseCase {
  protected readonly _type = CreateSpeechGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpeechGeneratorCommandRepositoryGateway)
    private readonly speechGeneratorCommandRepositoryGateway: SpeechGeneratorCommandRepositoryGateway,
    @Inject(SpeechGeneratorDocumentCommandRepositoryGateway)
    private readonly speechGeneratorDocumentCommandRepositoryGateway: SpeechGeneratorDocumentCommandRepositoryGateway,
    @Inject(SpeechGeneratorBenefitCommandRepositoryGateway)
    private readonly speechGeneratorBenefitCommandRepositoryGateway: SpeechGeneratorBenefitCommandRepositoryGateway,
    @Inject(SpeechGeneratorLegalProceedingCommandRepositoryGateway)
    private readonly speechGeneratorLegalProceedingCommandRepositoryGateway: SpeechGeneratorLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateSpeechGeneratorRequestDto,
  ): Promise<CreateSpeechGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const previdenciaryDocumentFiles = await Promise.all(
      dto.previdenciaryDocuments !== undefined
        ? dto.previdenciaryDocuments.map(async (value) => {
            return await this.fileProcessorGateway.uploadFile(value);
          })
        : [],
    );

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.json.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const speechGenerator = new SpeechGeneratorEntity({
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const speechGeneratorDocuments = previdenciaryDocumentFiles.map(
      (value) =>
        new SpeechGeneratorDocumentEntity({
          document: value,
          type: SpeechGeneratorDocumentTypeEnum.PREVIDENCIARY_DOCUMENTS,
          speechGenerator,
        }),
    );

    const speechGeneratorBenefits =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map(
            (inssBenefitNumber) =>
              new SpeechGeneratorBenefitEntity({
                inssBenefitNumber,
                speechGenerator,
              }),
          )
        : [];

    const speechGeneratorLegalProceedings =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map(
            (legalProceedingNumber) =>
              new SpeechGeneratorLegalProceedingEntity({
                legalProceedingNumber,
                speechGenerator,
              }),
          )
        : [];

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.SPEECH_GENERATOR,
      speechGenerator,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      speechGenerator,
      speechGeneratorDocuments,
      speechGeneratorBenefits,
      speechGeneratorLegalProceedings,
      analysisToolRecord,
    );

    return CreateSpeechGeneratorResponseDto.build({
      speechGeneratorId: speechGenerator.id,
    });
  }

  private async createOnDatabase(
    speechGenerator: SpeechGeneratorEntity,
    speechGeneratorDocuments: SpeechGeneratorDocumentEntity[],
    speechGeneratorBenefits: SpeechGeneratorBenefitEntity[],
    speechGeneratorLegalProceedings: SpeechGeneratorLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const documentTransactions = speechGeneratorDocuments.map((value) =>
      this.speechGeneratorDocumentCommandRepositoryGateway.createSpeechGeneratorDocument(
        value,
      ),
    );

    const benefitTransactions = speechGeneratorBenefits.map((value) =>
      this.speechGeneratorBenefitCommandRepositoryGateway.createSpeechGeneratorBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = speechGeneratorLegalProceedings.map(
      (value) =>
        this.speechGeneratorLegalProceedingCommandRepositoryGateway.createSpeechGeneratorLegalProceeding(
          value,
        ),
    );

    const speechGeneratorTransaction =
      this.speechGeneratorCommandRepositoryGateway.createSpeechGenerator(
        speechGenerator,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.SPEECH_GENERATOR,
        organizationMemberId: analysisToolRecord.createdBy.toString(),
        analysisToolClientId:
          analysisToolRecord.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecord.id.toString(),
        transactions: [
          speechGeneratorTransaction,
          ...documentTransactions,
          ...benefitTransactions,
          ...legalProceedingTransactions,
          analysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();
  }
}
