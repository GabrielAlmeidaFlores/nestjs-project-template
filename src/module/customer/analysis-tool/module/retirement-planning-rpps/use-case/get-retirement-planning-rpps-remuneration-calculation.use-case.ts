import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-not-found.error';
import { RetirementPlanningRppsRemunerationCalculationNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-remuneration-calculation-not-found.error';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration-calculation/query/retirement-planning-rpps-remuneration-calculation.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { GetRetirementPlanningRppsRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/get-retirement-planning-rpps-remuneration-calculation.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPlanningRppsRemunerationCalculationUseCase {
  protected readonly _type =
    GetRetirementPlanningRppsRemunerationCalculationUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway)
    private readonly retirementPlanningRppsRemunerationCalculationQueryRepositoryGateway: RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsRemunerationCalculationResponseDto> {
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

    const calculation =
      await this.retirementPlanningRppsRemunerationCalculationQueryRepositoryGateway.findOneByRetirementPlanningRppsId(
        retirementPlanningRppsId,
      );

    if (!calculation) {
      throw new RetirementPlanningRppsRemunerationCalculationNotFoundError();
    }

    return GetRetirementPlanningRppsRemunerationCalculationResponseDto.build({
      ...calculation,
    });
  }
}
