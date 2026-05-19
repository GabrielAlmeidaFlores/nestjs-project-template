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
import { GeneralUrbanRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/command/general-urban-retirement-analysis.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/command/general-urban-retirement-analysis-document.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-legal-proceeding/command/general-urban-retirement-analysis-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/enum/general-urban-retirement-analysis-document-type.enum';
import { GeneralUrbanRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/general-urban-retirement-analysis-document.entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/general-urban-retirement-analysis-legal-proceeding.entity';
import { CreateGeneralUrbanRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/create-general-urban-retirement-analysis.request.dto';
import { CreateGeneralUrbanRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/create-general-urban-retirement-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementAnalysisUseCase {
  protected readonly _type = CreateGeneralUrbanRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisCommandRepositoryGateway: GeneralUrbanRetirementAnalysisCommandRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway,
    )
    private readonly generalUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway: GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisDocumentCommandRepositoryGateway: GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateGeneralUrbanRetirementAnalysisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const certificateContributionPeriodFiles = await Promise.all(
      dto.certificateContributionPeriodFiles !== undefined
        ? dto.certificateContributionPeriodFiles.map(async (value) => {
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

    const generalUrbanRetirementAnalysis =
      new GeneralUrbanRetirementAnalysisEntity({
        careerStartDate: dto.json.careerStartDate ?? null,
        publicServiceStartDate: dto.json.publicServiceStartDate ?? null,
        generalUrbanRetirementBenefitAnalysis:
          dto.json.generalUrbanRetirementBenefitAnalysis ?? null,
        federativeEntity: dto.json.federativeEntity ?? null,
        state: dto.json.state ?? null,
        municipality: dto.json.municipality ?? null,
        name: dto.json.name ?? null,
        benefitType: dto.json.benefitType,
        currentPosition: dto.json.currentPosition ?? null,
      });

    const generalUrbanRetirementAnalysisLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? new GeneralUrbanRetirementAnalysisLegalProceedingEntity({
            legalProceeding: dto.json.legalProceedingNumber,
            generalUrbanRetirementAnalysis,
          })
        : null;

    const generalUrbanRetirementAnalysisCertificateContributionPeriodDocuments =
      certificateContributionPeriodFiles.map((value) => {
        return new GeneralUrbanRetirementAnalysisDocumentEntity({
          document: value,
          type: GeneralUrbanRetirementAnalysisDocumentTypeEnum.CERTIFICATE_CONTRIBUTION_PERIOD,
          generalUrbanRetirementAnalysisId: generalUrbanRetirementAnalysis.id,
        });
      });

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.GENERAL_URBAN_RETIREMENT_ANALYSIS,
      generalUrbanRetirementAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      generalUrbanRetirementAnalysis,
      generalUrbanRetirementAnalysisLegalProceeding,
      analysisToolRecord,
      generalUrbanRetirementAnalysisCertificateContributionPeriodDocuments,
    );

    return CreateGeneralUrbanRetirementAnalysisResponseDto.build({
      generalUrbanRetirementAnalysisId: generalUrbanRetirementAnalysis.id,
    });
  }

  private async createOnDatabase(
    generalUrbanRetirementAnalysis: GeneralUrbanRetirementAnalysisEntity,
    generalUrbanRetirementAnalysisLegalProceeding: GeneralUrbanRetirementAnalysisLegalProceedingEntity | null,
    analysisToolRecord: AnalysisToolRecordEntity,
    generalUrbanRetirementAnalysisDocuments: GeneralUrbanRetirementAnalysisDocumentEntity[],
  ): Promise<void> {
    const generalUrbanRetirementAnalysisLegalProceedingTransaction =
      generalUrbanRetirementAnalysisLegalProceeding !== null
        ? this.generalUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisLegalProceeding(
            generalUrbanRetirementAnalysisLegalProceeding,
          )
        : null;

    const generalUrbanRetirementAnalysisDocumentsTransaction =
      generalUrbanRetirementAnalysisDocuments.map((value) => {
        return this.generalUrbanRetirementAnalysisDocumentCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisDocument(
          value,
        );
      });

    const generalUrbanRetirementAnalysisTransaction =
      this.generalUrbanRetirementAnalysisCommandRepositoryGateway.createGeneralUrbanRetirementAnalysis(
        generalUrbanRetirementAnalysis,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      generalUrbanRetirementAnalysisTransaction,
      ...(generalUrbanRetirementAnalysisLegalProceedingTransaction !== null
        ? [generalUrbanRetirementAnalysisLegalProceedingTransaction]
        : []),
      ...generalUrbanRetirementAnalysisDocumentsTransaction,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
