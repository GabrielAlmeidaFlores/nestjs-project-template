import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/command/death-benefit-grant-period.command.repository.gateway';
import { DeathBenefitGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/query/death-benefit-grant-period.query.repository.gateway';
import { DeathBenefitGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-document/command/death-benefit-grant-period-document.command.repository.gateway';
import { DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-earnings-history/command/death-benefit-grant-period-earnings-history.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { DeleteDeathBenefitGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/delete-death-benefit-grant-period.response.dto';
import { DeathBenefitGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDeathBenefitGrantPeriodUseCase {
  protected readonly _type = DeleteDeathBenefitGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantPeriodQueryRepositoryGateway)
    private readonly deathBenefitGrantPeriodQueryRepositoryGateway: DeathBenefitGrantPeriodQueryRepositoryGateway,
    @Inject(DeathBenefitGrantPeriodCommandRepositoryGateway)
    private readonly deathBenefitGrantPeriodCommandRepositoryGateway: DeathBenefitGrantPeriodCommandRepositoryGateway,
    @Inject(DeathBenefitGrantPeriodDocumentCommandRepositoryGateway)
    private readonly deathBenefitGrantPeriodDocumentCommandRepositoryGateway: DeathBenefitGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway)
    private readonly deathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway: DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId,
  ): Promise<DeleteDeathBenefitGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingPeriod =
      await this.deathBenefitGrantPeriodQueryRepositoryGateway.findOneByDeathBenefitGrantPeriodIdOrFail(
        deathBenefitGrantPeriodId,
        DeathBenefitGrantPeriodNotFoundError,
      );

    const deletedPeriod = new DeathBenefitGrantPeriodEntity({
      id: deathBenefitGrantPeriodId,
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
      deathBenefitGrantId,
      deletedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.deathBenefitGrantPeriodDocumentCommandRepositoryGateway.deleteAllByDeathBenefitGrantPeriodId(
        deathBenefitGrantPeriodId,
      ),
      this.deathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway.deleteAllByDeathBenefitGrantPeriodId(
        deathBenefitGrantPeriodId,
      ),
      this.deathBenefitGrantPeriodCommandRepositoryGateway.updateDeathBenefitGrantPeriod(
        deathBenefitGrantPeriodId,
        deletedPeriod,
      ),
    ]);

    await transaction.commit();

    return DeleteDeathBenefitGrantPeriodResponseDto.build({
      deathBenefitGrantId,
    });
  }
}
