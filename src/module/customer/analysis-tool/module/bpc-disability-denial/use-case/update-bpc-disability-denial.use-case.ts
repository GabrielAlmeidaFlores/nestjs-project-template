import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { BpcDisabilityDenialCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial/command/bpc-disability-denial.command.repository.gateway';
import { BpcDisabilityDenialInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-inss-benefit/command/bpc-disability-denial-inss-benefit.command.repository.gateway';
import { BpcDisabilityDenialLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-legal-proceeding/command/bpc-disability-denial-legal-proceeding.command.repository.gateway';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import { UpdateBpcDisabilityDenialRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/update-bpc-disability-denial.request.dto';
import { UpdateBpcDisabilityDenialResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/update-bpc-disability-denial.response.dto';
import { BpcDisabilityDenialNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateBpcDisabilityDenialUseCase {
  protected readonly _type = UpdateBpcDisabilityDenialUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityDenialCommandRepositoryGateway)
    private readonly bpcDisabilityDenialCommandRepositoryGateway: BpcDisabilityDenialCommandRepositoryGateway,
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
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    dto: UpdateBpcDisabilityDenialRequestDto,
  ): Promise<UpdateBpcDisabilityDenialResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityDenialNotFoundError,
      );

    const transactions: TransactionType[] = [];
    const currentBpcDisabilityDenial =
      analysisToolRecordQueryResult.bpcDisabilityDenial;

    if (currentBpcDisabilityDenial === null) {
      throw new BpcDisabilityDenialNotFoundError();
    }

    const updatedBpcDisabilityDenial = new BpcDisabilityDenialEntity({
      id: bpcDisabilityDenialId,
      analysisName:
        dto.analysisName ?? currentBpcDisabilityDenial.analysisName ?? null,
      requestEntryDate:
        dto.requestEntryDate ??
        currentBpcDisabilityDenial.requestEntryDate ??
        null,
      denialDate:
        dto.denialDate ?? currentBpcDisabilityDenial.denialDate ?? null,
      requestedBenefitType:
        dto.requestedBenefitType ??
        currentBpcDisabilityDenial.requestedBenefitType ??
        null,
      category: dto.category ?? currentBpcDisabilityDenial.category ?? null,
      denialReason:
        dto.denialReason ?? currentBpcDisabilityDenial.denialReason ?? null,
      denialReasonDescription:
        dto.denialReasonDescription ??
        currentBpcDisabilityDenial.denialReasonDescription ??
        null,
      disabilityType:
        dto.disabilityType ?? currentBpcDisabilityDenial.disabilityType ?? null,
      disabilityDegree:
        dto.disabilityDegree ??
        currentBpcDisabilityDenial.disabilityDegree ??
        null,
      estimatedDisabilityStartDate:
        dto.estimatedDisabilityStartDate ??
        currentBpcDisabilityDenial.estimatedDisabilityStartDate ??
        null,
      attendsSchoolOrTechnicalCourse:
        dto.attendsSchoolOrTechnicalCourse ??
        currentBpcDisabilityDenial.attendsSchoolOrTechnicalCourse ??
        null,
      performsLaborActivity:
        dto.performsLaborActivity ??
        currentBpcDisabilityDenial.performsLaborActivity ??
        null,
      needsThirdPartyHelp:
        dto.needsThirdPartyHelp ??
        currentBpcDisabilityDenial.needsThirdPartyHelp ??
        null,
      hasAccessToBasicServices:
        dto.hasAccessToBasicServices ??
        currentBpcDisabilityDenial.hasAccessToBasicServices ??
        null,
      otherBarriersDescription:
        dto.otherBarriersDescription ??
        currentBpcDisabilityDenial.otherBarriersDescription ??
        null,
      livesAlone:
        dto.livesAlone ?? currentBpcDisabilityDenial.livesAlone ?? null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    transactions.push(
      this.bpcDisabilityDenialCommandRepositoryGateway.updateBpcDisabilityDenial(
        bpcDisabilityDenialId,
        updatedBpcDisabilityDenial,
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
      for (const inssBenefit of currentBpcDisabilityDenial.bpcDisabilityDenialInssBenefit) {
        transactions.push(
          this.bpcDisabilityDenialInssBenefitCommandRepositoryGateway.deleteBpcDisabilityDenialInssBenefit(
            inssBenefit.id,
          ),
        );
      }

      for (const inssBenefitNumber of dto.inssBenefitNumbers) {
        transactions.push(
          this.bpcDisabilityDenialInssBenefitCommandRepositoryGateway.createBpcDisabilityDenialInssBenefit(
            new BpcDisabilityDenialInssBenefitEntity({
              inssBenefitNumber,
              bpcDisabilityDenialId,
            }),
          ),
        );
      }
    }

    if (dto.legalProceedingNumbers !== undefined) {
      for (const legalProceeding of currentBpcDisabilityDenial.bpcDisabilityDenialLegalProceeding) {
        transactions.push(
          this.bpcDisabilityDenialLegalProceedingCommandRepositoryGateway.deleteBpcDisabilityDenialLegalProceeding(
            legalProceeding.id,
          ),
        );
      }

      for (const legalProceedingNumber of dto.legalProceedingNumbers) {
        transactions.push(
          this.bpcDisabilityDenialLegalProceedingCommandRepositoryGateway.createBpcDisabilityDenialLegalProceeding(
            new BpcDisabilityDenialLegalProceedingEntity({
              legalProceedingNumber,
              bpcDisabilityDenialId,
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

    return UpdateBpcDisabilityDenialResponseDto.build({
      bpcDisabilityDenialId,
    });
  }
}
