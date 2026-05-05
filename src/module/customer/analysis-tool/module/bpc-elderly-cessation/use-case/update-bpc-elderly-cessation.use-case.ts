import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { BpcElderlyCessationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation/command/bpc-elderly-cessation.command.repository.gateway';
import { BpcElderlyCessationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-inss-benefit/command/bpc-elderly-cessation-inss-benefit.command.repository.gateway';
import { BpcElderlyCessationLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-legal-proceeding/command/bpc-elderly-cessation-legal-proceeding.command.repository.gateway';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import { BpcElderlyCessationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity';
import { UpdateBpcElderlyCessationRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/update-bpc-elderly-cessation.request.dto';
import { UpdateBpcElderlyCessationResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/update-bpc-elderly-cessation.response.dto';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateBpcElderlyCessationUseCase {
  protected readonly _type = UpdateBpcElderlyCessationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcElderlyCessationCommandRepositoryGateway)
    private readonly bpcElderlyCessationCommandRepositoryGateway: BpcElderlyCessationCommandRepositoryGateway,
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
    bpcElderlyCessationId: BpcElderlyCessationId,
    dto: UpdateBpcElderlyCessationRequestDto,
  ): Promise<UpdateBpcElderlyCessationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyCessationNotFoundError,
      );

    const transactions: TransactionType[] = [];
    const currentBpcElderlyCessation =
      analysisToolRecordQueryResult.bpcElderlyCessation;

    if (currentBpcElderlyCessation === null) {
      throw new BpcElderlyCessationNotFoundError();
    }

    const updatedBpcElderlyCessation = new BpcElderlyCessationEntity({
      id: bpcElderlyCessationId,
      analysisName:
        dto.analysisName ?? currentBpcElderlyCessation.analysisName ?? null,
      decisionDate:
        dto.decisionDate ?? currentBpcElderlyCessation.decisionDate ?? null,
      previousInssBenefitNumber:
        dto.previousInssBenefitNumber ??
        currentBpcElderlyCessation.previousInssBenefitNumber ??
        null,
      category: dto.category ?? currentBpcElderlyCessation.category ?? null,
      cessationReason:
        dto.cessationReason ??
        currentBpcElderlyCessation.cessationReason ??
        null,
      cessationReasonDescription:
        dto.cessationReasonDescription ??
        currentBpcElderlyCessation.cessationReasonDescription ??
        null,
      isAppealDeadlineExpired:
        dto.isAppealDeadlineExpired ??
        currentBpcElderlyCessation.isAppealDeadlineExpired ??
        null,
      myInssPassword:
        dto.myInssPassword ?? currentBpcElderlyCessation.myInssPassword ?? null,
      civilStatus:
        dto.civilStatus ?? currentBpcElderlyCessation.civilStatus ?? null,
      educationLevel:
        dto.educationLevel ?? currentBpcElderlyCessation.educationLevel ?? null,
      currentAddress:
        dto.currentAddress ?? currentBpcElderlyCessation.currentAddress ?? null,
      previousAddress:
        dto.previousAddress ??
        currentBpcElderlyCessation.previousAddress ??
        null,
      hasAddressChangedSinceDecision:
        dto.hasAddressChangedSinceDecision ??
        currentBpcElderlyCessation.hasAddressChangedSinceDecision ??
        null,
      livesAlone:
        dto.livesAlone ?? currentBpcElderlyCessation.livesAlone ?? null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    transactions.push(
      this.bpcElderlyCessationCommandRepositoryGateway.updateBpcElderlyCessation(
        bpcElderlyCessationId,
        updatedBpcElderlyCessation,
      ),
    );

    if (dto.analysisToolClientId !== undefined) {
      transactions.push(
        this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordAnalysisToolClient(
          analysisToolRecordQueryResult.id,
          dto.analysisToolClientId,
        ),
      );
    }

    if (dto.inssBenefitNumbers !== undefined) {
      for (const inssBenefit of currentBpcElderlyCessation.bpcElderlyCessationInssBenefit) {
        transactions.push(
          this.bpcElderlyCessationInssBenefitCommandRepositoryGateway.deleteBpcElderlyCessationInssBenefit(
            inssBenefit.id,
          ),
        );
      }

      for (const inssBenefitNumber of dto.inssBenefitNumbers) {
        transactions.push(
          this.bpcElderlyCessationInssBenefitCommandRepositoryGateway.createBpcElderlyCessationInssBenefit(
            new BpcElderlyCessationInssBenefitEntity({
              inssBenefitNumber,
              bpcElderlyCessationId,
            }),
          ),
        );
      }
    }

    if (dto.legalProceedingNumbers !== undefined) {
      for (const legalProceeding of currentBpcElderlyCessation.bpcElderlyCessationLegalProceeding) {
        transactions.push(
          this.bpcElderlyCessationLegalProceedingCommandRepositoryGateway.deleteBpcElderlyCessationLegalProceeding(
            legalProceeding.id,
          ),
        );
      }

      for (const legalProceedingNumber of dto.legalProceedingNumbers) {
        transactions.push(
          this.bpcElderlyCessationLegalProceedingCommandRepositoryGateway.createBpcElderlyCessationLegalProceeding(
            new BpcElderlyCessationLegalProceedingEntity({
              legalProceedingNumber,
              bpcElderlyCessationId,
            }),
          ),
        );
      }
    }

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return UpdateBpcElderlyCessationResponseDto.build({
      bpcElderlyCessationId,
    });
  }
}
