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
import { DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/command/disability-assessment-for-bpc-analysis.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-benefit.query.result';
import { GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-document.query.result';
import { GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-legal-proceeding.query.result';
import { DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-benefit/command/disability-assessment-for-bpc-analysis-benefit.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-document/command/disability-assessment-for-bpc-analysis-document.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-legal-proceeding/command/disability-assessment-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/value-object/disability-assessment-for-bpc-analysis-benefit-id/disability-assessment-for-bpc-analysis-benefit-id.value-object';
import { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/enum/disability-assessment-for-bpc-analysis-document-type.enum';
import { DisabilityAssessmentForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/value-object/disability-assessment-for-bpc-analysis-document-id/disability-assessment-for-bpc-analysis-document-id.value-object';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/value-object/disability-assessment-for-bpc-analysis-legal-proceeding-id/disability-assessment-for-bpc-analysis-legal-proceeding-id.value-object';
import { UpdateDisabilityAssessmentForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/request/update-disability-assessment-for-bpc-analysis.request.dto';
import { UpdateDisabilityAssessmentForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/update-disability-assessment-for-bpc-analysis.response.dto';
import { DisabilityAssessmentForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateDisabilityAssessmentForBpcAnalysisUseCase {
  protected readonly _type =
    UpdateDisabilityAssessmentForBpcAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway,
    @Inject(
      DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway,
    )
    private readonly disabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisQueryRepositoryGateway: DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
    dto: UpdateDisabilityAssessmentForBpcAnalysisRequestDto,
  ): Promise<UpdateDisabilityAssessmentForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const disabilityAssessmentForBpcAnalysisQueryResult =
      await this.disabilityAssessmentForBpcAnalysisQueryRepositoryGateway.findOneByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
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

    const disabilityAssessmentForBpcAnalysis =
      new DisabilityAssessmentForBpcAnalysisEntity({
        id: disabilityAssessmentForBpcAnalysisQueryResult.id,
        estimatedDisabilityStartDate:
          dto.json?.estimatedDisabilityStartDate !== undefined
            ? (dto.json.estimatedDisabilityStartDate ?? null)
            : (disabilityAssessmentForBpcAnalysisQueryResult.estimatedDisabilityStartDate ??
              null),
        attendsSchoolOrTechnicalCourse:
          dto.json?.attendsSchoolOrTechnicalCourse !== undefined
            ? (dto.json.attendsSchoolOrTechnicalCourse ?? null)
            : (disabilityAssessmentForBpcAnalysisQueryResult.attendsSchoolOrTechnicalCourse ??
              null),
        performsLaborActivity:
          dto.json?.performsLaborActivity !== undefined
            ? (dto.json.performsLaborActivity ?? null)
            : (disabilityAssessmentForBpcAnalysisQueryResult.performsLaborActivity ??
              null),
        needsThirdPartyHelp:
          dto.json?.needsThirdPartyHelp !== undefined
            ? (dto.json.needsThirdPartyHelp ?? null)
            : (disabilityAssessmentForBpcAnalysisQueryResult.needsThirdPartyHelp ??
              null),
        hasAccessToBasicServices:
          dto.json?.hasAccessToBasicServices !== undefined
            ? (dto.json.hasAccessToBasicServices ?? null)
            : (disabilityAssessmentForBpcAnalysisQueryResult.hasAccessToBasicServices ??
              null),
        otherBarriersDescription:
          dto.json?.otherBarriersDescription !== undefined
            ? (dto.json.otherBarriersDescription ?? null)
            : (disabilityAssessmentForBpcAnalysisQueryResult.otherBarriersDescription ??
              null),
        createdBy: disabilityAssessmentForBpcAnalysisQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      disabilityAssessmentForBpcAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      judicialCaseAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      administrativeProcedureInssAnalysis: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          disabilityAssessmentForBpcAnalysis,
          disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisBenefit,
          dto.json.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          disabilityAssessmentForBpcAnalysis,
          disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisLegalProceeding,
          dto.json.legalProceedingNumber,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    if (dto.medicalAndSocialDocuments !== undefined) {
      const currentMedicalAndSocialDocuments =
        disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisDocument;

      const medicalAndSocialDocumentsTransactions =
        await this.updateMedicalAndSocialDocumentsOnDatabase(
          disabilityAssessmentForBpcAnalysis,
          currentMedicalAndSocialDocuments,
          dto.medicalAndSocialDocuments,
        );
      transactions.push(...medicalAndSocialDocumentsTransactions);
    }

    const disabilityAssessmentForBpcAnalysisTransaction =
      this.disabilityAssessmentForBpcAnalysisCommandRepositoryGateway.updateDisabilityAssessmentForBpcAnalysis(
        disabilityAssessmentForBpcAnalysis.id,
        disabilityAssessmentForBpcAnalysis,
      );
    transactions.push(disabilityAssessmentForBpcAnalysisTransaction);

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

    return UpdateDisabilityAssessmentForBpcAnalysisResponseDto.build({
      disabilityAssessmentForBpcAnalysisId,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity,
    currentInssBenefitNumber: GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult[],
    newInssBenefitNumber: string[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.disabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway.deleteDisabilityAssessmentForBpcAnalysisBenefit(
        new DisabilityAssessmentForBpcAnalysisBenefitId(value.id.toString()),
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new DisabilityAssessmentForBpcAnalysisBenefitEntity({
        inssBenefitNumber: value,
        disabilityAssessmentForBpcAnalysis,
      });

      return this.disabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysisBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private async updateMedicalAndSocialDocumentsOnDatabase(
    disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity,
    currentMedicalAndSocialDocuments: GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult[],
    newMedicalAndSocialDocuments: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteCurrent = currentMedicalAndSocialDocuments.map((value) => {
      return this.disabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway.deleteDisabilityAssessmentForBpcAnalysisDocument(
        new DisabilityAssessmentForBpcAnalysisDocumentId(value.id.toString()),
      );
    });

    const medicalAndSocialDocumentFiles = await Promise.all(
      newMedicalAndSocialDocuments.map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = medicalAndSocialDocumentFiles.map((value) => {
      const entity = new DisabilityAssessmentForBpcAnalysisDocumentEntity({
        document: value,
        type: DisabilityAssessmentForBpcAnalysisDocumentTypeEnum.MEDICAL_AND_SOCIAL_DOCUMENTS,
        disabilityAssessmentForBpcAnalysis,
      });

      return this.disabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysisDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity,
    currentLegalProceedingNumber: GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult[],
    newLegalProceeding: string[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.disabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway.deleteDisabilityAssessmentForBpcAnalysisLegalProceeding(
        new DisabilityAssessmentForBpcAnalysisLegalProceedingId(
          value.id.toString(),
        ),
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity =
        new DisabilityAssessmentForBpcAnalysisLegalProceedingEntity({
          legalProceedingNumber: value,
          disabilityAssessmentForBpcAnalysis,
        });

      return this.disabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysisLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
