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
import { BpcDisabilityDenialCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/command/bpc-disability-denial.command.repository.gateway';
import { BpcDisabilityDenialInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-inss-benefit/command/bpc-disability-denial-inss-benefit.command.repository.gateway';
import { BpcDisabilityDenialLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-legal-proceeding/command/bpc-disability-denial-legal-proceeding.command.repository.gateway';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import { CreateBpcDisabilityDenialRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/create-bpc-disability-denial.request.dto';
import { CreateBpcDisabilityDenialResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcDisabilityDenialUseCase {
  protected readonly _type = CreateBpcDisabilityDenialUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialCommandRepositoryGateway)
    private readonly bpcDisabilityDenialCommandRepositoryGateway: BpcDisabilityDenialCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityDenialInssBenefitCommandRepositoryGateway)
    private readonly bpcDisabilityDenialInssBenefitCommandRepositoryGateway: BpcDisabilityDenialInssBenefitCommandRepositoryGateway,
    @Inject(BpcDisabilityDenialLegalProceedingCommandRepositoryGateway)
    private readonly bpcDisabilityDenialLegalProceedingCommandRepositoryGateway: BpcDisabilityDenialLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateBpcDisabilityDenialRequestDto,
  ): Promise<CreateBpcDisabilityDenialResponseDto> {
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

    const bpcDisabilityDenial = new BpcDisabilityDenialEntity({
      analysisName: dto.analysisName ?? null,
      requestEntryDate: dto.requestEntryDate ?? null,
      denialDate: dto.denialDate ?? null,
      requestedBenefitType: dto.requestedBenefitType ?? null,
      category: dto.category ?? null,
      denialReason: dto.denialReason ?? null,
      denialReasonDescription: dto.denialReasonDescription ?? null,
      disabilityType: dto.disabilityType ?? null,
      disabilityDegree: dto.disabilityDegree ?? null,
      estimatedDisabilityStartDate: dto.estimatedDisabilityStartDate ?? null,
      attendsSchoolOrTechnicalCourse:
        dto.attendsSchoolOrTechnicalCourse ?? null,
      performsLaborActivity: dto.performsLaborActivity ?? null,
      needsThirdPartyHelp: dto.needsThirdPartyHelp ?? null,
      hasAccessToBasicServices: dto.hasAccessToBasicServices ?? null,
      otherBarriersDescription: dto.otherBarriersDescription ?? null,
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
      type: AnalysisToolRecordTypeEnum.BPC_DISABILITY_DENIAL,
      bpcDisabilityDenial,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const createBpcDisabilityDenialTransaction =
      this.bpcDisabilityDenialCommandRepositoryGateway.createBpcDisabilityDenial(
        bpcDisabilityDenial,
      );

    const createAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const inssBenefitTransactions = (dto.inssBenefitNumbers ?? []).map(
      (inssBenefitNumber) =>
        this.bpcDisabilityDenialInssBenefitCommandRepositoryGateway.createBpcDisabilityDenialInssBenefit(
          new BpcDisabilityDenialInssBenefitEntity({
            inssBenefitNumber,
            bpcDisabilityDenialId: bpcDisabilityDenial.id,
          }),
        ),
    );

    const legalProceedingTransactions = (dto.legalProceedingNumbers ?? []).map(
      (legalProceedingNumber) =>
        this.bpcDisabilityDenialLegalProceedingCommandRepositoryGateway.createBpcDisabilityDenialLegalProceeding(
          new BpcDisabilityDenialLegalProceedingEntity({
            legalProceedingNumber,
            bpcDisabilityDenialId: bpcDisabilityDenial.id,
          }),
        ),
    );

    const transactions = [
      createBpcDisabilityDenialTransaction,
      createAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ];

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.BPC_DISABILITY_DENIAL,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return CreateBpcDisabilityDenialResponseDto.build({
      bpcDisabilityDenialId: bpcDisabilityDenial.id,
    });
  }
}
