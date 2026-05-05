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
import { BpcDisabilityTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/command/bpc-disability-termination.command.repository.gateway';
import { BpcDisabilityTerminationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-inss-benefit/command/bpc-disability-termination-inss-benefit.command.repository.gateway';
import { BpcDisabilityTerminationLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-legal-proceeding/command/bpc-disability-termination-legal-proceeding.command.repository.gateway';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import { CreateBpcDisabilityTerminationRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/create-bpc-disability-termination.request.dto';
import { CreateBpcDisabilityTerminationResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateBpcDisabilityTerminationUseCase {
  protected readonly _type = CreateBpcDisabilityTerminationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationCommandRepositoryGateway: BpcDisabilityTerminationCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityTerminationInssBenefitCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationInssBenefitCommandRepositoryGateway: BpcDisabilityTerminationInssBenefitCommandRepositoryGateway,
    @Inject(BpcDisabilityTerminationLegalProceedingCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationLegalProceedingCommandRepositoryGateway: BpcDisabilityTerminationLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateBpcDisabilityTerminationRequestDto,
  ): Promise<CreateBpcDisabilityTerminationResponseDto> {
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

    const bpcDisabilityTermination = new BpcDisabilityTerminationEntity({
      analysisName: dto.analysisName ?? null,
      category: dto.category ?? null,
      disabilityType: dto.disabilityType ?? null,
      disabilityDegree: dto.disabilityDegree ?? null,
      benefitCessationReason: dto.benefitCessationReason ?? null,
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
      type: AnalysisToolRecordTypeEnum.BPC_DISABILITY_TERMINATION,
      bpcDisabilityTermination,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const createBpcDisabilityTerminationTransaction =
      this.bpcDisabilityTerminationCommandRepositoryGateway.createBpcDisabilityTermination(
        bpcDisabilityTermination,
      );

    const createAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const inssBenefitTransactions = (dto.inssBenefitNumbers ?? []).map(
      (inssBenefitNumber) =>
        this.bpcDisabilityTerminationInssBenefitCommandRepositoryGateway.createBpcDisabilityTerminationInssBenefit(
          new BpcDisabilityTerminationInssBenefitEntity({
            inssBenefitNumber,
            bpcDisabilityTerminationId: bpcDisabilityTermination.id,
          }),
        ),
    );

    const legalProceedingTransactions = (dto.legalProceedingNumbers ?? []).map(
      (legalProceedingNumber) =>
        this.bpcDisabilityTerminationLegalProceedingCommandRepositoryGateway.createBpcDisabilityTerminationLegalProceeding(
          new BpcDisabilityTerminationLegalProceedingEntity({
            legalProceedingNumber,
            bpcDisabilityTerminationId: bpcDisabilityTermination.id,
          }),
        ),
    );

    const transactions = [
      createBpcDisabilityTerminationTransaction,
      createAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ];

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.BPC_DISABILITY_TERMINATION,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return CreateBpcDisabilityTerminationResponseDto.build({
      bpcDisabilityTerminationId: bpcDisabilityTermination.id,
    });
  }
}
