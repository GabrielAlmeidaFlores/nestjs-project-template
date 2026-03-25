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
import { MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/command/medical-and-social-report-objection-generator-analysis.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-benefit/command/medical-and-social-report-objection-generator-analysis-benefit.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-document/command/medical-and-social-report-objection-generator-analysis-document.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis-legal-proceeding/command/medical-and-social-report-objection-generator-analysis-legal-proceeding.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/medical-and-social-report-objection-generator-analysis.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-benefit/medical-and-social-report-objection-generator-analysis-benefit.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/enum/medical-and-social-report-objection-generator-analysis-document-type.enum';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-document/medical-and-social-report-objection-generator-analysis-document.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis-legal-proceeding/medical-and-social-report-objection-generator-analysis-legal-proceeding.entity';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/request/create-medical-and-social-report-objection-generator-analysis.request.dto';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/create-medical-and-social-report-objection-generator-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase {
  protected readonly _type =
    CreateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
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
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto,
  ): Promise<CreateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const medicalExpertReportFiles = await Promise.all(
      dto.medicalExpertReport !== undefined
        ? dto.medicalExpertReport.map(async (value) => {
            return await this.fileProcessorGateway.uploadFile(value);
          })
        : [],
    );

    const legalCaseFiles = await Promise.all(
      dto.legalCase !== undefined
        ? dto.legalCase.map(async (value) => {
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

    const medicalAndSocialReportObjectionGeneratorAnalysis =
      new MedicalAndSocialReportObjectionGeneratorAnalysisEntity({
        createdBy: organizationMember.id,
        updatedBy: organizationMember.id,
      });

    const medicalAndSocialReportObjectionGeneratorAnalysisBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity(
              {
                inssBenefitNumber: value,
                medicalAndSocialReportObjectionGeneratorAnalysis,
              },
            );
          })
        : [];

    const medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity(
              {
                legalProceedingNumber: value,
                medicalAndSocialReportObjectionGeneratorAnalysis,
              },
            );
          })
        : [];

    const medicalExpertReportDocuments = medicalExpertReportFiles.map(
      (value) => {
        return new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity(
          {
            document: value,
            type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum.MEDICAL_EXPERT_REPORT,
            medicalAndSocialReportObjectionGeneratorAnalysis,
          },
        );
      },
    );

    const legalCaseDocuments = legalCaseFiles.map((value) => {
      return new MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity(
        {
          document: value,
          type: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentTypeEnum.LEGAL_CASE,
          medicalAndSocialReportObjectionGeneratorAnalysis,
        },
      );
    });

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS,
      medicalAndSocialReportObjectionGeneratorAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      medicalAndSocialReportObjectionGeneratorAnalysis,
      analysisToolRecord,
      medicalAndSocialReportObjectionGeneratorAnalysisBenefit,
      medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding,
      medicalExpertReportDocuments,
      legalCaseDocuments,
    );

    return CreateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto.build(
      {
        medicalAndSocialReportObjectionGeneratorAnalysisId:
          medicalAndSocialReportObjectionGeneratorAnalysis.id,
      },
    );
  }

  private async createOnDatabase(
    medicalAndSocialReportObjectionGeneratorAnalysis: MedicalAndSocialReportObjectionGeneratorAnalysisEntity,
    analysisToolRecord: AnalysisToolRecordEntity,
    medicalAndSocialReportObjectionGeneratorAnalysisBenefit: MedicalAndSocialReportObjectionGeneratorAnalysisBenefitEntity[],
    medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding: MedicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingEntity[],
    medicalExpertReportDocuments: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity[],
    legalCaseDocuments: MedicalAndSocialReportObjectionGeneratorAnalysisDocumentEntity[],
  ): Promise<void> {
    const allMedicalAndSocialReportObjectionGeneratorAnalysisDocuments = [
      ...medicalExpertReportDocuments,
      ...legalCaseDocuments,
    ].map((value) => {
      return this.medicalAndSocialReportObjectionGeneratorAnalysisDocumentCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisDocument(
        value,
      );
    });

    const medicalAndSocialReportObjectionGeneratorAnalysisBenefitTransactions =
      medicalAndSocialReportObjectionGeneratorAnalysisBenefit.map((value) => {
        return this.medicalAndSocialReportObjectionGeneratorAnalysisBenefitCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisBenefit(
          value,
        );
      });

    const medicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTransactions =
      medicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding.map(
        (value) => {
          return this.medicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysisLegalProceeding(
            value,
          );
        },
      );

    const medicalAndSocialReportObjectionGeneratorAnalysisTransaction =
      this.medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway.createMedicalAndSocialReportObjectionGeneratorAnalysis(
        medicalAndSocialReportObjectionGeneratorAnalysis,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType:
          AnalysisToolRecordTypeEnum.MEDICAL_AND_SOCIAL_REPORT_OBJECTION_GENERATOR_ANALYSIS,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: [
          medicalAndSocialReportObjectionGeneratorAnalysisTransaction,
          ...allMedicalAndSocialReportObjectionGeneratorAnalysisDocuments,
          ...medicalAndSocialReportObjectionGeneratorAnalysisBenefitTransactions,
          ...medicalAndSocialReportObjectionGeneratorAnalysisLegalProceedingTransactions,
          analysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();
  }
}
