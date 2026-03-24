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
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AdministrativeProcedureInssAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/command/administrative-procedure-inss-analysis.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/administrative-procedure-inss-analysis.query.repository.gateway';
import { GetAdministrativeProcedureInssAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-benefit.query.result';
import { GetAdministrativeProcedureInssAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-document.query.result';
import { GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis-legal-proceeding.query.result';
import { AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-benefit/command/administrative-procedure-inss-analysis-benefit.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-document/command/administrative-procedure-inss-analysis-document.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-legal-proceeding/command/administrative-procedure-inss-analysis-legal-proceeding.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { AdministrativeProcedureInssAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisBenefitId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/value-object/administrative-procedure-inss-analysis-benefit-id/administrative-procedure-inss-analysis-benefit-id.value-object';
import { AdministrativeProcedureInssAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/enum/administrative-procedure-inss-analysis-document-type.enum';
import { AdministrativeProcedureInssAnalysisDocumentId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/value-object/administrative-procedure-inss-analysis-document-id/administrative-procedure-inss-analysis-document-id.value-object';
import { AdministrativeProcedureInssAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/value-object/administrative-procedure-inss-analysis-legal-proceeding-id/administrative-procedure-inss-analysis-legal-proceeding-id.value-object';
import { UpdateAdministrativeProcedureInssAnalysisRequestDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/request/update-administrative-procedure-inss-analysis.request.dto';
import { UpdateAdministrativeProcedureInssAnalysisResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/update-administrative-procedure-inss-analysis.response.dto';
import { AdministrativeProcedureInssAnalysisNotFoundError } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/error/administrative-procedure-inss-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateAdministrativeProcedureInssAnalysisUseCase {
  protected readonly _type =
    UpdateAdministrativeProcedureInssAnalysisUseCase.name;

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
    @Inject(AdministrativeProcedureInssAnalysisQueryRepositoryGateway)
    private readonly administrativeProcedureInssAnalysisQueryRepositoryGateway: AdministrativeProcedureInssAnalysisQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
    dto: UpdateAdministrativeProcedureInssAnalysisRequestDto,
  ): Promise<UpdateAdministrativeProcedureInssAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const administrativeProcedureInssAnalysisQueryResult =
      await this.administrativeProcedureInssAnalysisQueryRepositoryGateway.findOneByAdministrativeProcedureInssAnalysisIdAndOrganizationIdOrFail(
        administrativeProcedureInssAnalysisId,
        organizationSessionData.organizationId,
        AdministrativeProcedureInssAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAdministrativeProcedureInssAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        administrativeProcedureInssAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AdministrativeProcedureInssAnalysisNotFoundError,
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

    const administrativeProcedureInssAnalysis =
      new AdministrativeProcedureInssAnalysisEntity({
        id: administrativeProcedureInssAnalysisQueryResult.id,
        createdBy: administrativeProcedureInssAnalysisQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      administrativeProcedureInssAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          administrativeProcedureInssAnalysis,
          administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisBenefit,
          dto.json.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          administrativeProcedureInssAnalysis,
          administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisLegalProceeding,
          dto.json.legalProceedingNumber,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    if (dto.administrativeProcedureDocument !== undefined) {
      const currentAdministrativeProcedureDocuments =
        administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisDocument.filter(
          (value) =>
            value.type ===
            AdministrativeProcedureInssAnalysisDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
        );

      const administrativeProcedureDocumentsTransactions =
        await this.updateAdministrativeProcedureDocumentsOnDatabase(
          administrativeProcedureInssAnalysis,
          currentAdministrativeProcedureDocuments,
          dto.administrativeProcedureDocument,
        );
      transactions.push(...administrativeProcedureDocumentsTransactions);
    }

    if (dto.crpsAdministrativeAppeal !== undefined) {
      const currentCrpsAdministrativeAppealDocuments =
        administrativeProcedureInssAnalysisQueryResult.administrativeProcedureInssAnalysisDocument.filter(
          (value) =>
            value.type ===
            AdministrativeProcedureInssAnalysisDocumentTypeEnum.CRPS,
        );

      const crpsAdministrativeAppealDocumentsTransactions =
        await this.updateCrpsAdministrativeAppealDocumentsOnDatabase(
          administrativeProcedureInssAnalysis,
          currentCrpsAdministrativeAppealDocuments,
          dto.crpsAdministrativeAppeal,
        );
      transactions.push(...crpsAdministrativeAppealDocumentsTransactions);
    }

    const administrativeProcedureInssAnalysisTransaction =
      this.administrativeProcedureInssAnalysisCommandRepositoryGateway.updateAdministrativeProcedureInssAnalysis(
        administrativeProcedureInssAnalysis.id,
        administrativeProcedureInssAnalysis,
      );
    transactions.push(administrativeProcedureInssAnalysisTransaction);

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );
    transactions.push(analysisToolRecordTransaction);

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType:
          AnalysisToolRecordTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS,
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

    return UpdateAdministrativeProcedureInssAnalysisResponseDto.build({
      administrativeProcedureInssAnalysisId,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity,
    currentInssBenefitNumber: GetAdministrativeProcedureInssAnalysisBenefitQueryResult[],
    newInssBenefitNumber: string[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.administrativeProcedureInssAnalysisBenefitCommandRepositoryGateway.deleteAdministrativeProcedureInssAnalysisBenefit(
        new AdministrativeProcedureInssAnalysisBenefitId(value.id.toString()),
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new AdministrativeProcedureInssAnalysisBenefitEntity({
        inssBenefitNumber: value,
        administrativeProcedureInssAnalysis,
      });

      return this.administrativeProcedureInssAnalysisBenefitCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private async updateAdministrativeProcedureDocumentsOnDatabase(
    administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity,
    currentAdministrativeProcedureDocuments: GetAdministrativeProcedureInssAnalysisDocumentQueryResult[],
    newAdministrativeProcedureDocuments: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteCurrent = currentAdministrativeProcedureDocuments.map(
      (value) => {
        return this.administrativeProcedureInssAnalysisDocumentCommandRepositoryGateway.deleteAdministrativeProcedureInssAnalysisDocument(
          new AdministrativeProcedureInssAnalysisDocumentId(
            value.id.toString(),
          ),
        );
      },
    );

    const administrativeProcedureDocumentFiles = await Promise.all(
      newAdministrativeProcedureDocuments.map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = administrativeProcedureDocumentFiles.map((value) => {
      const entity = new AdministrativeProcedureInssAnalysisDocumentEntity({
        document: value,
        type: AdministrativeProcedureInssAnalysisDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
        administrativeProcedureInssAnalysis,
      });

      return this.administrativeProcedureInssAnalysisDocumentCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private async updateCrpsAdministrativeAppealDocumentsOnDatabase(
    administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity,
    currentCrpsAdministrativeAppealDocuments: GetAdministrativeProcedureInssAnalysisDocumentQueryResult[],
    newCrpsAdministrativeAppealDocuments: FileModel[],
  ): Promise<TransactionType[]> {
    const deleteCurrent = currentCrpsAdministrativeAppealDocuments.map(
      (value) => {
        return this.administrativeProcedureInssAnalysisDocumentCommandRepositoryGateway.deleteAdministrativeProcedureInssAnalysisDocument(
          new AdministrativeProcedureInssAnalysisDocumentId(
            value.id.toString(),
          ),
        );
      },
    );

    const crpsAdministrativeAppealDocumentFiles = await Promise.all(
      newCrpsAdministrativeAppealDocuments.map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = crpsAdministrativeAppealDocumentFiles.map((value) => {
      const entity = new AdministrativeProcedureInssAnalysisDocumentEntity({
        document: value,
        type: AdministrativeProcedureInssAnalysisDocumentTypeEnum.CRPS,
        administrativeProcedureInssAnalysis,
      });

      return this.administrativeProcedureInssAnalysisDocumentCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    administrativeProcedureInssAnalysis: AdministrativeProcedureInssAnalysisEntity,
    currentLegalProceedingNumber: GetAdministrativeProcedureInssAnalysisLegalProceedingQueryResult[],
    newLegalProceeding: string[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.administrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway.deleteAdministrativeProcedureInssAnalysisLegalProceeding(
        new AdministrativeProcedureInssAnalysisLegalProceedingId(
          value.id.toString(),
        ),
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity =
        new AdministrativeProcedureInssAnalysisLegalProceedingEntity({
          legalProceedingNumber: value,
          administrativeProcedureInssAnalysis,
        });

      return this.administrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway.createAdministrativeProcedureInssAnalysisLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
