import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/command/disability-retirement-planning-grant-disability-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/query/disability-retirement-planning-grant-disability-period.query.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period-document/command/disability-retirement-planning-grant-disability-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import { DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/delete-disability-retirement-planning-grant-disability-period.response.dto';
import { DisabilityRetirementPlanningGrantDisabilityPeriodNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-disability-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase {
  protected readonly _type =
    DeleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway: DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway: DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    disabilityRetirementPlanningGrantDisabilityPeriodId: DisabilityRetirementPlanningGrantDisabilityPeriodId,
  ): Promise<DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingDisabilityPeriod =
      await this.disabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantDisabilityPeriodIdOrFail(
        disabilityRetirementPlanningGrantDisabilityPeriodId,
        DisabilityRetirementPlanningGrantDisabilityPeriodNotFoundError,
      );

    const deletedDisabilityPeriod =
      new DisabilityRetirementPlanningGrantDisabilityPeriodEntity({
        id: disabilityRetirementPlanningGrantDisabilityPeriodId,
        disabilityDegree: existingDisabilityPeriod.disabilityDegree,
        disabilityCategory: existingDisabilityPeriod.disabilityCategory,
        disabilityDescription: existingDisabilityPeriod.disabilityDescription,
        dailyImpact: existingDisabilityPeriod.dailyImpact,
        startDate: existingDisabilityPeriod.startDate,
        endDate: existingDisabilityPeriod.endDate,
        cidTenId: existingDisabilityPeriod.cidTenId,
        disabilityRetirementPlanningGrantId,
        deletedAt: new Date(),
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.disabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningGrantDisabilityPeriodId(
        disabilityRetirementPlanningGrantDisabilityPeriodId,
      ),
      this.disabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway.updateDisabilityRetirementPlanningGrantDisabilityPeriod(
        disabilityRetirementPlanningGrantDisabilityPeriodId,
        deletedDisabilityPeriod,
      ),
    ]);

    await transaction.commit();

    return DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto.build(
      {
        disabilityRetirementPlanningGrantId,
      },
    );
  }
}
