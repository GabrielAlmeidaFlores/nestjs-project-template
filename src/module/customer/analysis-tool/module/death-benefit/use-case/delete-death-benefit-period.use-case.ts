import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeathBenefitPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/command/death-benefit-period.command.repository.gateway';
import { DeathBenefitPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/query/death-benefit-period.query.repository.gateway';
import { DeathBenefitPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period-document/command/death-benefit-period-document.command.repository.gateway';
import { DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period-earnings-history/command/death-benefit-period-earnings-history.command.repository.gateway';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/death-benefit-period.entity';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { DeleteDeathBenefitPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/delete-death-benefit-period.response.dto';
import { DeathBenefitPeriodNotFoundError } from '@module/customer/analysis-tool/module/death-benefit/error/death-benefit-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDeathBenefitPeriodUseCase {
  protected readonly _type = DeleteDeathBenefitPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitPeriodQueryRepositoryGateway)
    private readonly deathBenefitPeriodQueryRepositoryGateway: DeathBenefitPeriodQueryRepositoryGateway,
    @Inject(DeathBenefitPeriodCommandRepositoryGateway)
    private readonly deathBenefitPeriodCommandRepositoryGateway: DeathBenefitPeriodCommandRepositoryGateway,
    @Inject(DeathBenefitPeriodDocumentCommandRepositoryGateway)
    private readonly deathBenefitPeriodDocumentCommandRepositoryGateway: DeathBenefitPeriodDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway)
    private readonly deathBenefitPeriodEarningsHistoryCommandRepositoryGateway: DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitId: DeathBenefitId,
    deathBenefitPeriodId: DeathBenefitPeriodId,
  ): Promise<DeleteDeathBenefitPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingPeriod =
      await this.deathBenefitPeriodQueryRepositoryGateway.findOneByDeathBenefitPeriodIdOrFail(
        deathBenefitPeriodId,
        DeathBenefitPeriodNotFoundError,
      );

    const deletedPeriod = new DeathBenefitPeriodEntity({
      id: deathBenefitPeriodId,
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
      deathBenefitId,
      deletedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.deathBenefitPeriodDocumentCommandRepositoryGateway.deleteAllByDeathBenefitPeriodId(
        deathBenefitPeriodId,
      ),
      this.deathBenefitPeriodEarningsHistoryCommandRepositoryGateway.deleteAllByDeathBenefitPeriodId(
        deathBenefitPeriodId,
      ),
      this.deathBenefitPeriodCommandRepositoryGateway.updateDeathBenefitPeriod(
        deathBenefitPeriodId,
        deletedPeriod,
      ),
    ]);

    await transaction.commit();

    return DeleteDeathBenefitPeriodResponseDto.build({ deathBenefitId });
  }
}
