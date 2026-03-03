import { Inject, Injectable } from '@nestjs/common';

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
import { SpecialActivityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/command/special-activity-analysis.command.repository.gateway';
import { SpecialActivityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/special-activity-analysis.query.repository.gateway';
import { SpecialActivityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/command/special-activity-analysis-document.command.repository.gateway';
import { GetSpecialActivityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/query/result/get-special-activity-analysis-document.query.result';
import { SpecialActivityAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-inss-benefit/command/special-activity-analysis-inss-benefit.command.repository.gateway';
import { GetSpecialActivityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-inss-benefit/query/result/get-special-activity-analysis-inss-benefit.query.result';
import { SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-legal-proceeding/command/special-activity-analysis-legal-proceeding.command.repository.gateway';
import { GetSpecialActivityAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-legal-proceeding/query/result/get-special-activity-analysis-legal-proceeding.query.result';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-document/special-activity-document.entity';
import { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import { UpdateSpecialActivityAnalysisRequestDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/request/update-special-activity-analysis.request.dto';
import { UpdateSpecialActivityAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-activity-analysis/dto/response/update-special-activity-analysis.response.dto';
import { SpecialActivityAnalysisAtLeastOnePppRequiredError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-at-least-one-ppp-required.error';
import { SpecialActivityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-activity-analysis/error/special-activity-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateSpecialActivityAnalysisUseCase {
  protected readonly _type = UpdateSpecialActivityAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialActivityAnalysisCommandRepositoryGateway)
    private readonly specialActivityCommandRepositoryGateway: SpecialActivityAnalysisCommandRepositoryGateway,
    @Inject(SpecialActivityAnalysisQueryRepositoryGateway)
    private readonly specialActivityQueryRepositoryGateway: SpecialActivityAnalysisQueryRepositoryGateway,
    @Inject(SpecialActivityAnalysisDocumentCommandRepositoryGateway)
    private readonly specialActivityDocumentCommandRepositoryGateway: SpecialActivityAnalysisDocumentCommandRepositoryGateway,
    @Inject(SpecialActivityAnalysisInssBenefitCommandRepositoryGateway)
    private readonly specialActivityInssBenefitCommandRepositoryGateway: SpecialActivityAnalysisInssBenefitCommandRepositoryGateway,
    @Inject(SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly specialActivityLegalProceedingCommandRepositoryGateway: SpecialActivityAnalysisLegalProceedingCommandRepositoryGateway,
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
    specialActivityId: SpecialActivityId,
    dto: UpdateSpecialActivityAnalysisRequestDto,
  ): Promise<UpdateSpecialActivityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const specialActivityQueryResult =
      await this.specialActivityQueryRepositoryGateway.findOneBySpecialActivityIdAndOrganizationIdWithRelationsOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        SpecialActivityAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityAnalysisNotFoundError,
      );

    if (dto.documents !== undefined) {
      const hasPpp = dto.documents.some(
        (doc) => doc.type === SpecialActivityDocumentTypeEnum.PPP,
      );

      if (!hasPpp) {
        throw new SpecialActivityAnalysisAtLeastOnePppRequiredError();
      }
    }

    const specialActivity = new SpecialActivityEntity({
      ...specialActivityQueryResult,
      specialActivityResult: null,
      specialActivityDocuments: null,
      specialActivityInssBenefit: null,
      specialActivityLegalProceeding: null,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
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
      specialActivity,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      administrativeProcedureInssAnalysis: null,
      audienceQuestionGenerator: null,
      judicialCaseAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      medicalQuestionGenerator: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.documents !== undefined) {
      const documentTransactions = await this.updateDocumentsOnDatabase(
        specialActivity,
        specialActivityQueryResult.specialActivityDocuments,
        dto.documents,
      );
      transactions.push(...documentTransactions);
    }

    if (dto.inssBenefitNumber !== undefined) {
      const inssBenefitTransactions = this.updateInssBenefitOnDatabase(
        specialActivity,
        specialActivityQueryResult.specialActivityInssBenefit,
        dto.inssBenefitNumber,
      );
      transactions.push(...inssBenefitTransactions);
    }

    if (dto.legalProceedingNumber !== undefined) {
      const legalProceedingTransactions = this.updateLegalProceedingOnDatabase(
        specialActivity,
        specialActivityQueryResult.specialActivityLegalProceeding,
        dto.legalProceedingNumber,
      );
      transactions.push(...legalProceedingTransactions);
    }

    const updateSpecialActivityTransaction =
      this.specialActivityCommandRepositoryGateway.updateSpecialActivity(
        specialActivity.id,
        specialActivity,
      );

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    transactions.push(
      updateSpecialActivityTransaction,
      updateAnalysisToolRecordTransaction,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await transaction.commit();

    return UpdateSpecialActivityAnalysisResponseDto.build({
      specialActivityId: specialActivity.id,
    });
  }

  private async updateDocumentsOnDatabase(
    specialActivity: SpecialActivityEntity,
    existingDocuments: GetSpecialActivityAnalysisDocumentQueryResult[],
    newDocumentDtos: UpdateSpecialActivityAnalysisRequestDto['documents'],
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [];

    for (const existingDoc of existingDocuments) {
      const deleteTransaction =
        this.specialActivityDocumentCommandRepositoryGateway.deleteSpecialActivityDocument(
          existingDoc.id,
        );
      transactions.push(deleteTransaction);
    }

    if (newDocumentDtos !== undefined) {
      for (const docDto of newDocumentDtos) {
        const buffer = docDto.document.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: docDto.document.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentPath =
          await this.fileProcessorGateway.uploadFile(fileModel);

        const newDocument = new SpecialActivityDocumentEntity({
          document: documentPath,
          type: docDto.type,
          specialActivity,
        });

        const createTransaction =
          this.specialActivityDocumentCommandRepositoryGateway.createSpecialActivityDocument(
            newDocument,
          );
        transactions.push(createTransaction);
      }
    }

    return transactions;
  }

  private updateInssBenefitOnDatabase(
    specialActivity: SpecialActivityEntity,
    existingBenefits: GetSpecialActivityAnalysisInssBenefitQueryResult[],
    newBenefitNumbers: string[],
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    for (const existingBenefit of existingBenefits) {
      const deleteTransaction =
        this.specialActivityInssBenefitCommandRepositoryGateway.deleteSpecialActivityInssBenefit(
          existingBenefit.id,
        );
      transactions.push(deleteTransaction);
    }

    for (const benefitNumber of newBenefitNumbers) {
      const newBenefit = new SpecialActivityInssBenefitEntity({
        inssBenefitNumber: benefitNumber,
        specialActivity,
      });

      const createTransaction =
        this.specialActivityInssBenefitCommandRepositoryGateway.createSpecialActivityInssBenefit(
          newBenefit,
        );
      transactions.push(createTransaction);
    }

    return transactions;
  }

  private updateLegalProceedingOnDatabase(
    specialActivity: SpecialActivityEntity,
    existingProceedings: GetSpecialActivityAnalysisLegalProceedingQueryResult[],
    newProceedingNumbers: string[],
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    for (const existingProceeding of existingProceedings) {
      const deleteTransaction =
        this.specialActivityLegalProceedingCommandRepositoryGateway.deleteSpecialActivityLegalProceeding(
          existingProceeding.id,
        );
      transactions.push(deleteTransaction);
    }

    for (const proceedingNumber of newProceedingNumbers) {
      const newProceeding = new SpecialActivityLegalProceedingEntity({
        legalProceedingNumber: proceedingNumber,
        specialActivity,
      });

      const createTransaction =
        this.specialActivityLegalProceedingCommandRepositoryGateway.createSpecialActivityLegalProceeding(
          newProceeding,
        );
      transactions.push(createTransaction);
    }

    return transactions;
  }
}
