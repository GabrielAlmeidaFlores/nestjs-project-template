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
import { BpcElderlyAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/command/bpc-elderly-analysis.command.repository.gateway';
import { BpcElderlyAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-inss-benefit/command/bpc-elderly-analysis-inss-benefit.command.repository.gateway';
import { BpcElderlyAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-legal-proceeding/command/bpc-elderly-analysis-legal-proceeding.command.repository.gateway';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity';
import { BpcElderlyAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity';
import { CreateBpcElderlyAnalysisRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/request/create-bpc-elderly-analysis.request.dto';
import { CreateBpcElderlyAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcElderlyAnalysisUseCase {
  protected readonly _type = CreateBpcElderlyAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BpcElderlyAnalysisCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisCommandRepositoryGateway: BpcElderlyAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcElderlyAnalysisInssBenefitCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisInssBenefitCommandRepositoryGateway: BpcElderlyAnalysisInssBenefitCommandRepositoryGateway,
    @Inject(BpcElderlyAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisLegalProceedingCommandRepositoryGateway: BpcElderlyAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateBpcElderlyAnalysisRequestDto,
  ): Promise<CreateBpcElderlyAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const bpcElderlyAnalysis = new BpcElderlyAnalysisEntity({
      name: dto.name ?? null,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.BPC_ELDERLY_ANALYSIS,
      bpcElderlyAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const createBpcElderlyAnalysisTransaction =
      this.bpcElderlyAnalysisCommandRepositoryGateway.createBpcElderlyAnalysis(
        bpcElderlyAnalysis,
      );

    const createAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const inssBenefitTransactions = (dto.inssBenefitNumbers ?? []).map(
      (inssBenefitNumber) =>
        this.bpcElderlyAnalysisInssBenefitCommandRepositoryGateway.createBpcElderlyAnalysisInssBenefit(
          new BpcElderlyAnalysisInssBenefitEntity({
            inssBenefitNumber,
            bpcElderlyAnalysisId: bpcElderlyAnalysis.id,
          }),
        ),
    );

    const legalProceedingTransactions = (dto.legalProceedingNumbers ?? []).map(
      (legalProceedingNumber) =>
        this.bpcElderlyAnalysisLegalProceedingCommandRepositoryGateway.createBpcElderlyAnalysisLegalProceeding(
          new BpcElderlyAnalysisLegalProceedingEntity({
            legalProceedingNumber,
            bpcElderlyAnalysisId: bpcElderlyAnalysis.id,
          }),
        ),
    );

    const transactions = [
      createBpcElderlyAnalysisTransaction,
      createAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ];

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.BPC_ELDERLY_ANALYSIS,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return CreateBpcElderlyAnalysisResponseDto.build({
      bpcElderlyAnalysisId: bpcElderlyAnalysis.id,
    });
  }
}
