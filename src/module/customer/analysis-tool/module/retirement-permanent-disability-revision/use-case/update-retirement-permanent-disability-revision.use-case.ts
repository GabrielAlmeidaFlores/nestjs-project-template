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
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRevisionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/command/retirement-permanent-disability-revision.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/command/retirement-permanent-disability-revision-document.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/command/retirement-permanent-disability-revision-inss-benefit.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-legal-proceeding/command/retirement-permanent-disability-revision-legal-proceeding.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import { RetirementPermanentDisabilityRevisionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/retirement-permanent-disability-revision-document.entity';
import { RetirementPermanentDisabilityRevisionInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/retirement-permanent-disability-revision-benefit.entity';
import { RetirementPermanentDisabilityRevisionLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/retirement-permanent-disability-revision-legal-proceeding.entity';
import { UpdateRetirementPermanentDisabilityRevisionRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/update-retirement-permanent-disability-revision.request.dto';
import { UpdateRetirementPermanentDisabilityRevisionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/update-retirement-permanent-disability-revision.response.dto';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRetirementPermanentDisabilityRevisionUseCase {
  protected readonly _type =
    UpdateRetirementPermanentDisabilityRevisionUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionCommandRepositoryGateway: RetirementPermanentDisabilityRevisionCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway,
    )
    private readonly inssBenefitCommandRepositoryGateway: RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway,
    )
    private readonly documentCommandRepositoryGateway: RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway,
    )
    private readonly legalProceedingCommandRepositoryGateway: RetirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    dto: UpdateRetirementPermanentDisabilityRevisionRequestDto,
  ): Promise<UpdateRetirementPermanentDisabilityRevisionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisQueryResult =
      await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPermanentDisabilityRevisionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPermanentDisabilityRevisionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPermanentDisabilityRevisionNotFoundError,
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

    const revision = new RetirementPermanentDisabilityRevisionEntity({
      id: analysisQueryResult.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      retirementPermanentDisabilityRevision: revision,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRgps: null,
      retirementPlanningRpps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      audienceQuestionGenerator: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      teacherRetirementPlanning: null,
      disabilityRetirementPlanning: null,
      generalUrbanRetirementGrant: null,
      generalUrbanRetirementAnalysis: null,
      disabilityRetirementPlanningGrant: null,
      temporaryDisabilityBenefitsGrant: null,
      ruralOrHybridRetirementRejection: null,
      ruralOrHybridRetirementAnalysis: null,
      accidentBenefitRejection: null,
      survivorPensionAnalysis: null,
      specialCategoryRetirementAnalysis: null,
      deathBenefitGrant: null,
      deathBenefitRejection: null,
      specialRetirementGrant: null,
      generalUrbanRetirementDenial: null,
      disabilityRetirementPlanningRejection: null,
      bpcDisabilityDenial: null,
      bpcElderlyAnalysis: null,
      temporaryIncapacityBenefitRejection: null,
      maternityPayGrant: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      transactions.push(
        ...this.buildInssBenefitTransactions(
          retirementPermanentDisabilityRevisionId,
          dto.json.inssBenefitNumber,
        ),
      );
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      transactions.push(
        ...this.buildLegalProceedingTransactions(
          retirementPermanentDisabilityRevisionId,
          dto.json.legalProceedingNumber,
        ),
      );
    }

    if (dto.administrativeProcedureDocument !== undefined) {
      const docTransactions = await this.buildDocumentTransactions(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionDocumentTypeEnum.ADMINISTRATIVE_PROCEDURE,
        dto.administrativeProcedureDocument,
      );
      transactions.push(...docTransactions);
    }

    if (dto.crpsAdministrativeAppeal !== undefined) {
      const docTransactions = await this.buildDocumentTransactions(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionDocumentTypeEnum.CRPS,
        dto.crpsAdministrativeAppeal,
      );
      transactions.push(...docTransactions);
    }

    if (dto.medicalReport !== undefined) {
      const docTransactions = await this.buildDocumentTransactions(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionDocumentTypeEnum.MEDICAL_REPORT,
        dto.medicalReport,
      );
      transactions.push(...docTransactions);
    }

    if (dto.judicialDecision !== undefined) {
      const docTransactions = await this.buildDocumentTransactions(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionDocumentTypeEnum.JUDICIAL_DECISION,
        dto.judicialDecision,
      );
      transactions.push(...docTransactions);
    }

    if (dto.otherDocument !== undefined) {
      const docTransactions = await this.buildDocumentTransactions(
        retirementPermanentDisabilityRevisionId,
        RetirementPermanentDisabilityRevisionDocumentTypeEnum.OTHER,
        dto.otherDocument,
      );
      transactions.push(...docTransactions);
    }

    transactions.push(
      this.retirementPermanentDisabilityRevisionCommandRepositoryGateway.updateRetirementPermanentDisabilityRevision(
        revision.id,
        revision,
      ),
    );

    transactions.push(
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecord.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(
        transactionsWithActivity,
      );
    await executeTransactions.commit();

    return UpdateRetirementPermanentDisabilityRevisionResponseDto.build({
      retirementPermanentDisabilityRevisionId,
    });
  }

  private buildInssBenefitTransactions(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    newInssBenefitNumbers: string[],
  ): TransactionType[] {
    const deleteTransaction =
      this.inssBenefitCommandRepositoryGateway.deleteAllByRetirementPermanentDisabilityRevisionId(
        retirementPermanentDisabilityRevisionId,
      );

    const createTransactions = newInssBenefitNumbers.map(
      (inssBenefitNumber) => {
        const entity =
          new RetirementPermanentDisabilityRevisionInssBenefitEntity({
            inssBenefitNumber,
            retirementPermanentDisabilityRevision:
              retirementPermanentDisabilityRevisionId,
          });

        return this.inssBenefitCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionInssBenefit(
          entity,
        );
      },
    );

    return [deleteTransaction, ...createTransactions];
  }

  private buildLegalProceedingTransactions(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    newLegalProceedingNumbers: string[],
  ): TransactionType[] {
    const deleteTransaction =
      this.legalProceedingCommandRepositoryGateway.deleteAllByRetirementPermanentDisabilityRevisionId(
        retirementPermanentDisabilityRevisionId,
      );

    const createTransactions = newLegalProceedingNumbers.map(
      (legalProceedingNumber) => {
        const entity =
          new RetirementPermanentDisabilityRevisionLegalProceedingEntity({
            legalProceedingNumber,
            retirementPermanentDisabilityRevisionId:
              retirementPermanentDisabilityRevisionId,
          });

        return this.legalProceedingCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionLegalProceeding(
          entity,
        );
      },
    );

    return [deleteTransaction, ...createTransactions];
  }

  private async buildDocumentTransactions(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    type: RetirementPermanentDisabilityRevisionDocumentTypeEnum,
    files: Base64FileRequestDto[],
  ): Promise<TransactionType[]> {
    const deleteTransaction =
      this.documentCommandRepositoryGateway.deleteAllByRetirementPermanentDisabilityRevisionIdAndType(
        retirementPermanentDisabilityRevisionId,
        type,
      );

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const buffer = file.base64.decodeToBuffer();

        return await this.fileProcessorGateway.uploadFile(
          FileModel.build({
            buffer,
            originalName: file.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          }),
        );
      }),
    );

    const createTransactions = uploadedFiles.map((fileName) => {
      const entity = new RetirementPermanentDisabilityRevisionDocumentEntity({
        document: fileName,
        type,
        retirementPermanentDisabilityRevision:
          retirementPermanentDisabilityRevisionId,
      });

      return this.documentCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDocument(
        entity,
      );
    });

    return [deleteTransaction, ...createTransactions];
  }
}
