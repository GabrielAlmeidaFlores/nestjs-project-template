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
import { BpcElderlyCessationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/command/bpc-elderly-cessation.command.repository.gateway';
import { BpcElderlyCessationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-inss-benefit/command/bpc-elderly-cessation-inss-benefit.command.repository.gateway';
import { BpcElderlyCessationLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-legal-proceeding/command/bpc-elderly-cessation-legal-proceeding.command.repository.gateway';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import { BpcElderlyCessationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity';
import { CreateBpcElderlyCessationRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/create-bpc-elderly-cessation.request.dto';
import { CreateBpcElderlyCessationResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcElderlyCessationUseCase {
  protected readonly _type = CreateBpcElderlyCessationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BpcElderlyCessationCommandRepositoryGateway)
    private readonly bpcElderlyCessationCommandRepositoryGateway: BpcElderlyCessationCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcElderlyCessationInssBenefitCommandRepositoryGateway)
    private readonly bpcElderlyCessationInssBenefitCommandRepositoryGateway: BpcElderlyCessationInssBenefitCommandRepositoryGateway,
    @Inject(BpcElderlyCessationLegalProceedingCommandRepositoryGateway)
    private readonly bpcElderlyCessationLegalProceedingCommandRepositoryGateway: BpcElderlyCessationLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateBpcElderlyCessationRequestDto,
  ): Promise<CreateBpcElderlyCessationResponseDto> {
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

    const bpcElderlyCessation = new BpcElderlyCessationEntity({
      analysisName: dto.analysisName ?? null,
      decisionDate: dto.decisionDate ?? null,
      previousInssBenefitNumber: dto.previousInssBenefitNumber ?? null,
      category: dto.category ?? null,
      cessationReason: dto.cessationReason ?? null,
      cessationReasonDescription: dto.cessationReasonDescription ?? null,
      isAppealDeadlineExpired: dto.isAppealDeadlineExpired ?? null,
      myInssPassword: dto.myInssPassword ?? null,
      civilStatus: dto.civilStatus ?? null,
      educationLevel: dto.educationLevel ?? null,
      currentAddress: dto.currentAddress ?? null,
      previousAddress: dto.previousAddress ?? null,
      hasAddressChangedSinceDecision:
        dto.hasAddressChangedSinceDecision ?? null,
      livesAlone: dto.livesAlone ?? null,
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
      type: AnalysisToolRecordTypeEnum.BPC_ELDERLY_CESSATION,
      bpcElderlyCessation,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const createBpcElderlyCessationTransaction =
      this.bpcElderlyCessationCommandRepositoryGateway.createBpcElderlyCessation(
        bpcElderlyCessation,
      );

    const createAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const inssBenefitTransactions = (dto.inssBenefitNumbers ?? []).map(
      (inssBenefitNumber) =>
        this.bpcElderlyCessationInssBenefitCommandRepositoryGateway.createBpcElderlyCessationInssBenefit(
          new BpcElderlyCessationInssBenefitEntity({
            inssBenefitNumber,
            bpcElderlyCessationId: bpcElderlyCessation.id,
          }),
        ),
    );

    const legalProceedingTransactions = (dto.legalProceedingNumbers ?? []).map(
      (legalProceedingNumber) =>
        this.bpcElderlyCessationLegalProceedingCommandRepositoryGateway.createBpcElderlyCessationLegalProceeding(
          new BpcElderlyCessationLegalProceedingEntity({
            legalProceedingNumber,
            bpcElderlyCessationId: bpcElderlyCessation.id,
          }),
        ),
    );

    const transactions = [
      createBpcElderlyCessationTransaction,
      createAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ];

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.BPC_ELDERLY_CESSATION,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return CreateBpcElderlyCessationResponseDto.build({
      bpcElderlyCessationId: bpcElderlyCessation.id,
    });
  }
}
