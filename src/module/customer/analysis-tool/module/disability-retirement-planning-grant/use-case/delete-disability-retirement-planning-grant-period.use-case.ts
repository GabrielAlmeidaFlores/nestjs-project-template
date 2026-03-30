import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/command/disability-retirement-planning-grant-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/query/disability-retirement-planning-grant-period.query.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-document/command/disability-retirement-planning-grant-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DeleteDisabilityRetirementPlanningGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/delete-disability-retirement-planning-grant-period.response.dto';
import { DisabilityRetirementPlanningGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDisabilityRetirementPlanningGrantPeriodUseCase {
  protected readonly _type =
    DeleteDisabilityRetirementPlanningGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantPeriodQueryRepositoryGateway: DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantPeriodCommandRepositoryGateway: DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway: DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId,
  ): Promise<DeleteDisabilityRetirementPlanningGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingPeriod =
      await this.disabilityRetirementPlanningGrantPeriodQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantPeriodIdOrFail(
        disabilityRetirementPlanningGrantPeriodId,
        DisabilityRetirementPlanningGrantPeriodNotFoundError,
      );

    const deletedPeriod = new DisabilityRetirementPlanningGrantPeriodEntity({
      id: disabilityRetirementPlanningGrantPeriodId,
      startDate: existingPeriod.startDate,
      endDate: existingPeriod.endDate,
      category: existingPeriod.category,
      isPendency: existingPeriod.isPendency,
      competenceBelowTheMinimum: existingPeriod.competenceBelowTheMinimum,
      pendencyReason: existingPeriod.pendencyReason,
      typeOfContribution: existingPeriod.typeOfContribution,
      status: existingPeriod.status,
      disabilityStatus: existingPeriod.disabilityStatus,
      periodConsideration: existingPeriod.periodConsideration,
      contributionAverage: existingPeriod.contributionAverage,
      disabilityRetirementPlanningGrantId,
      deletedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.disabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningGrantPeriodId(
        disabilityRetirementPlanningGrantPeriodId,
      ),
      this.disabilityRetirementPlanningGrantPeriodCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantPeriod(
        disabilityRetirementPlanningGrantPeriodId,
        deletedPeriod,
      ),
    ]);

    await transaction.commit();

    return DeleteDisabilityRetirementPlanningGrantPeriodResponseDto.build({
      disabilityRetirementPlanningGrantId,
    });
  }
}
