import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/disability-retirement-planning-rejection-time-accelerator.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { ListDisabilityRetirementPlanningRejectionTimeAcceleratorsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/list-disability-retirement-planning-rejection-time-accelerators.request.dto';
import { GetDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/get-disability-retirement-planning-rejection-time-accelerator.response.dto';
import { ListDisabilityRetirementPlanningRejectionTimeAcceleratorsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/list-disability-retirement-planning-rejection-time-accelerators.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListDisabilityRetirementPlanningRejectionTimeAcceleratorsUseCase {
  protected readonly _type =
    ListDisabilityRetirementPlanningRejectionTimeAcceleratorsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway: DisabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    _dto: ListDisabilityRetirementPlanningRejectionTimeAcceleratorsRequestDto,
  ): Promise<ListDisabilityRetirementPlanningRejectionTimeAcceleratorsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const timeAccelerators =
      await this.disabilityRetirementPlanningRejectionTimeAcceleratorQueryRepositoryGateway.findByDisabilityRetirementPlanningRejectionId(
        disabilityRetirementPlanningRejectionId,
      );

    const resource = timeAccelerators.map((item) =>
      GetDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto.build({
        ...item,
      }),
    );

    const totalItems = resource.length;
    return ListDisabilityRetirementPlanningRejectionTimeAcceleratorsResponseDto.build(
      {
        resource,
        page: 1,
        limit: totalItems || 1,
        totalItems,
        totalPages: 1,
        amountItemsCurrentPage: totalItems,
      },
    );
  }
}
