import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/disability-retirement-planning-remuneration.query.repository.gateway';
import { ListDisabilityRetirementPlanningRemunerationQueryParam } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/param/list-disability-retirement-planning-remuneration.query.param';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { ListDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/list-disability-retirement-planning-remuneration.request.dto';
import { GetDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning-remuneration.response.dto';
import { ListDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/list-disability-retirement-planning-remuneration.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListDisabilityRetirementPlanningRemunerationUseCase {
  protected readonly _type =
    ListDisabilityRetirementPlanningRemunerationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRemunerationQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRemunerationQueryRepositoryGateway: DisabilityRetirementPlanningRemunerationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    dto: ListDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<ListDisabilityRetirementPlanningRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const planning =
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (!planning) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const remunerationList =
      await this.disabilityRetirementPlanningRemunerationQueryRepositoryGateway.listByDisabilityRetirementPlanningIdAndOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        disabilityRetirementPlanningId,
        new ListDisabilityRetirementPlanningRemunerationQueryParam(dto),
      );

    const resource = remunerationList.resource.map((remuneration) =>
      GetDisabilityRetirementPlanningRemunerationResponseDto.build({
        remunerationDate: remuneration.remunerationDate,
        remunerationAmount: remuneration.remunerationAmount,
      }),
    );

    return ListDisabilityRetirementPlanningRemunerationResponseDto.build({
      ...remunerationList,
      resource,
    });
  }
}
