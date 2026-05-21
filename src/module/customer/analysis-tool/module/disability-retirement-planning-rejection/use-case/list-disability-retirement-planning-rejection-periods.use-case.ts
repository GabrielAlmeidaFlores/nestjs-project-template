import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/disability-retirement-planning-rejection-period.query.repository.gateway';
import { ListDisabilityRetirementPlanningRejectionPeriodQueryParam } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/query/param/list-disability-retirement-planning-rejection-period.query.param';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { ListDisabilityRetirementPlanningRejectionPeriodsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/list-disability-retirement-planning-rejection-periods.request.dto';
import { GetDisabilityRetirementPlanningRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/get-disability-retirement-planning-rejection-period.response.dto';
import { ListDisabilityRetirementPlanningRejectionPeriodsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/list-disability-retirement-planning-rejection-periods.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListDisabilityRetirementPlanningRejectionPeriodsUseCase {
  protected readonly _type =
    ListDisabilityRetirementPlanningRejectionPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway: DisabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    dto: ListDisabilityRetirementPlanningRejectionPeriodsRequestDto,
  ): Promise<ListDisabilityRetirementPlanningRejectionPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const listParam =
      new ListDisabilityRetirementPlanningRejectionPeriodQueryParam({
        ...dto,
        disabilityRetirementPlanningRejection:
          disabilityRetirementPlanningRejectionId,
      });

    const listQueryResult =
      await this.disabilityRetirementPlanningRejectionPeriodQueryRepositoryGateway.listByDisabilityRetirementPlanningRejectionId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        listParam,
      );

    const resource = listQueryResult.resource.map((item) =>
      GetDisabilityRetirementPlanningRejectionPeriodResponseDto.build({
        ...item,
      }),
    );

    return ListDisabilityRetirementPlanningRejectionPeriodsResponseDto.build({
      ...listQueryResult,
      resource,
    });
  }
}
