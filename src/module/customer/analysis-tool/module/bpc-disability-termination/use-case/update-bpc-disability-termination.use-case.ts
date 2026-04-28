import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { BpcDisabilityTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination/command/bpc-disability-termination.command.repository.gateway';
import { BpcDisabilityTerminationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-inss-benefit/command/bpc-disability-termination-inss-benefit.command.repository.gateway';
import { BpcDisabilityTerminationLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-legal-proceeding/command/bpc-disability-termination-legal-proceeding.command.repository.gateway';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import { UpdateBpcDisabilityTerminationRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/update-bpc-disability-termination.request.dto';
import { UpdateBpcDisabilityTerminationResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/update-bpc-disability-termination.response.dto';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateBpcDisabilityTerminationUseCase {
  protected readonly _type = UpdateBpcDisabilityTerminationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityTerminationCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationCommandRepositoryGateway: BpcDisabilityTerminationCommandRepositoryGateway,
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
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    dto: UpdateBpcDisabilityTerminationRequestDto,
  ): Promise<UpdateBpcDisabilityTerminationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityTerminationNotFoundError,
      );

    const transactions: TransactionType[] = [];
    const currentBpcDisabilityTermination =
      analysisToolRecordQueryResult.bpcDisabilityTermination;

    if (currentBpcDisabilityTermination === null) {
      throw new BpcDisabilityTerminationNotFoundError();
    }

    const updatedBpcDisabilityTermination = new BpcDisabilityTerminationEntity({
      id: bpcDisabilityTerminationId,
      analysisName:
        dto.analysisName ??
        currentBpcDisabilityTermination.analysisName ??
        null,
      category:
        dto.category ?? currentBpcDisabilityTermination.category ?? null,
      disabilityType:
        dto.disabilityType ??
        currentBpcDisabilityTermination.disabilityType ??
        null,
      disabilityDegree:
        dto.disabilityDegree ??
        currentBpcDisabilityTermination.disabilityDegree ??
        null,
      benefitCessationReason:
        dto.benefitCessationReason ??
        currentBpcDisabilityTermination.benefitCessationReason ??
        null,
      livesAlone:
        dto.livesAlone ?? currentBpcDisabilityTermination.livesAlone ?? null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    transactions.push(
      this.bpcDisabilityTerminationCommandRepositoryGateway.updateBpcDisabilityTermination(
        bpcDisabilityTerminationId,
        updatedBpcDisabilityTermination,
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
      for (const inssBenefit of currentBpcDisabilityTermination.bpcDisabilityTerminationInssBenefit) {
        transactions.push(
          this.bpcDisabilityTerminationInssBenefitCommandRepositoryGateway.deleteBpcDisabilityTerminationInssBenefit(
            inssBenefit.id,
          ),
        );
      }

      for (const inssBenefitNumber of dto.inssBenefitNumbers) {
        transactions.push(
          this.bpcDisabilityTerminationInssBenefitCommandRepositoryGateway.createBpcDisabilityTerminationInssBenefit(
            new BpcDisabilityTerminationInssBenefitEntity({
              inssBenefitNumber,
              bpcDisabilityTerminationId,
            }),
          ),
        );
      }
    }

    if (dto.legalProceedingNumbers !== undefined) {
      for (const legalProceeding of currentBpcDisabilityTermination.bpcDisabilityTerminationLegalProceeding) {
        transactions.push(
          this.bpcDisabilityTerminationLegalProceedingCommandRepositoryGateway.deleteBpcDisabilityTerminationLegalProceeding(
            legalProceeding.id,
          ),
        );
      }

      for (const legalProceedingNumber of dto.legalProceedingNumbers) {
        transactions.push(
          this.bpcDisabilityTerminationLegalProceedingCommandRepositoryGateway.createBpcDisabilityTerminationLegalProceeding(
            new BpcDisabilityTerminationLegalProceedingEntity({
              legalProceedingNumber,
              bpcDisabilityTerminationId,
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

    return UpdateBpcDisabilityTerminationResponseDto.build({
      bpcDisabilityTerminationId,
    });
  }
}
