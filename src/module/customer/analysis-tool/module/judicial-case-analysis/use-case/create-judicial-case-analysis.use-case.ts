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
import { JudicialCaseAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/command/judicial-case-analysis.command.repository.gateway';
import { JudicialCaseAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-benefit/command/judicial-case-analysis-benefit.command.repository.gateway';
import { JudicialCaseAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-document/command/judicial-case-analysis-document.command.repository.gateway';
import { JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-legal-proceeding/command/judicial-case-analysis-legal-proceeding.command.repository.gateway';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import { JudicialCaseAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/enum/judicial-case-analysis-document-type.enum';
import { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import { CreateJudicialCaseAnalysisRequestDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/request/create-judicial-case-analysis.request.dto';
import { CreateJudicialCaseAnalysisResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/create-judicial-case-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateJudicialCaseAnalysisUseCase {
  protected readonly _type = CreateJudicialCaseAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisCommandRepositoryGateway)
    private readonly judicialCaseAnalysisCommandRepositoryGateway: JudicialCaseAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisBenefitCommandRepositoryGateway)
    private readonly judicialCaseAnalysisBenefitCommandRepositoryGateway: JudicialCaseAnalysisBenefitCommandRepositoryGateway,
    @Inject(JudicialCaseAnalysisDocumentCommandRepositoryGateway)
    private readonly judicialCaseAnalysisDocumentCommandRepositoryGateway: JudicialCaseAnalysisDocumentCommandRepositoryGateway,
    @Inject(JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly judicialCaseAnalysisLegalProceedingCommandRepositoryGateway: JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway,
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
    dto: CreateJudicialCaseAnalysisRequestDto,
  ): Promise<CreateJudicialCaseAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const judicialCaseDocumentFiles = await Promise.all(
      dto.judicialCaseDocument !== undefined
        ? dto.judicialCaseDocument.map(async (value) => {
            return await this.fileProcessorGateway.uploadFile(value);
          })
        : [],
    );

    const otherDocumentFiles = await Promise.all(
      dto.otherDocument !== undefined
        ? dto.otherDocument.map(async (value) => {
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

    const judicialCaseAnalysis = new JudicialCaseAnalysisEntity({
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const judicialCaseAnalysisBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new JudicialCaseAnalysisBenefitEntity({
              inssBenefitNumber: value,
              judicialCaseAnalysis,
            });
          })
        : [];

    const judicialCaseAnalysisLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new JudicialCaseAnalysisLegalProceedingEntity({
              legalProceedingNumber: value,
              judicialCaseAnalysis,
            });
          })
        : [];

    const judicialCaseDocuments = judicialCaseDocumentFiles.map((value) => {
      return new JudicialCaseAnalysisDocumentEntity({
        document: value,
        type: JudicialCaseAnalysisDocumentTypeEnum.JUDICIAL_CASE,
        judicialCaseAnalysis,
      });
    });

    const otherDocuments = otherDocumentFiles.map((value) => {
      return new JudicialCaseAnalysisDocumentEntity({
        document: value,
        type: JudicialCaseAnalysisDocumentTypeEnum.OTHER_DOCUMENT,
        judicialCaseAnalysis,
      });
    });

    const maxCode: number =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.JUDICIAL_CASE_ANALYSIS,
      judicialCaseAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      judicialCaseAnalysis,
      judicialCaseAnalysisBenefit,
      judicialCaseAnalysisLegalProceeding,
      analysisToolRecord,
      judicialCaseDocuments,
      otherDocuments,
    );

    return CreateJudicialCaseAnalysisResponseDto.build({
      judicialCaseAnalysisId: judicialCaseAnalysis.id,
    });
  }

  private async createOnDatabase(
    judicialCaseAnalysis: JudicialCaseAnalysisEntity,
    judicialCaseAnalysisBenefit: JudicialCaseAnalysisBenefitEntity[],
    judicialCaseAnalysisLegalProceeding: JudicialCaseAnalysisLegalProceedingEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
    judicialCaseDocuments: JudicialCaseAnalysisDocumentEntity[],
    otherDocuments: JudicialCaseAnalysisDocumentEntity[],
  ): Promise<void> {
    const judicialCaseAnalysisBenefitTransaction =
      judicialCaseAnalysisBenefit.map((value) => {
        return this.judicialCaseAnalysisBenefitCommandRepositoryGateway.createJudicialCaseAnalysisBenefit(
          value,
        );
      });

    const judicialCaseAnalysisLegalProceedingTransaction =
      judicialCaseAnalysisLegalProceeding.map((value) => {
        return this.judicialCaseAnalysisLegalProceedingCommandRepositoryGateway.createJudicialCaseAnalysisLegalProceeding(
          value,
        );
      });

    const allJudicialCaseAnalysisDocuments = [
      ...judicialCaseDocuments,
      ...otherDocuments,
    ].map((value) => {
      return this.judicialCaseAnalysisDocumentCommandRepositoryGateway.createJudicialCaseAnalysisDocument(
        value,
      );
    });

    const judicialCaseAnalysisTransaction =
      this.judicialCaseAnalysisCommandRepositoryGateway.createJudicialCaseAnalysis(
        judicialCaseAnalysis,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.JUDICIAL_CASE_ANALYSIS,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: [
          judicialCaseAnalysisTransaction,
          ...judicialCaseAnalysisBenefitTransaction,
          ...judicialCaseAnalysisLegalProceedingTransaction,
          ...allJudicialCaseAnalysisDocuments,
          analysisToolRecordTransaction,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();
  }
}
