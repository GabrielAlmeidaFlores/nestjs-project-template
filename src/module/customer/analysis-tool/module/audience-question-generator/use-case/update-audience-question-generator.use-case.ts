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
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { GetAudienceQuestionGeneratorDocumentQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-document.query.result';
import { AudienceQuestionGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-benefit/command/audience-question-generator-benefit.command.repository.gateway';
import { GetAudienceQuestionGeneratorBenefitQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-benefit/query/result/get-audience-question-generator-benefit.query.result';
import { AudienceQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-document/command/audience-question-generator-document.command.repository.gateway';
import { AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-legal-proceeding/command/audience-question-generator-legal-proceeding.command.repository.gateway';
import { GetAudienceQuestionGeneratorLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-legal-proceeding/query/result/get-audience-question-generator-legal-proceeding.query.result';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { AudienceQuestionGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity';
import { AudienceQuestionGeneratorBenefitId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/value-object/audience-question-generator-benefit-id/audience-question-generator-benefit-id.value-object';
import { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import { AudienceQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/value-object/audience-question-generator-document-id/audience-question-generator-document-id.value-object';
import { AudienceQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity';
import { AudienceQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/value-object/audience-question-generator-legal-proceeding-id/audience-question-generator-legal-proceeding-id.value-object';
import { UpdateAudienceQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/request/update-audience-question-generator.request.dto';
import { UpdateAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/update-audience-question-generator.response.dto';
import { AudienceQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateAudienceQuestionGeneratorUseCase {
  protected readonly _type = UpdateAudienceQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorCommandRepositoryGateway: AudienceQuestionGeneratorCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorDocumentCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorDocumentCommandRepositoryGateway: AudienceQuestionGeneratorDocumentCommandRepositoryGateway,
    @Inject(AudienceQuestionGeneratorBenefitCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorBenefitCommandRepositoryGateway: AudienceQuestionGeneratorBenefitCommandRepositoryGateway,
    @Inject(AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorLegalProceedingCommandRepositoryGateway: AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AudienceQuestionGeneratorQueryRepositoryGateway)
    private readonly audienceQuestionGeneratorQueryRepositoryGateway: AudienceQuestionGeneratorQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    dto: UpdateAudienceQuestionGeneratorRequestDto,
  ): Promise<UpdateAudienceQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const audienceQuestionGeneratorQueryResult =
      await this.audienceQuestionGeneratorQueryRepositoryGateway.findOneByAudienceQuestionGeneratorIdAndOrganizationIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        AudienceQuestionGeneratorNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AudienceQuestionGeneratorNotFoundError,
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

    const audienceQuestionGenerator = new AudienceQuestionGeneratorEntity({
      id: audienceQuestionGeneratorQueryResult.id,
      createdBy:
        audienceQuestionGeneratorQueryResult.createdBy?.id ??
        organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      audienceQuestionGenerator,
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
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      disabilityAssessmentForBpcAnalysis: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.audienceQuestionDocument !== undefined) {
      const audienceQuestionDocumentTransactions =
        await this.updateAudienceQuestionDocumentOnDatabase(
          audienceQuestionGenerator,
          audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorDocument,
          dto.audienceQuestionDocument,
        );

      transactions.push(...audienceQuestionDocumentTransactions);
    }

    if (dto.json?.inssBenefitNumber !== undefined) {
      const audienceQuestionGeneratorBenefitTransactions =
        this.updateAudienceQuestionGeneratorBenefitOnDatabase(
          audienceQuestionGenerator,
          audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorBenefit ??
            [],
          dto.json.inssBenefitNumber,
        );

      transactions.push(...audienceQuestionGeneratorBenefitTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const audienceQuestionGeneratorLegalProceedingTransactions =
        this.updateAudienceQuestionGeneratorLegalProceedingOnDatabase(
          audienceQuestionGenerator,
          audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorLegalProceeding ??
            [],
          dto.json.legalProceedingNumber,
        );

      transactions.push(
        ...audienceQuestionGeneratorLegalProceedingTransactions,
      );
    }

    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    const updateAudienceQuestionGeneratorTransaction =
      this.audienceQuestionGeneratorCommandRepositoryGateway.updateAudienceQuestionGenerator(
        audienceQuestionGenerator.id,
        audienceQuestionGenerator,
      );

    transactions.push(
      updateAnalysisToolRecordTransaction,
      updateAudienceQuestionGeneratorTransaction,
    );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: AnalysisToolRecordTypeEnum.AUDIENCE_QUESTIONS_GENERATOR,
        organizationMemberId: organizationMember.id,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return UpdateAudienceQuestionGeneratorResponseDto.build({
      audienceQuestionGeneratorId: audienceQuestionGenerator.id,
    });
  }

  private async updateAudienceQuestionDocumentOnDatabase(
    audienceQuestionGenerator: AudienceQuestionGeneratorEntity,
    audienceQuestionGeneratorDocumentQueryResult: GetAudienceQuestionGeneratorDocumentQueryResult[],
    audienceQuestionDocument: FileModel[] | undefined,
  ): Promise<TransactionType[]> {
    const deleteCurrent = audienceQuestionGeneratorDocumentQueryResult.map(
      (value) => {
        return this.audienceQuestionGeneratorDocumentCommandRepositoryGateway.deleteAudienceQuestionGeneratorDocument(
          new AudienceQuestionGeneratorDocumentId(value.id.toString()),
        );
      },
    );

    const audienceQuestionDocumentFiles = await Promise.all(
      (audienceQuestionDocument ?? []).map(async (value) => {
        return await this.fileProcessorGateway.uploadFile(value);
      }),
    );

    const createNew = audienceQuestionDocumentFiles.map((value) => {
      const entity = new AudienceQuestionGeneratorDocumentEntity({
        document: value,
        audienceQuestionGenerator,
      });

      return this.audienceQuestionGeneratorDocumentCommandRepositoryGateway.createAudienceQuestionGeneratorDocument(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateAudienceQuestionGeneratorBenefitOnDatabase(
    audienceQuestionGenerator: AudienceQuestionGeneratorEntity,
    audienceQuestionGeneratorBenefitQueryResult: GetAudienceQuestionGeneratorBenefitQueryResult[],
    inssBenefitNumber: string[],
  ): TransactionType[] {
    const deleteCurrent = audienceQuestionGeneratorBenefitQueryResult.map(
      (value) => {
        return this.audienceQuestionGeneratorBenefitCommandRepositoryGateway.deleteAudienceQuestionGeneratorBenefit(
          new AudienceQuestionGeneratorBenefitId(value.id.toString()),
        );
      },
    );

    const createNew = inssBenefitNumber.map((benefitNumber) => {
      const entity = new AudienceQuestionGeneratorBenefitEntity({
        inssBenefitNumber: benefitNumber,
        audienceQuestionGenerator,
      });

      return this.audienceQuestionGeneratorBenefitCommandRepositoryGateway.createAudienceQuestionGeneratorBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateAudienceQuestionGeneratorLegalProceedingOnDatabase(
    audienceQuestionGenerator: AudienceQuestionGeneratorEntity,
    audienceQuestionGeneratorLegalProceedingQueryResult: GetAudienceQuestionGeneratorLegalProceedingQueryResult[],
    legalProceedingNumber: string[],
  ): TransactionType[] {
    const deleteCurrent =
      audienceQuestionGeneratorLegalProceedingQueryResult.map((value) => {
        return this.audienceQuestionGeneratorLegalProceedingCommandRepositoryGateway.deleteAudienceQuestionGeneratorLegalProceeding(
          new AudienceQuestionGeneratorLegalProceedingId(value.id.toString()),
        );
      });

    const createNew = legalProceedingNumber.map((proceedingNumber) => {
      const entity = new AudienceQuestionGeneratorLegalProceedingEntity({
        legalProceedingNumber: proceedingNumber,
        audienceQuestionGenerator,
      });

      return this.audienceQuestionGeneratorLegalProceedingCommandRepositoryGateway.createAudienceQuestionGeneratorLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
