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
import { JudicialCaseAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/command/judicial-case-analysis.command.repository.gateway';
import { JudicialCaseAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/judicial-case-analysis.query.repository.gateway';
import { GetJudicialCaseAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-benefit.query.result';
import { GetJudicialCaseAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-document.query.result';
import { GetJudicialCaseAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-legal-proceeding.query.result';
import { JudicialCaseAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-benefit/command/judicial-case-analysis-benefit.command.repository.gateway';
import { JudicialCaseAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-document/command/judicial-case-analysis-document.command.repository.gateway';
import { JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-legal-proceeding/command/judicial-case-analysis-legal-proceeding.command.repository.gateway';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';
import { JudicialCaseAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/enum/judicial-case-analysis-document-type.enum';
import { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';
import { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';
import { UpdateJudicialCaseAnalysisRequestDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/request/update-judicial-case-analysis.request.dto';
import { UpdateJudicialCaseAnalysisResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/update-judicial-case-analysis.response.dto';
import { JudicialCaseAnalysisNotFoundError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateJudicialCaseAnalysisUseCase {
  protected readonly _type = UpdateJudicialCaseAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisCommandRepositoryGateway)
    private readonly judicialCaseAnalysisCommandRepositoryGateway: JudicialCaseAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisBenefitCommandRepositoryGateway)
    private readonly judicialCaseAnalysisBenefitCommandRepositoryGateway: JudicialCaseAnalysisBenefitCommandRepositoryGateway,
    @Inject(JudicialCaseAnalysisDocumentCommandRepositoryGateway)
    private readonly judicialCaseAnalysisDocumentCommandRepositoryGateway: JudicialCaseAnalysisDocumentCommandRepositoryGateway,
    @Inject(JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly judicialCaseAnalysisLegalProceedingCommandRepositoryGateway: JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(JudicialCaseAnalysisQueryRepositoryGateway)
    private readonly judicialCaseAnalysisQueryRepositoryGateway: JudicialCaseAnalysisQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    dto: UpdateJudicialCaseAnalysisRequestDto,
  ): Promise<UpdateJudicialCaseAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const judicialCaseAnalysisQueryResult =
      await this.judicialCaseAnalysisQueryRepositoryGateway.findOneByJudicialCaseAnalysisIdAndOrganizationIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        JudicialCaseAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        JudicialCaseAnalysisNotFoundError,
      );

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.json?.analysisToolClientId ??
          analysisToolRecordQueryResult.analysisToolClient.id,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const judicialCaseAnalysis = new JudicialCaseAnalysisEntity({
      id: judicialCaseAnalysisQueryResult.id,
      createdBy: judicialCaseAnalysisQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      judicialCaseAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      specialActivity: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          judicialCaseAnalysis,
          judicialCaseAnalysisQueryResult.judicialCaseAnalysisBenefit,
          dto.json.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          judicialCaseAnalysis,
          judicialCaseAnalysisQueryResult.judicialCaseAnalysisLegalProceeding,
          dto.json.legalProceedingNumber,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    if (dto.judicialCaseDocument !== undefined) {
      const currentJudicialCaseDocuments =
        judicialCaseAnalysisQueryResult.judicialCaseAnalysisDocument.filter(
          (value) =>
            value.type === JudicialCaseAnalysisDocumentTypeEnum.JUDICIAL_CASE,
        );

      const judicialCaseDocumentsTransactions =
        await this.updateJudicialCaseDocumentsOnDatabase(
          judicialCaseAnalysis,
          currentJudicialCaseDocuments,
          dto.judicialCaseDocument,
        );
      transactions.push(...judicialCaseDocumentsTransactions);
    }

    if (dto.otherDocument !== undefined) {
      const currentOtherDocuments =
        judicialCaseAnalysisQueryResult.judicialCaseAnalysisDocument.filter(
          (value) =>
            value.type === JudicialCaseAnalysisDocumentTypeEnum.OTHER_DOCUMENT,
        );

      const otherDocumentsTransactions =
        await this.updateOtherDocumentsOnDatabase(
          judicialCaseAnalysis,
          currentOtherDocuments,
          dto.otherDocument,
        );
      transactions.push(...otherDocumentsTransactions);
    }

    const judicialCaseAnalysisTransaction =
      this.judicialCaseAnalysisCommandRepositoryGateway.updateJudicialCaseAnalysis(
        judicialCaseAnalysis.id,
        judicialCaseAnalysis,
      );
    transactions.push(judicialCaseAnalysisTransaction);

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );
    transactions.push(analysisToolRecordTransaction);

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecord.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(
        transactionsWithActivity,
      );
    await executeTransactions.commit();

    return UpdateJudicialCaseAnalysisResponseDto.build({
      judicialCaseAnalysisId,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    judicialCaseAnalysis: JudicialCaseAnalysisEntity,
    currentInssBenefitNumber: GetJudicialCaseAnalysisBenefitQueryResult[],
    newInssBenefitNumber: string[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.judicialCaseAnalysisBenefitCommandRepositoryGateway.deleteJudicialCaseAnalysisBenefit(
        new JudicialCaseAnalysisBenefitId(value.id.toString()),
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new JudicialCaseAnalysisBenefitEntity({
        inssBenefitNumber: value,
        judicialCaseAnalysis,
      });

      return this.judicialCaseAnalysisBenefitCommandRepositoryGateway.createJudicialCaseAnalysisBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private async updateJudicialCaseDocumentsOnDatabase(
    judicialCaseAnalysis: JudicialCaseAnalysisEntity,
    currentJudicialCaseDocuments: GetJudicialCaseAnalysisDocumentQueryResult[],
    newJudicialCaseDocuments: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteCurrent = currentJudicialCaseDocuments.map((value) => {
      return this.judicialCaseAnalysisDocumentCommandRepositoryGateway.deleteJudicialCaseAnalysisDocument(
        new JudicialCaseAnalysisDocumentId(value.id.toString()),
      );
    });

    const judicialCaseDocumentFiles = await Promise.all(
      newJudicialCaseDocuments.map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = judicialCaseDocumentFiles.map((value) => {
      const entity = new JudicialCaseAnalysisDocumentEntity({
        document: value,
        type: JudicialCaseAnalysisDocumentTypeEnum.JUDICIAL_CASE,
        judicialCaseAnalysis,
      });

      return this.judicialCaseAnalysisDocumentCommandRepositoryGateway.createJudicialCaseAnalysisDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private async updateOtherDocumentsOnDatabase(
    judicialCaseAnalysis: JudicialCaseAnalysisEntity,
    currentOtherDocuments: GetJudicialCaseAnalysisDocumentQueryResult[],
    newOtherDocuments: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteCurrent = currentOtherDocuments.map((value) => {
      return this.judicialCaseAnalysisDocumentCommandRepositoryGateway.deleteJudicialCaseAnalysisDocument(
        new JudicialCaseAnalysisDocumentId(value.id.toString()),
      );
    });

    const otherDocumentFiles = await Promise.all(
      newOtherDocuments.map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = otherDocumentFiles.map((value) => {
      const entity = new JudicialCaseAnalysisDocumentEntity({
        document: value,
        type: JudicialCaseAnalysisDocumentTypeEnum.OTHER_DOCUMENT,
        judicialCaseAnalysis,
      });

      return this.judicialCaseAnalysisDocumentCommandRepositoryGateway.createJudicialCaseAnalysisDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    judicialCaseAnalysis: JudicialCaseAnalysisEntity,
    currentLegalProceedingNumber: GetJudicialCaseAnalysisLegalProceedingQueryResult[],
    newLegalProceeding: string[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.judicialCaseAnalysisLegalProceedingCommandRepositoryGateway.deleteJudicialCaseAnalysisLegalProceeding(
        new JudicialCaseAnalysisLegalProceedingId(value.id.toString()),
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity = new JudicialCaseAnalysisLegalProceedingEntity({
        legalProceedingNumber: value,
        judicialCaseAnalysis,
      });

      return this.judicialCaseAnalysisLegalProceedingCommandRepositoryGateway.createJudicialCaseAnalysisLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
