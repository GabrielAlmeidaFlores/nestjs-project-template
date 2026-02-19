import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { ListRetirementPlanningRppsRemunerationQueryParam } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/query/param/list-retirement-planning-rpps-remuneration.query.param';
import { RetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { ListRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/list-retirement-planning-rpps-remuneration.request.dto';
import { GetRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/get-retirement-planning-rpps-remuneration.response.dto';
import { ListRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/list-retirement-planning-rpps-remuneration.response.dto';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListRetirementPlanningRppsRemunerationUseCase {
  protected readonly _type = ListRetirementPlanningRppsRemunerationUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    protected readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    protected readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationQueryRepositoryGateway)
    protected readonly retirementPlanningRppsRemunerationQueryRepositoryGateway: RetirementPlanningRppsRemunerationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    dto: ListRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<ListRetirementPlanningRppsRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdOrFail(
      retirementPlanningRppsId,
      organizationSessionData.organizationId,
      RetirementPlanningRppsNotFoundError,
    );

    const remunerationList =
      await this.retirementPlanningRppsRemunerationQueryRepositoryGateway.listByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        retirementPlanningRppsId,
        new ListRetirementPlanningRppsRemunerationQueryParam(dto),
      );

    const resource = remunerationList.resource.map((remuneration) =>
      GetRetirementPlanningRppsRemunerationResponseDto.build({
        remunerationDate: remuneration.remunerationDate,
        remunerationAmount: remuneration.remunerationAmount,
      }),
    );

    return ListRetirementPlanningRppsRemunerationResponseDto.build({
      ...remunerationList,
      resource,
    });
  }
}
