import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { EventGateway } from '@lib/event/event.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.entity';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { AnalysisToolClientFederalDocumentAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-federal-document-already-in-use.error';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { InsuranceQualityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/command/insurance-quality-analysis.command.repository.gateway';
import { InsuranceQualityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/insurance-quality-analysis.query.repository.gateway';
import { GetInsuranceQualityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/query/result/get-insurance-quality-analysis-with-relations.query.result';
import { InsuranceQualityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-document/command/insurance-quality-analysis-document.command.repository.gateway';
import { InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-inss-benefit/command/insurance-quality-analysis-inss-benefit.command.repository.gateway';
import { InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-legal-proceeding/command/insurance-quality-analysis-legal-proceeding.command.repository.gateway';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { InsuranceQualityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/enum/insurance-quality-analysis-document-type.enum';
import { InsuranceQualityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/insurance-quality-analysis-document.entity';
import { InsuranceQualityAnalysisDocumentId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/value-object/insurance-quality-analysis-document-id/insurance-quality-analysis-document-id.value-object';
import { InsuranceQualityAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/insurance-quality-analysis-inss-benefit.entity';
import { InsuranceQualityAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/value-object/insurance-quality-analysis-inss-benefit-id/insurance-quality-analysis-inss-benefit-id.value-object';
import { InsuranceQualityAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/insurance-quality-analysis-legal-proceeding.entity';
import { InsuranceQualityAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/value-object/insurance-quality-analysis-legal-proceeding-id/insurance-quality-analysis-legal-proceeding-id.value-object';
import { UpdateInsuranceQualityAnalysisRequestDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/request/update-insurance-quality-analysis.request.dto';
import { UpdateInsuranceQualityAnalysisResponseDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/response/update-insurance-quality-analysis.response.dto';
import { InsuranceQualityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/insurance-quality-analysis/error/insurance-quality-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateInsuranceQualityAnalysisUseCase {
  protected readonly _type = UpdateInsuranceQualityAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(InsuranceQualityAnalysisCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisCommandRepositoryGateway: InsuranceQualityAnalysisCommandRepositoryGateway,
    @Inject(InsuranceQualityAnalysisQueryRepositoryGateway)
    private readonly insuranceQualityAnalysisQueryRepositoryGateway: InsuranceQualityAnalysisQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientCommandRepositoryGateway)
    private readonly analysisToolClientCommandRepositoryGateway: AnalysisToolClientCommandRepositoryGateway,
    @Inject(AnalysisToolClientInssBenefitCommandRepositoryGateway)
    private readonly analysisToolClientInssBenefitCommandRepositoryGateway: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    @Inject(AnalysisToolClientLegalProceedingCommandRepositoryGateway)
    private readonly analysisToolClientLegalProceedingCommandRepositoryGateway: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisInssBenefitCommandRepositoryGateway: InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway,
    @Inject(InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisLegalProceedingCommandRepositoryGateway: InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(InsuranceQualityAnalysisDocumentCommandRepositoryGateway)
    private readonly insuranceQualityAnalysisDocumentCommandRepositoryGateway: InsuranceQualityAnalysisDocumentCommandRepositoryGateway,
    @Inject(EventGateway)
    private readonly eventGateway: EventGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
    dto: UpdateInsuranceQualityAnalysisRequestDto,
  ): Promise<UpdateInsuranceQualityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByInsuranceQualityAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        insuranceQualityAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        InsuranceQualityAnalysisNotFoundError,
      );

    const insuranceQualityAnalysisQueryResult =
      await this.insuranceQualityAnalysisQueryRepositoryGateway.findOneWithRelationsByIdOrFail(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        insuranceQualityAnalysisId,
        InsuranceQualityAnalysisNotFoundError,
      );

    const analysisToolClientId =
      dto.json?.analysisToolClientId ??
      analysisToolRecordQueryResult.analysisToolClient.id;

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    if (dto.json?.analysisToolClient?.federalDocument) {
      const verifyConstraint =
        await this.analysisToolClientQueryRepositoryGateway.findOneByFederalDocumentAndOrganizationId(
          dto.json.analysisToolClient.federalDocument,
          organizationSessionData.organizationId,
        );

      if (
        verifyConstraint &&
        !verifyConstraint.id.equals(analysisToolClientQueryResult.id)
      ) {
        throw new AnalysisToolClientFederalDocumentAlreadyInUseError();
      }
    }

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const insuranceQualityAnalysis = new InsuranceQualityAnalysisEntity({
      id: insuranceQualityAnalysisId,
      createdAt: insuranceQualityAnalysisQueryResult.createdAt,
      updatedAt: insuranceQualityAnalysisQueryResult.updatedAt,
      analysisToolClientId: analysisToolClient.id,
      analysisBenefitNumber:
        dto.json?.analysisBenefitNumber ??
        insuranceQualityAnalysisQueryResult.analysisBenefitNumber,
      analysisBenefitType:
        dto.json?.analysisBenefitType ??
        insuranceQualityAnalysisQueryResult.analysisBenefitType,
      analysisBenefitConcessionDate:
        dto.json?.analysisBenefitConcessionDate ??
        insuranceQualityAnalysisQueryResult.analysisBenefitConcessionDate,
      analysisBenefitCessationDate:
        dto.json?.analysisBenefitCessationDate ??
        insuranceQualityAnalysisQueryResult.analysisBenefitCessationDate,
      analysisHasPreviousBenefit:
        dto.json?.analysisHasPreviousBenefit ??
        insuranceQualityAnalysisQueryResult.analysisHasPreviousBenefit,
      analysisPreviousBenefitDetails:
        dto.json?.analysisPreviousBenefitDetails ??
        insuranceQualityAnalysisQueryResult.analysisPreviousBenefitDetails,
      analysisContributionSituation:
        dto.json?.analysisContributionSituation ??
        insuranceQualityAnalysisQueryResult.analysisContributionSituation,
      analysisHasRuralActivity:
        dto.json?.analysisHasRuralActivity ??
        insuranceQualityAnalysisQueryResult.analysisHasRuralActivity,
      analysisRuralActivityDetails:
        dto.json?.analysisRuralActivityDetails ??
        insuranceQualityAnalysisQueryResult.analysisRuralActivityDetails,
      insuranceQualityAnalysisResult: null,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      deletedAt: analysisToolRecordQueryResult.deletedAt,
      analysisToolClient,
      insuranceQualityAnalysis,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      specialActivity: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      perCapitaIncomeForBpcAnalysis: null,
    });

    const updateInsuranceQualityAnalysisTransaction =
      this.insuranceQualityAnalysisCommandRepositoryGateway.updateInsuranceQualityAnalysis(
        insuranceQualityAnalysis.id,
        insuranceQualityAnalysis,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const inssBenefitTransactions = this.updateInssBenefitOnDatabase(
      insuranceQualityAnalysis,
      insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisInssBenefit,
      dto.json?.inssBenefitNumber ?? [],
    );

    const legalProceedingTransactions = this.updateLegalProceedingOnDatabase(
      insuranceQualityAnalysis,
      insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisLegalProceeding,
      dto.json?.legalProceedingNumber ?? [],
    );

    const documentTransactions: TransactionType[] = [];

    if (dto.documents !== undefined) {
      const documentsByType = new Map<
        InsuranceQualityAnalysisDocumentTypeEnum,
        FileModel[]
      >();

      for (const document of dto.documents) {
        const currentFiles = documentsByType.get(document.type) ?? [];
        currentFiles.push(...document.files);
        documentsByType.set(document.type, currentFiles);
      }

      for (const [type, files] of documentsByType.entries()) {
        const currentDocuments =
          insuranceQualityAnalysisQueryResult.insuranceQualityAnalysisDocument.filter(
            (document) => document.type === type,
          );

        const documentsTransactions = await this.updateDocumentsOnDatabase(
          insuranceQualityAnalysis,
          currentDocuments,
          files,
          type,
        );

        documentTransactions.push(...documentsTransactions);
      }
    }

    const analysisToolClientTransactions: TransactionType[] = [];

    if (dto.json?.analysisToolClient !== undefined) {
      const clientTransactions = this.updateAnalysisToolClientOnDatabase(
        analysisToolClientQueryResult,
        dto.json.analysisToolClient,
        organizationMember.id,
      );

      analysisToolClientTransactions.push(...clientTransactions);
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateInsuranceQualityAnalysisTransaction,
      updateAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
      ...documentTransactions,
      ...analysisToolClientTransactions,
    ]);

    await transaction.commit();

    if (dto.json?.analysisToolClient?.legalProceedingNumber !== undefined) {
      const updatedClient =
        await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
          analysisToolClientId,
          organizationSessionData.organizationId,
          AnalysisToolClientNotFoundError,
        );

      updatedClient.analysisToolClientLegalProceeding.forEach((proceeding) => {
        this.eventGateway.emitUpdateLegalProceedingDataEvent(proceeding.id);
      });
    }

    return UpdateInsuranceQualityAnalysisResponseDto.build({
      insuranceQualityAnalysisId,
    });
  }

  private updateInssBenefitOnDatabase(
    insuranceQualityAnalysis: InsuranceQualityAnalysisEntity,
    existingBenefits: GetInsuranceQualityAnalysisWithRelationsQueryResult['insuranceQualityAnalysisInssBenefit'],
    newBenefitNumbers: string[],
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    // Delete all current benefits
    for (const benefit of existingBenefits) {
      const id = new InsuranceQualityAnalysisInssBenefitId(
        benefit.id.toString(),
      );
      const deleteTransaction =
        this.insuranceQualityAnalysisInssBenefitCommandRepositoryGateway.deleteInsuranceQualityAnalysisInssBenefit(
          id,
        );

      transactions.push(deleteTransaction);
    }

    // Create new benefits
    const newBenefits = newBenefitNumbers.map((benefitNumber) => {
      return new InsuranceQualityAnalysisInssBenefitEntity({
        inssBenefitNumber: benefitNumber,
        insuranceQualityAnalysis,
      });
    });

    for (const benefit of newBenefits) {
      const createTransaction =
        this.insuranceQualityAnalysisInssBenefitCommandRepositoryGateway.createInsuranceQualityAnalysisInssBenefit(
          benefit,
        );

      transactions.push(createTransaction);
    }

    return transactions;
  }

  private updateLegalProceedingOnDatabase(
    insuranceQualityAnalysis: InsuranceQualityAnalysisEntity,
    existingProceedings: GetInsuranceQualityAnalysisWithRelationsQueryResult['insuranceQualityAnalysisLegalProceeding'],
    newProceedingNumbers: string[],
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    // Delete all current legal proceedings
    for (const proceeding of existingProceedings) {
      const id = new InsuranceQualityAnalysisLegalProceedingId(
        proceeding.id.toString(),
      );
      const deleteTransaction =
        this.insuranceQualityAnalysisLegalProceedingCommandRepositoryGateway.deleteInsuranceQualityAnalysisLegalProceeding(
          id,
        );

      transactions.push(deleteTransaction);
    }

    // Create new legal proceedings
    const newProceedings = newProceedingNumbers.map((proceedingNumber) => {
      return new InsuranceQualityAnalysisLegalProceedingEntity({
        legalProceedingNumber: proceedingNumber,
        insuranceQualityAnalysis,
      });
    });

    for (const proceeding of newProceedings) {
      const createTransaction =
        this.insuranceQualityAnalysisLegalProceedingCommandRepositoryGateway.createInsuranceQualityAnalysisLegalProceeding(
          proceeding,
        );

      transactions.push(createTransaction);
    }

    return transactions;
  }

  private async updateDocumentsOnDatabase(
    insuranceQualityAnalysis: InsuranceQualityAnalysisEntity,
    existingDocuments: GetInsuranceQualityAnalysisWithRelationsQueryResult['insuranceQualityAnalysisDocument'],
    newDocuments: FileModel[],
    type: InsuranceQualityAnalysisDocumentTypeEnum,
  ): Promise<TransactionType[]> {
    const deleteTransactions = existingDocuments.map((document) => {
      return this.insuranceQualityAnalysisDocumentCommandRepositoryGateway.deleteInsuranceQualityAnalysisDocument(
        new InsuranceQualityAnalysisDocumentId(document.id.toString()),
      );
    });

    const uploadedDocuments = await Promise.all(
      newDocuments.map(async (document) => {
        return await this.fileProcessorGateway.uploadFile(document);
      }),
    );

    const createTransactions = uploadedDocuments.map((document) => {
      const entity = new InsuranceQualityAnalysisDocumentEntity({
        document,
        type,
        insuranceQualityAnalysis,
      });

      return this.insuranceQualityAnalysisDocumentCommandRepositoryGateway.createInsuranceQualityAnalysisDocument(
        entity,
      );
    });

    return [...deleteTransactions, ...createTransactions];
  }

  private updateAnalysisToolClientOnDatabase(
    analysisToolClientQueryResult: GetAnalysisToolClientWithRelationsQueryResult,
    dto: UpdateAnalysisToolClientRequestDto,
    organizationMemberId: AnalysisToolClientEntity['updatedBy'],
  ): TransactionType[] {
    const analysisToolClient = new AnalysisToolClientEntity({
      id: analysisToolClientQueryResult.id,
      name: dto.name ?? analysisToolClientQueryResult.name,
      gender: dto.gender ?? analysisToolClientQueryResult.gender,
      birthDate: dto.birthDate ?? analysisToolClientQueryResult.birthDate,
      federalDocument:
        dto.federalDocument ?? analysisToolClientQueryResult.federalDocument,
      email: dto.email ?? analysisToolClientQueryResult.email,
      corporateEmail:
        dto.corporateEmail ?? analysisToolClientQueryResult.corporateEmail,
      phoneNumber: dto.phoneNumber ?? analysisToolClientQueryResult.phoneNumber,
      clientType: dto.clientType ?? analysisToolClientQueryResult.clientType,
      createdAt: analysisToolClientQueryResult.createdAt,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: organizationMemberId,
    });

    const transactions: TransactionType[] = [];

    transactions.push(
      this.analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient(
        analysisToolClient.id,
        analysisToolClient,
      ),
    );

    if (dto.inssBenefitNumber !== undefined) {
      const newAnalysisToolClientInssBenefit = dto.inssBenefitNumber.map(
        (value) =>
          new AnalysisToolClientInssBenefitEntity({
            inssBenefitNumber: value,
            analysisToolClient,
          }),
      );

      const createNewAnalysisToolClientInssBenefitTransaction =
        newAnalysisToolClientInssBenefit.map((entity) =>
          this.analysisToolClientInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit(
            entity,
          ),
        );

      const deleteOldAnalysisToolClientInssBenefitTransaction =
        analysisToolClientQueryResult.analysisToolClientInssBenefit.map(
          (entity) =>
            this.analysisToolClientInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit(
              entity.id,
            ),
        );

      transactions.push(...createNewAnalysisToolClientInssBenefitTransaction);
      transactions.push(...deleteOldAnalysisToolClientInssBenefitTransaction);
    }

    if (dto.legalProceedingNumber !== undefined) {
      const newAnalysisToolClientLegalProceeding =
        dto.legalProceedingNumber.map(
          (value) =>
            new AnalysisToolClientLegalProceedingEntity({
              legalProceedingNumber: value,
              analysisToolClient,
            }),
        );

      const createNewAnalysisToolClientLegalProceedingTransaction =
        newAnalysisToolClientLegalProceeding.map((entity) =>
          this.analysisToolClientLegalProceedingCommandRepositoryGateway.createAnalysisToolClientLegalProceeding(
            entity,
          ),
        );

      const deleteOldAnalysisToolClientLegalProceedingTransaction =
        analysisToolClientQueryResult.analysisToolClientLegalProceeding.map(
          (entity) =>
            this.analysisToolClientLegalProceedingCommandRepositoryGateway.deleteAnalysisToolClientLegalProceeding(
              entity.id,
            ),
        );

      transactions.push(
        ...createNewAnalysisToolClientLegalProceedingTransaction,
      );
      transactions.push(
        ...deleteOldAnalysisToolClientLegalProceedingTransaction,
      );
    }

    return transactions;
  }
}
