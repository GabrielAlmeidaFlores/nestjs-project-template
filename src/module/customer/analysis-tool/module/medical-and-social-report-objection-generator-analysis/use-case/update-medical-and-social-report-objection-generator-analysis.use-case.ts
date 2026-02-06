import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/command/medical-and-social-report-objection-generator-analysis.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/medical-and-social-report-objection-generator-analysis.query.repository.gateway';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-benefit.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-document.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis-legal-proceeding.query.result';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-benefit/command/medical-and-social-report-objection-generator-analysis-benefit.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-document/command/medical-and-social-report-objection-generator-analysis-document.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-legal-proceeding/command/medical-and-social-report-objection-generator-analysis-legal-proceeding.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/value-object/medical-and-social-report-objection-generator-analysis-benefit-id/medical-and-social-report-objection-generator-analysis-benefit-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/enum/medical-and-social-report-objection-generator-analysis-document-type.enum';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/value-object/medical-and-social-report-objection-generator-analysis-document-id/medical-and-social-report-objection-generator-analysis-document-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/value-object/medical-and-social-report-objection-generator-analysis-legal-proceeding-id/medical-and-social-report-objection-generator-analysis-legal-proceeding-id.value-object';
import { UpdateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/request/update-medical-and-social-report-objection-generator-analysis.request.dto';
import { UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/update-medical-and-social-report-objection-generator-analysis.response.dto';
import { MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase {
  protected readonly _type =
    UpdateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    dto: UpdateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto,
  ): Promise<UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const medicalAndSocialReportObjectionGeneratorAnalysisQueryResult =
      await this.medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway.findOneByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    const medicalAndSocialReportObjectionGeneratorAnalysis =
      new MedicalAndSocialReportObjectionGeneratorAnalysisEntity({
        id: medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.id,
        createdBy:
          medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.createdBy
            .id,
        updatedBy: organizationMember.id,
      });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      ...analysisToolRecordQueryResult,
      medicalAndSocialReportObjectionGeneratorAnalysis,
      analysisToolClient,
      disabilityAssessmentForBpcAnalysis: null,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      speechGenerator: null,
      medicalQuestionGenerator: null,
      specialActivity: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          medicalAndSocialReportObjectionGeneratorAnalysis,
          medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
          dto.json.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          medicalAndSocialReportObjectionGeneratorAnalysis,
          medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
          dto.json.legalProceedingNumber,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    if (dto.medicalExpertReport !== undefined) {
      const currentMedicalExpertReportDocuments =
        medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisDocument.filter(
          (value) =>
            value.type ===
            MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum.MEDICAL_EXPERT_REPORT,
        );

      const medicalExpertReportDocumentsTransactions =
        await this.updateMedicalExpertReportDocumentsOnDatabase(
          medicalAndSocialReportObjectionGeneratorAnalysis,
          currentMedicalExpertReportDocuments,
          dto.medicalExpertReport,
        );
      transactions.push(...medicalExpertReportDocumentsTransactions);
    }

    if (dto.legalCase !== undefined) {
      const currentLegalCaseDocuments =
        medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisDocument.filter(
          (value) =>
            value.type ===
            MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum.LEGAL_CASE,
        );

      const legalCaseDocumentsTransactions =
        await this.updateLegalCaseDocumentsOnDatabase(
          medicalAndSocialReportObjectionGeneratorAnalysis,
          currentLegalCaseDocuments,
          dto.legalCase,
        );
      transactions.push(...legalCaseDocumentsTransactions);
    }

    const medicalAndSocialReportObjectionGeneratorAnalysisTransaction =
      this.medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway.updateMedicalAndSocialReportObjectionGeneratorAnalysis(
        medicalAndSocialReportObjectionGeneratorAnalysis.id,
        medicalAndSocialReportObjectionGeneratorAnalysis,
      );
    transactions.push(
      medicalAndSocialReportObjectionGeneratorAnalysisTransaction,
    );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );
    transactions.push(analysisToolRecordTransaction);

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await executeTransactions.commit();

    return UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto.build(
      {
        medicalAndSocialReportObjectionGeneratorAnalysisId,
      },
    );
  }

  private async updateMedicalExpertReportDocumentsOnDatabase(
    medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
    currentMedicalExpertReportDocuments: GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult[],
    newMedicalExpertReportDocuments: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteCurrent = currentMedicalExpertReportDocuments.map((value) => {
      return this.medicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway.deleteMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
        new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId(
          value.id.toString(),
        ),
      );
    });

    const medicalExpertReportDocumentFiles = await Promise.all(
      newMedicalExpertReportDocuments.map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = medicalExpertReportDocumentFiles.map((value) => {
      const entity =
        new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity({
          document: value,
          type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum.MEDICAL_EXPERT_REPORT,
          medicalAndSocialReportObjectionGeneratorAnalysis,
        });

      return this.medicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private async updateLegalCaseDocumentsOnDatabase(
    medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
    currentLegalCaseDocuments: GetMedicalAndSocialReportObjectionGeneratorAnalysisDocumentQueryResult[],
    newLegalCaseDocuments: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteCurrent = currentLegalCaseDocuments.map((value) => {
      return this.medicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway.deleteMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
        new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentId(
          value.id.toString(),
        ),
      );
    });

    const legalCaseDocumentFiles = await Promise.all(
      newLegalCaseDocuments.map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = legalCaseDocumentFiles.map((value) => {
      const entity =
        new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity({
          document: value,
          type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum.LEGAL_CASE,
          medicalAndSocialReportObjectionGeneratorAnalysis,
        });

      return this.medicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateInssBenefitNumberOnDatabase(
    medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
    currentInssBenefitNumber: GetMedicalAndSocialReportObjectionGeneratorAnalysisBenefitQueryResult[],
    newInssBenefitNumber: string[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.medicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway.deleteMedicalAndSocialReportObjectionGeneratorAnalysisBenefit(
        new MedicalAndSocialReportObjectionGeneratorAnalysisBenefitId(
          value.id.toString(),
        ),
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity =
        new MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity({
          inssBenefitNumber: value,
          medicalAndSocialReportObjectionGeneratorAnalysis,
        });

      return this.medicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
    currentLegalProceedingNumber: GetMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingQueryResult[],
    newLegalProceeding: string[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway.deleteMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding(
        new MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingId(
          value.id.toString(),
        ),
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity =
        new MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity(
          {
            legalProceedingNumber: value,
            medicalAndSocialReportObjectionGeneratorAnalysis,
          },
        );

      return this.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
