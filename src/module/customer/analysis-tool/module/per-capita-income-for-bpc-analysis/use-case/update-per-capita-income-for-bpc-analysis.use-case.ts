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
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/per-capita-income-for-bpc-analysis.query.repository.gateway';
import { GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-with-relations.query.result';
import { PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-benefit/command/per-capita-income-for-bpc-analysis-benefit.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-document/command/per-capita-income-for-bpc-analysis-document.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-legal-proceeding/command/per-capita-income-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/value-object/per-capita-income-for-bpc-analysis-benefit-id/per-capita-income-for-bpc-analysis-benefit-id.value-object';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/enum/per-capita-income-for-bpc-analysis-document-type.enum';
import { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/value-object/per-capita-income-for-bpc-analysis-document-id/per-capita-income-for-bpc-analysis-document-id.value-object';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/value-object/per-capita-income-for-bpc-analysis-legal-proceeding-id/per-capita-income-for-bpc-analysis-legal-proceeding-id.value-object';
import { UpdatePerCapitaIncomeForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/update-per-capita-income-for-bpc-analysis.request.dto';
import { UpdatePerCapitaIncomeForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/update-per-capita-income-for-bpc-analysis.response.dto';
import { PerCapitaIncomeForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdatePerCapitaIncomeForBpcAnalysisUseCase {
  protected readonly _type = UpdatePerCapitaIncomeForBpcAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisQueryRepositoryGateway: PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway,
    @Inject(
      PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway,
    )
    private readonly perCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    updatePerCapitaIncomeForBpcAnalysisRequestDto: UpdatePerCapitaIncomeForBpcAnalysisRequestDto,
  ): Promise<UpdatePerCapitaIncomeForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    const currentPerCapitaIncomeForBpcAnalysisQueryResult =
      await this.perCapitaIncomeForBpcAnalysisQueryRepositoryGateway.findOneByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    // Create the main entity once with updatedBy from organization member
    const perCapitaIncomeForBpcAnalysis =
      new PerCapitaIncomeForBpcAnalysisEntity({
        id: currentPerCapitaIncomeForBpcAnalysisQueryResult.id,
        createdBy: analysisToolRecordQueryResult.createdBy.id,
        updatedBy: organizationMember.id,
      });

    const transactions: TransactionType[] = [];

    // Update analysis tool client if provided
    const analysisToolClientId =
      updatePerCapitaIncomeForBpcAnalysisRequestDto.json?.analysisToolClientId;

    if (analysisToolClientId !== undefined) {
      const analysisToolClientQueryResult =
        await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
          analysisToolClientId,
          organizationSessionData.organizationId,
          AnalysisToolClientNotFoundError,
        );

      const analysisToolClient = new AnalysisToolClientEntity({
        ...analysisToolClientQueryResult,
        createdBy: analysisToolClientQueryResult.createdBy.id,
        updatedBy: analysisToolClientQueryResult.updatedBy.id,
      });

      const analysisToolRecord = new AnalysisToolRecordEntity({
        id: analysisToolRecordQueryResult.id,
        code: analysisToolRecordQueryResult.code,
        type: analysisToolRecordQueryResult.type,
        perCapitaIncomeForBpcAnalysis,
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

      const updateAnalysisToolRecordTransaction =
        this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
          analysisToolRecordQueryResult.id,
          analysisToolRecord,
        );

      transactions.push(updateAnalysisToolRecordTransaction);
    }

    // Update documents
    const documentsTransactions = await this.updateDocumentsOnDatabase(
      perCapitaIncomeForBpcAnalysis,
      currentPerCapitaIncomeForBpcAnalysisQueryResult,
      updatePerCapitaIncomeForBpcAnalysisRequestDto,
    );

    transactions.push(...documentsTransactions);

    // Update INSS benefits
    const inssBenefitNumberTransactions =
      this.updateInssBenefitNumberOnDatabase(
        perCapitaIncomeForBpcAnalysis,
        currentPerCapitaIncomeForBpcAnalysisQueryResult,
        updatePerCapitaIncomeForBpcAnalysisRequestDto.json?.inssBenefitNumber,
      );

    transactions.push(...inssBenefitNumberTransactions);

    // Update legal proceedings
    const legalProceedingNumberTransactions =
      this.updateLegalProceedingNumberOnDatabase(
        perCapitaIncomeForBpcAnalysis,
        currentPerCapitaIncomeForBpcAnalysisQueryResult,
        updatePerCapitaIncomeForBpcAnalysisRequestDto.json
          ?.legalProceedingNumber,
      );

    transactions.push(...legalProceedingNumberTransactions);

    if (transactions.length > 0) {
      const analysisToolClientIdForActivity =
        analysisToolClientId !== undefined
          ? analysisToolClientId.toString()
          : analysisToolRecordQueryResult.analysisToolClient.id.toString();

      const transactionsWithActivity =
        this.analysisActivityTrackerGateway.appendActivityTransaction({
          action: AnalysisActivityActionEnum.UPDATED,
          analysisType: analysisToolRecordQueryResult.type,
          organizationMemberId: organizationMember.id.toString(),
          analysisToolClientId: analysisToolClientIdForActivity,
          analysisToolRecordId: analysisToolRecordQueryResult.id.toString(),
          transactions,
        });

      const executeTransactions =
        await this.baseTransactionRepositoryGateway.execute(
          transactionsWithActivity,
        );
      await executeTransactions.commit();
    }

    return UpdatePerCapitaIncomeForBpcAnalysisResponseDto.build({
      perCapitaIncomeForBpcAnalysisId: perCapitaIncomeForBpcAnalysis.id,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity,
    currentPerCapitaIncomeForBpcAnalysisQueryResult: GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
    inssBenefitNumber: string[] | undefined,
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    if (inssBenefitNumber === undefined) {
      return transactions;
    }

    // Delete all current benefits
    const currentBenefits =
      currentPerCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisBenefit;

    for (const benefit of currentBenefits) {
      const deleteTransaction =
        this.perCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway.deletePerCapitaIncomeForBpcAnalysisBenefit(
          new PerCapitaIncomeForBpcAnalysisBenefitId(benefit.id.toString()),
        );

      transactions.push(deleteTransaction);
    }

    // Create new benefits
    const newBenefits = inssBenefitNumber.map((benefitNumber) => {
      return new PerCapitaIncomeForBpcAnalysisBenefitEntity({
        inssBenefitNumber: benefitNumber,
        perCapitaIncomeForBpcAnalysis,
      });
    });

    for (const benefit of newBenefits) {
      const createTransaction =
        this.perCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysisBenefit(
          benefit,
        );

      transactions.push(createTransaction);
    }

    return transactions;
  }

  private updateLegalProceedingNumberOnDatabase(
    perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity,
    currentPerCapitaIncomeForBpcAnalysisQueryResult: GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
    legalProceedingNumber: string[] | undefined,
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    if (legalProceedingNumber === undefined) {
      return transactions;
    }

    // Delete all current legal proceedings
    const currentLegalProceedings =
      currentPerCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisLegalProceeding;

    for (const legalProceeding of currentLegalProceedings) {
      const deleteTransaction =
        this.perCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway.deletePerCapitaIncomeForBpcAnalysisLegalProceeding(
          new PerCapitaIncomeForBpcAnalysisLegalProceedingId(
            legalProceeding.id.toString(),
          ),
        );

      transactions.push(deleteTransaction);
    }

    // Create new legal proceedings
    const newLegalProceedings = legalProceedingNumber.map(
      (proceedingNumber) => {
        return new PerCapitaIncomeForBpcAnalysisLegalProceedingEntity({
          legalProceedingNumber: proceedingNumber,
          perCapitaIncomeForBpcAnalysis,
        });
      },
    );

    for (const legalProceeding of newLegalProceedings) {
      const createTransaction =
        this.perCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysisLegalProceeding(
          legalProceeding,
        );

      transactions.push(createTransaction);
    }

    return transactions;
  }

  private async updateDocumentsOnDatabase(
    perCapitaIncomeForBpcAnalysis: PerCapitaIncomeForBpcAnalysisEntity,
    currentPerCapitaIncomeForBpcAnalysisQueryResult: GetPerCapitaIncomeForBpcAnalysisWithRelationsQueryResult,
    updatePerCapitaIncomeForBpcAnalysisRequestDto: UpdatePerCapitaIncomeForBpcAnalysisRequestDto,
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [];

    const cnisDocument =
      updatePerCapitaIncomeForBpcAnalysisRequestDto.cnisDocument;
    const cadUnicoDocument =
      updatePerCapitaIncomeForBpcAnalysisRequestDto.cadUnicoDocument;

    // If any document is provided, delete all existing documents first
    if (cnisDocument !== undefined || cadUnicoDocument !== undefined) {
      const currentDocuments =
        currentPerCapitaIncomeForBpcAnalysisQueryResult.perCapitaIncomeForBpcAnalysisDocument;

      // Delete all existing documents
      const deleteTransactions = currentDocuments.map((doc) => {
        return this.perCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway.deletePerCapitaIncomeForBpcAnalysisDocument(
          new PerCapitaIncomeForBpcAnalysisDocumentId(doc.id.toString()),
        );
      });

      transactions.push(...deleteTransactions);

      // Create new CNIS document if provided
      if (cnisDocument !== undefined) {
        const cnisFilename =
          await this.fileProcessorGateway.uploadFile(cnisDocument);

        const newCnisDocumentEntity =
          new PerCapitaIncomeForBpcAnalysisDocumentEntity({
            document: cnisFilename,
            type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum.CNIS,
            perCapitaIncomeForBpcAnalysis,
          });

        const createTransaction =
          this.perCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysisDocument(
            newCnisDocumentEntity,
          );

        transactions.push(createTransaction);
      }

      // Create new CAD Único document if provided
      if (cadUnicoDocument !== undefined) {
        const cadUnicoFilename =
          await this.fileProcessorGateway.uploadFile(cadUnicoDocument);

        const newCadUnicoDocumentEntity =
          new PerCapitaIncomeForBpcAnalysisDocumentEntity({
            document: cadUnicoFilename,
            type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum.CAD_UNICO,
            perCapitaIncomeForBpcAnalysis,
          });

        const createTransaction =
          this.perCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysisDocument(
            newCadUnicoDocumentEntity,
          );

        transactions.push(createTransaction);
      }
    }

    return transactions;
  }
}
