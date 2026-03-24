import { Injectable, Inject } from '@nestjs/common';

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
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MedicalQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/command/medical-question-generator.command.repository.gateway';
import { MedicalQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/medical-question-generator.query.repository.gateway';
import { GetMedicalQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-document.query.result';
import { GetMedicalQuestionGeneratorInssBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-inss-benefit.query.result';
import { GetMedicalQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/query/result/get-medical-question-generator-legal-proceeding.query.result';
import { MedicalQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-document/command/medical-question-generator-document.command.repository.gateway';
import { MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-inss-benefit/command/medical-question-generator-inss-benefit.command.repository.gateway';
import { MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-legal-proceeding/command/medical-question-generator-legal-proceeding.command.repository.gateway';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { MedicalQuestionGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/enum/medical-question-generator-document-type.enum';
import { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';
import { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import { UpdateMedicalQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/request/update-medical-question-generator.request.dto';
import { UpdateMedicalQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/update-medical-question-generator.response.dto';
import { MedicalQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/medical-question-generator/error/medical-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateMedicalQuestionGeneratorUseCase {
  protected readonly _type = UpdateMedicalQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorCommandRepositoryGateway: MedicalQuestionGeneratorCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorQueryRepositoryGateway)
    private readonly medicalQuestionGeneratorQueryRepositoryGateway: MedicalQuestionGeneratorQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorDocumentCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorDocumentCommandRepositoryGateway: MedicalQuestionGeneratorDocumentCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorInssBenefitCommandRepositoryGateway: MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway: MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    dto: UpdateMedicalQuestionGeneratorRequestDto,
  ): Promise<UpdateMedicalQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const medicalQuestionGeneratorQueryResult =
      await this.medicalQuestionGeneratorQueryRepositoryGateway.findOneByMedicalQuestionGeneratorIdAndOrganizationIdOrFail(
        medicalQuestionGeneratorId,
        organizationSessionData.organizationId,
        MedicalQuestionGeneratorNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        medicalQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MedicalQuestionGeneratorNotFoundError,
      );

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.json.analysisToolClientId ??
          analysisToolRecordQueryResult.analysisToolClient.id,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const medicalQuestionGenerator = new MedicalQuestionGeneratorEntity({
      id: medicalQuestionGeneratorQueryResult.id,
      disabilityDate:
        dto.json.disabilityDate ??
        medicalQuestionGeneratorQueryResult.disabilityDate,
      medicalQuestionGeneratorResult: null,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      medicalQuestionGenerator,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      disabilityAssessmentForBpcAnalysis: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
    });

    const transactions: TransactionType[] = [];

    transactions.push(
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    );

    if (dto.cnisDocument !== undefined && dto.cnisDocument.length > 0) {
      const documentTransactions = await this.updateDocumentOnDatabase(
        medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorDocument,
        dto.cnisDocument,
        MedicalQuestionGeneratorDocumentTypeEnum.CNIS,
        medicalQuestionGenerator,
      );

      transactions.push(...documentTransactions);
    }

    if (dto.medicalDocument !== undefined && dto.medicalDocument.length > 0) {
      const documentTransactions = await this.updateDocumentOnDatabase(
        medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorDocument,
        dto.medicalDocument,
        MedicalQuestionGeneratorDocumentTypeEnum.MEDICAL,
        medicalQuestionGenerator,
      );

      transactions.push(...documentTransactions);
    }

    if (dto.json.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorInssBenefit,
          dto.json.inssBenefitNumber,
          medicalQuestionGenerator,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          medicalQuestionGeneratorQueryResult.medicalQuestionGeneratorLegalProceeding,
          dto.json.legalProceedingNumber,
          medicalQuestionGenerator,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    const medicalQuestionGeneratorTransaction =
      this.medicalQuestionGeneratorCommandRepositoryGateway.updateMedicalQuestionGenerator(
        medicalQuestionGenerator.id,
        medicalQuestionGenerator,
      );
    transactions.push(medicalQuestionGeneratorTransaction);

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecord.type,
        organizationMemberId: organizationMember.id.toString(),
        analysisToolClientId:
          analysisToolRecord.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecord.id.toString(),
        transactions,
      });

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(
        transactionsWithActivity,
      );
    await executeTransactions.commit();

    return UpdateMedicalQuestionGeneratorResponseDto.build({
      medicalQuestionGeneratorId,
    });
  }

  private async updateDocumentOnDatabase(
    currentDocuments: GetMedicalQuestionGeneratorDocumentQueryResult[],
    newDocuments: FileModel[],
    documentType: MedicalQuestionGeneratorDocumentTypeEnum,
    medicalQuestionGenerator: MedicalQuestionGeneratorEntity,
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [];

    const documentsToDelete = currentDocuments.filter(
      (doc) => doc.type === documentType,
    );

    for (const doc of documentsToDelete) {
      transactions.push(
        this.medicalQuestionGeneratorDocumentCommandRepositoryGateway.deleteMedicalQuestionGeneratorDocument(
          doc.id,
        ),
      );
    }

    for (const newDoc of newDocuments) {
      const documentId = new MedicalQuestionGeneratorDocumentId();
      const documentUrl = await this.fileProcessorGateway.uploadFile(newDoc);

      const document = new MedicalQuestionGeneratorDocumentEntity({
        id: documentId,
        type: documentType,
        document: documentUrl,
        medicalQuestionGenerator,
      });

      transactions.push(
        this.medicalQuestionGeneratorDocumentCommandRepositoryGateway.createMedicalQuestionGeneratorDocument(
          document,
        ),
      );
    }

    return transactions;
  }

  private updateInssBenefitNumberOnDatabase(
    currentInssBenefitNumber: GetMedicalQuestionGeneratorInssBenefitQueryResult[],
    newInssBenefitNumber: string[],
    medicalQuestionGenerator: MedicalQuestionGeneratorEntity,
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.medicalQuestionGeneratorInssBenefitCommandRepositoryGateway.deleteMedicalQuestionGeneratorInssBenefit(
        value.id,
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new MedicalQuestionGeneratorInssBenefitEntity({
        inssBenefitNumber: value,
        medicalQuestionGenerator,
      });

      return this.medicalQuestionGeneratorInssBenefitCommandRepositoryGateway.createMedicalQuestionGeneratorInssBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    currentLegalProceedingNumber: GetMedicalQuestionGeneratorLegalProceedingQueryResult[],
    newLegalProceeding: string[],
    medicalQuestionGenerator: MedicalQuestionGeneratorEntity,
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway.deleteMedicalQuestionGeneratorLegalProceeding(
        value.id,
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity = new MedicalQuestionGeneratorLegalProceedingEntity({
        legalProceedingNumber: value,
        medicalQuestionGenerator,
      });

      return this.medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway.createMedicalQuestionGeneratorLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
