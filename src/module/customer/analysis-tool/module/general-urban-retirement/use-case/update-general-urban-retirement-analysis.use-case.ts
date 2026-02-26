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
import { GeneralUrbanRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/command/general-urban-retirement-analysis.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/command/general-urban-retirement-analysis-document.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-legal-proceeding/command/general-urban-retirement-analysis-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/enum/general-urban-retirement-analysis-document-type.enum';
import { GeneralUrbanRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/general-urban-retirement-analysis-document.entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/general-urban-retirement-analysis-legal-proceeding.entity';
import { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import { UpdateGeneralUrbanRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/update-general-urban-retirement-analysis.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/update-general-urban-retirement-analysis.response.dto';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateGeneralUrbanRetirementAnalysisUseCase {
  protected readonly _type = UpdateGeneralUrbanRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisCommandRepositoryGateway: GeneralUrbanRetirementAnalysisCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisDocumentCommandRepositoryGateway: GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway,
    @Inject(
      GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway,
    )
    private readonly generalUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway: GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    dto: UpdateGeneralUrbanRetirementAnalysisRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisQueryResult =
      await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdWithRelationsOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const recordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        GeneralUrbanRetirementAnalysisNotFoundError,
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

    const generalUrbanRetirementAnalysisResult =
      analysisQueryResult.generalUrbanRetirementAnalysisResult
        ? new GeneralUrbanRetirementAnalysisResultEntity({
            id: analysisQueryResult.generalUrbanRetirementAnalysisResult.id,
            generalUrbanRetirementCompleteAnalysis:
              analysisQueryResult.generalUrbanRetirementAnalysisResult
                .generalUrbanRetirementCompleteAnalysis,
            generalUrbanRetirementSimplifiedAnalysis:
              analysisQueryResult.generalUrbanRetirementAnalysisResult
                .generalUrbanRetirementSimplifiedAnalysis,
          })
        : null;

    const generalUrbanRetirementAnalysis =
      new GeneralUrbanRetirementAnalysisEntity({
        id: analysisQueryResult.id,
        careerStartDate: dto.json.careerStartDate,
        publicServiceStartDate: dto.json.publicServiceStartDate,
        generalUrbanRetirementAnalysisResult,
        generalUrbanRetirementBenefitAnalysis:
          dto.json.generalUrbanRetirementBenefitAnalysis ??
          analysisQueryResult.generalUrbanRetirementBenefitAnalysis,
        federativeEntity:
          dto.json.federativeEntity ??
          analysisQueryResult.federativeEntity ??
          null,
        state: dto.json.state ?? analysisQueryResult.state ?? null,
        municipality:
          dto.json.municipality ?? analysisQueryResult.municipality ?? null,
        name: dto.json.name ?? analysisQueryResult.name ?? null,
        benefitType:
          dto.json.benefitType ?? analysisQueryResult.benefitType ?? null,
      });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: recordQueryResult.id,
      code: recordQueryResult.code,
      type: recordQueryResult.type,
      generalUrbanRetirementAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: recordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transactionOperations: TransactionType[] = [];

    if (dto.certificateContributionPeriodFiles !== undefined) {
      for (const doc of analysisQueryResult.documents) {
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisDocumentCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisDocument(
            doc.id,
          ),
        );
      }
      const certificateContributionPeriodFiles = await Promise.all(
        dto.certificateContributionPeriodFiles.map((file: FileModel) =>
          this.fileProcessorGateway.uploadFile(file),
        ),
      );
      for (const documentUrl of certificateContributionPeriodFiles) {
        const documentEntity = new GeneralUrbanRetirementAnalysisDocumentEntity(
          {
            document: documentUrl,
            type: GeneralUrbanRetirementAnalysisDocumentTypeEnum.CERTIFICATE_CONTRIBUTION_PERIOD,
            generalUrbanRetirementAnalysisId,
          },
        );
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisDocumentCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisDocument(
            documentEntity,
          ),
        );
      }
    }

    if (dto.json.legalProceedingNumber !== undefined) {
      for (const legalProceeding of analysisQueryResult.legalProceedings) {
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisLegalProceeding(
            legalProceeding.id,
          ),
        );
      }
      if (dto.json.legalProceedingNumber.trim() !== '') {
        const legalProceedingEntity =
          new GeneralUrbanRetirementAnalysisLegalProceedingEntity({
            legalProceeding: dto.json.legalProceedingNumber,
            generalUrbanRetirementAnalysis,
          });
        transactionOperations.push(
          this.generalUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisLegalProceeding(
            legalProceedingEntity,
          ),
        );
      }
    }

    transactionOperations.push(
      this.generalUrbanRetirementAnalysisCommandRepositoryGateway.updateGeneralUrbanRetirementAnalysis(
        generalUrbanRetirementAnalysisId,
        generalUrbanRetirementAnalysis,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateGeneralUrbanRetirementAnalysisResponseDto.build({
      generalUrbanRetirementAnalysisId,
    });
  }
}
