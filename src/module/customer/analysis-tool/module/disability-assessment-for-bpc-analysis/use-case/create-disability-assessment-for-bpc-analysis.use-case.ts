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
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/command/disability-assessment-for-bpc-analysis.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-benefit/command/disability-assessment-for-bpc-analysis-benefit.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-document/command/disability-assessment-for-bpc-analysis-document.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-legal-proceeding/command/disability-assessment-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/enum/disability-assessment-for-bpc-analysis-document-type.enum';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { CreateDisabilityAssessmentForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/request/create-disability-assessment-for-bpc-analysis.request.dto';
import { CreateDisabilityAssessmentForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/create-disability-assessment-for-bpc-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateDisabilityAssessmentForBpcAnalysisUseCase {
  protected readonly _type =
    CreateDisabilityAssessmentForBpcAnalysisUseCase.name;

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
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateDisabilityAssessmentForBpcAnalysisRequestDto,
  ): Promise<CreateDisabilityAssessmentForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const medicalAndSocialDocumentFiles = await Promise.all(
      dto.medicalAndSocialDocuments !== undefined
        ? dto.medicalAndSocialDocuments.map(async (value) => {
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

    const disabilityAssessmentForBpcAnalysis =
      new DisabilityAssessmentForBpcAnalysisEntity({
        estimatedDisabilityStartDate:
          dto.json.estimatedDisabilityStartDate ?? null,
        attendsSchoolOrTechnicalCourse:
          dto.json.attendsSchoolOrTechnicalCourse ?? null,
        performsLaborActivity: dto.json.performsLaborActivity ?? null,
        needsThirdPartyHelp: dto.json.needsThirdPartyHelp ?? null,
        hasAccessToBasicServices: dto.json.hasAccessToBasicServices ?? null,
        otherBarriersDescription: dto.json.otherBarriersDescription ?? null,
        createdBy: organizationMember.id,
        updatedBy: organizationMember.id,
      });

    const disabilityAssessmentForBpcAnalysisBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new DisabilityAssessmentForBpcAnalysisBenefitEntity({
              inssBenefitNumber: value,
              disabilityAssessmentForBpcAnalysis,
            });
          })
        : [];

    const disabilityAssessmentForBpcAnalysisLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new DisabilityAssessmentForBpcAnalysisLegalProceedingEntity({
              legalProceedingNumber: value,
              disabilityAssessmentForBpcAnalysis,
            });
          })
        : [];

    const medicalAndSocialDocuments = medicalAndSocialDocumentFiles.map(
      (value) => {
        return new DisabilityAssessmentForBpcAnalysisDocumentEntity({
          document: value,
          type: DisabilityAssessmentForBpcAnalysisDocumentTypeEnum.MEDICAL_AND_SOCIAL_DOCUMENTS,
          disabilityAssessmentForBpcAnalysis,
        });
      },
    );

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.DISABILITY_ASSESSMENT_FOR_BPC_ANALYSIS,
      disabilityAssessmentForBpcAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
      administrativeProcedureInssAnalysis: null,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      judicialCaseAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
    });

    await this.createOnDatabase(
      disabilityAssessmentForBpcAnalysis,
      disabilityAssessmentForBpcAnalysisBenefit,
      disabilityAssessmentForBpcAnalysisLegalProceeding,
      analysisToolRecord,
      medicalAndSocialDocuments,
    );

    return CreateDisabilityAssessmentForBpcAnalysisResponseDto.build({
      disabilityAssessmentForBpcAnalysisId:
        disabilityAssessmentForBpcAnalysis.id,
    });
  }

  private async createOnDatabase(
    disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity,
    disabilityAssessmentForBpcAnalysisBenefit: DisabilityAssessmentForBpcAnalysisBenefitEntity[],
    disabilityAssessmentForBpcAnalysisLegalProceeding: DisabilityAssessmentForBpcAnalysisLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
    medicalAndSocialDocuments: DisabilityAssessmentForBpcAnalysisDocumentEntity[],
  ): Promise<void> {
    const disabilityAssessmentForBpcAnalysisBenefitTransaction =
      disabilityAssessmentForBpcAnalysisBenefit.map((value) => {
        return this.disabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysisBenefit(
          value,
        );
      });

    const disabilityAssessmentForBpcAnalysisLegalProceedingTransaction =
      disabilityAssessmentForBpcAnalysisLegalProceeding.map((value) => {
        return this.disabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysisLegalProceeding(
          value,
        );
      });

    const allDisabilityAssessmentForBpcAnalysisDocuments =
      medicalAndSocialDocuments.map((value) => {
        return this.disabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysisDocument(
          value,
        );
      });

    const disabilityAssessmentForBpcAnalysisTransaction =
      this.disabilityAssessmentForBpcAnalysisCommandRepositoryGateway.createDisabilityAssessmentForBpcAnalysis(
        disabilityAssessmentForBpcAnalysis,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      disabilityAssessmentForBpcAnalysisTransaction,
      ...disabilityAssessmentForBpcAnalysisBenefitTransaction,
      ...disabilityAssessmentForBpcAnalysisLegalProceedingTransaction,
      ...allDisabilityAssessmentForBpcAnalysisDocuments,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
