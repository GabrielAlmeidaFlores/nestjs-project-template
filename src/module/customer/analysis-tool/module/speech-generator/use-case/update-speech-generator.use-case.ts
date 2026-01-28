import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-document/command/speech-generator-document.command.repository.gateway';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/speech-generator-document.entity';
import { SpeechGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/enum/speech-generator-document-type.enum';
import { SpeechGeneratorDocumentId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-document/value-object/speech-generator-document-id/speech-generator-document-id.value-object';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { UpdateSpeechGeneratorRequestDto } from '@module/customer/analysis-tool/module/speech-generator/dto/request/update-speech-generator.request.dto';
import { UpdateSpeechGeneratorResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/update-speech-generator.response.dto';
import { SpeechGeneratorNotFoundError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-not-found.error';
import type { GetSpeechGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-document.query.result';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import type { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateSpeechGeneratorUseCase {
  protected readonly _type = UpdateSpeechGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpeechGeneratorCommandRepositoryGateway)
    private readonly speechGeneratorCommandRepositoryGateway: SpeechGeneratorCommandRepositoryGateway,
    @Inject(SpeechGeneratorQueryRepositoryGateway)
    private readonly speechGeneratorQueryRepositoryGateway: SpeechGeneratorQueryRepositoryGateway,
    @Inject(SpeechGeneratorDocumentCommandRepositoryGateway)
    private readonly speechGeneratorDocumentCommandRepositoryGateway: SpeechGeneratorDocumentCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    speechGeneratorId: SpeechGeneratorId,
    dto: UpdateSpeechGeneratorRequestDto,
  ): Promise<UpdateSpeechGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const speechGeneratorQueryResult =
      await this.speechGeneratorQueryRepositoryGateway.findOneBySpeechGeneratorIdAndOrganizationIdWithRelationsOrFail(
        speechGeneratorId,
        organizationSessionData.organizationId,
        SpeechGeneratorNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpeechGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        speechGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpeechGeneratorNotFoundError,
      );

    const analysisToolClientId =
      dto.json?.analysisToolClientId ??
      analysisToolRecordQueryResult.analysisToolClient.id;
    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const speechGenerator = new SpeechGeneratorEntity({
      id: speechGeneratorQueryResult.id,
      speechGeneratorResult: null,
      speechGeneratorDocument: [],
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      speechGenerator,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.previdenciaryDocuments !== undefined) {
      const docTransactions = await this.updatePrevidenciaryDocumentsOnDatabase(
        speechGenerator,
        speechGeneratorQueryResult.speechGeneratorDocument,
        dto.previdenciaryDocuments,
      );
      transactions.push(...docTransactions);
    }

    transactions.push(
      this.speechGeneratorCommandRepositoryGateway.updateSpeechGenerator(
        speechGenerator.id,
        speechGenerator,
      ),
    );
    transactions.push(
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await transaction.commit();

    return UpdateSpeechGeneratorResponseDto.build({
      speechGeneratorId: speechGenerator.id,
    });
  }

  private async updatePrevidenciaryDocumentsOnDatabase(
    speechGenerator: SpeechGeneratorEntity,
    currentDocuments: GetSpeechGeneratorDocumentQueryResult[],
    newFiles: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteTransactions = currentDocuments.map((doc) =>
      this.speechGeneratorDocumentCommandRepositoryGateway.deleteSpeechGeneratorDocument(
        new SpeechGeneratorDocumentId(doc.id.toString()),
      ),
    );

    const uploadedPaths = await Promise.all(
      newFiles.map(async (f) => this.fileProcessorGateway.uploadFile(f)),
    );

    const createTransactions = uploadedPaths.map(
      (path) =>
        new SpeechGeneratorDocumentEntity({
          document: path,
          type: SpeechGeneratorDocumentTypeEnum.PREVIDENCIARY_DOCUMENTS,
          speechGenerator,
        }),
    ).map((entity) =>
      this.speechGeneratorDocumentCommandRepositoryGateway.createSpeechGeneratorDocument(
        entity,
      ),
    );

    return [...deleteTransactions, ...createTransactions];
  }
}
