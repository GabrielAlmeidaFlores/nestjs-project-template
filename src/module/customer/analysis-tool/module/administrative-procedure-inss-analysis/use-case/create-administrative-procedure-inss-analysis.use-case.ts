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
import { AdministrativeProcedureInssAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/command/administrative-procedure-inss-analysis.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-benefit/command/administrative-procedure-inss-analysis-benefit.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-document/command/administrative-procedure-inss-analysis-document.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-legal-proceeding/command/administrative-procedure-inss-analysis-legal-proceeding.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/enum/administrative-procedure-inss-analysis-document-type.enum';
import { AdministrativeProcedureInssAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { CreateAdministrativeProcedureInssAnalysisRequestDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/request/create-administrative-procedure-inss-analysis.request.dto';
import { CreateAdministrativeProcedureInssAnalysisResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/create-administrative-procedure-inss-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAdministrativeProcedureInssAnalysisUseCase {
  protected readonly _type =
    CreateAdministrativeProcedureInssAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisCommandRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisCommandRepositoryGateway: AdministrativeProcedureInssAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisBenefitCommandRepositoryGateway: AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway,
    @Inject(AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisDocumentCommandRepositoryGateway: AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway,
    @Inject(
      AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway,
    )
    private readonly administrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway: AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway,
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
    dto: CreateAdministrativeProcedureInssAnalysisRequestDto,
  ): Promise<CreateAdministrativeProcedureInssAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const administrativeProcedureDocumentFiles = await Promise.all(
      dto.administrativeProcedureDocument !== undefined
        ? dto.administrativeProcedureDocument.map(async (value) => {
            return await this.fileProcessorGateway.uploadFile(value);
          })
        : [],
    );

    const crpsAdministrativeAppealFileFiles = await Promise.all(
      dto.crpsAdministrativeAppeal !== undefined
        ? dto.crpsAdministrativeAppeal.map(async (value) => {
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

    const administrativeProcedureInssAnalysis =
      new AdministrativeProcedureInssAnalysisEntity({
        createdBy: organizationMember.id,
        updatedBy: organizationMember.id,
      });

    const administrativeProcedureInssAnalysisBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new AdministrativeProcedureInssAnalysisBenefitEntity({
              inssBenefitNumber: value,
              administrativeProcedureInssAnalysis,
            });
          })
        : [];

    const administrativeProcedureInssAnalysisLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new AdministrativeProcedureInssAnalysisLegalProceedingEntity(
              {
                legalProceedingNumber: value,
                administrativeProcedureInssAnalysis,
              },
            );
          })
        : [];

    const administrativeProcedureDocuments =
      administrativeProcedureDocumentFiles.map((value) => {
        return new AdministrativeProcedureInssAnalysisDocumentEntity({
          document: value,
          type: AdministrativeProcedureInssAnalysisDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
          administrativeProcedureInssAnalysis,
        });
      });

    const crpsAdministrativeAppealDocuments =
      crpsAdministrativeAppealFileFiles.map((value) => {
        return new AdministrativeProcedureInssAnalysisDocumentEntity({
          document: value,
          type: AdministrativeProcedureInssAnalysisDocumentTypeEnum.CRPS,
          administrativeProcedureInssAnalysis,
        });
      });

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS,
      administrativeProcedureInssAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      administrativeProcedureInssAnalysis,
      administrativeProcedureInssAnalysisBenefit,
      administrativeProcedureInssAnalysisLegalProceeding,
      analysisToolRecord,
      administrativeProcedureDocuments,
      crpsAdministrativeAppealDocuments,
    );

    return CreateAdministrativeProcedureInssAnalysisResponseDto.build({
      administrativeProcedureInssAnalysisId:
        administrativeProcedureInssAnalysis.id,
    });
  }

  private async createOnDatabase(
    administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity,
    administrativeProcedureInssAnalysisBenefit: AdministrativeProcedureInssAnalysisBenefitEntity[],
    administrativeProcedureInssAnalysisLegalProceeding: AdministrativeProcedureInssAnalysisLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
    administrativeProcedureDocuments: AdministrativeProcedureInssAnalysisDocumentEntity[],
    crpsAdministrativeAppealDocuments: AdministrativeProcedureInssAnalysisDocumentEntity[],
  ): Promise<void> {
    const administrativeProcedureInssAnalysisBenefitTransaction =
      administrativeProcedureInssAnalysisBenefit.map((value) => {
        return this.administrativeProcedureInssAnalysisBenefitCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisBenefit(
          value,
        );
      });

    const administrativeProcedureInssAnalysisLegalProceedingTransaction =
      administrativeProcedureInssAnalysisLegalProceeding.map((value) => {
        return this.administrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisLegalProceeding(
          value,
        );
      });

    const allAdministrativeProcedureInssAnalysisDocuments = [
      ...administrativeProcedureDocuments,
      ...crpsAdministrativeAppealDocuments,
    ].map((value) => {
      return this.administrativeProcedureInssAnalysisDocumentCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisDocument(
        value,
      );
    });

    const administrativeProcedureInssAnalysisTransaction =
      this.administrativeProcedureInssAnalysisCommandRepositoryGateway.createAdministrativeProcedureInssAnalysis(
        administrativeProcedureInssAnalysis,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType:
          AnalysisToolRecordTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: [
          administrativeProcedureInssAnalysisTransaction,
          ...administrativeProcedureInssAnalysisBenefitTransaction,
          ...administrativeProcedureInssAnalysisLegalProceedingTransaction,
          ...allAdministrativeProcedureInssAnalysisDocuments,
          analysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();
  }
}
