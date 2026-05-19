import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/command/death-benefit-rejection-period.command.repository.gateway';
import { DeathBenefitRejectionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/query/death-benefit-rejection-period.query.repository.gateway';
import { DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period-document/command/death-benefit-rejection-period-document.command.repository.gateway';
import { DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period-earnings-history/command/death-benefit-rejection-period-earnings-history.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/death-benefit-rejection-period.entity';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeleteDeathBenefitRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/delete-death-benefit-rejection-period.response.dto';
import { DeathBenefitRejectionPeriodNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDeathBenefitRejectionPeriodUseCase {
  protected readonly _type = DeleteDeathBenefitRejectionPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionPeriodQueryRepositoryGateway)
    private readonly deathBenefitRejectionPeriodQueryRepositoryGateway: DeathBenefitRejectionPeriodQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionPeriodCommandRepositoryGateway)
    private readonly deathBenefitRejectionPeriodCommandRepositoryGateway: DeathBenefitRejectionPeriodCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway)
    private readonly deathBenefitRejectionPeriodDocumentCommandRepositoryGateway: DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway)
    private readonly deathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway: DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId,
  ): Promise<DeleteDeathBenefitRejectionPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingPeriod =
      await this.deathBenefitRejectionPeriodQueryRepositoryGateway.findOneByDeathBenefitRejectionPeriodIdOrFail(
        deathBenefitRejectionPeriodId,
        DeathBenefitRejectionPeriodNotFoundError,
      );

    const deletedPeriod = new DeathBenefitRejectionPeriodEntity({
      id: deathBenefitRejectionPeriodId,
      startDate: existingPeriod.startDate,
      endDate: existingPeriod.endDate,
      category: existingPeriod.category,
      isPendency: existingPeriod.isPendency,
      competenceBelowTheMinimum: existingPeriod.competenceBelowTheMinimum,
      pendencyReason: existingPeriod.pendencyReason,
      typeOfContribution: existingPeriod.typeOfContribution,
      status: existingPeriod.status,
      periodConsideration: existingPeriod.periodConsideration,
      contributionAverage: existingPeriod.contributionAverage,
      bondOrigin: existingPeriod.bondOrigin,
      deathBenefitRejectionId,
      deletedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.deathBenefitRejectionPeriodDocumentCommandRepositoryGateway.deleteAllByDeathBenefitRejectionPeriodId(
        deathBenefitRejectionPeriodId,
      ),
      this.deathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway.deleteAllByDeathBenefitRejectionPeriodId(
        deathBenefitRejectionPeriodId,
      ),
      this.deathBenefitRejectionPeriodCommandRepositoryGateway.updateDeathBenefitRejectionPeriod(
        deathBenefitRejectionPeriodId,
        deletedPeriod,
      ),
    ]);

    await transaction.commit();

    return DeleteDeathBenefitRejectionPeriodResponseDto.build({
      deathBenefitRejectionId,
    });
  }
}
