import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/enum/special-activity-document-type.enum';
import { SpecialActivityDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-document/special-activity-document.entity';
import { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialActivityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity/command/special-activity.command.repository.gateway';
import { SpecialActivityQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity/query/special-activity.query.repository.gateway';
import { SpecialActivityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-document/command/special-activity-document.command.repository.gateway';
import { GetSpecialActivityDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-document/query/result/get-special-activity-document.query.result';
import { SpecialActivityInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-inss-benefit/command/special-activity-inss-benefit.command.repository.gateway';
import { GetSpecialActivityInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-inss-benefit/query/result/get-special-activity-inss-benefit.query.result';
import { SpecialActivityLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-legal-proceeding/command/special-activity-legal-proceeding.command.repository.gateway';
import { GetSpecialActivityLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-legal-proceeding/query/result/get-special-activity-legal-proceeding.query.result';
import { UpdateSpecialActivityRequestDto } from '@module/customer/analysis-tool/module/special-activity/dto/request/update-special-activity.request.dto';
import { UpdateSpecialActivityResponseDto } from '@module/customer/analysis-tool/module/special-activity/dto/response/update-special-activity.response.dto';
import { SpecialActivityAtLeastOnePppRequiredError } from '@module/customer/analysis-tool/module/special-activity/error/special-activity-at-least-one-ppp-required.error';
import { SpecialActivityNotFoundError } from '@module/customer/analysis-tool/module/special-activity/error/special-activity-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateSpecialActivityUseCase {
  protected readonly _type = UpdateSpecialActivityUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialActivityCommandRepositoryGateway)
    private readonly specialActivityCommandRepositoryGateway: SpecialActivityCommandRepositoryGateway,
    @Inject(SpecialActivityQueryRepositoryGateway)
    private readonly specialActivityQueryRepositoryGateway: SpecialActivityQueryRepositoryGateway,
    @Inject(SpecialActivityDocumentCommandRepositoryGateway)
    private readonly specialActivityDocumentCommandRepositoryGateway: SpecialActivityDocumentCommandRepositoryGateway,
    @Inject(SpecialActivityInssBenefitCommandRepositoryGateway)
    private readonly specialActivityInssBenefitCommandRepositoryGateway: SpecialActivityInssBenefitCommandRepositoryGateway,
    @Inject(SpecialActivityLegalProceedingCommandRepositoryGateway)
    private readonly specialActivityLegalProceedingCommandRepositoryGateway: SpecialActivityLegalProceedingCommandRepositoryGateway,
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
    dto: UpdateSpecialActivityRequestDto,
  ): Promise<UpdateSpecialActivityResponseDto> {
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
        SpecialActivityNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialActivityId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialActivityNotFoundError,
      );

    if (dto.documents !== undefined) {
      const hasPpp = dto.documents.some(
        (doc) => doc.type === SpecialActivityDocumentTypeEnum.PPP,
      );

      if (!hasPpp) {
        throw new SpecialActivityAtLeastOnePppRequiredError();
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
      ...analysisToolRecordQueryResult,
      analysisToolClient,
      specialActivity,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
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

    return UpdateSpecialActivityResponseDto.build({
      specialActivityId: specialActivity.id,
    });
  }

  private async updateDocumentsOnDatabase(
    specialActivity: SpecialActivityEntity,
    existingDocuments: GetSpecialActivityDocumentQueryResult[],
    newDocumentDtos: UpdateSpecialActivityRequestDto['documents'],
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
    existingBenefits: GetSpecialActivityInssBenefitQueryResult[],
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
    existingProceedings: GetSpecialActivityLegalProceedingQueryResult[],
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
