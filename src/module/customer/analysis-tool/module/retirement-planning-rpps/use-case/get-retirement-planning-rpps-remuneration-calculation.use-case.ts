import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { GetRetirementPlanningRppsRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/get-retirement-planning-rpps-remuneration-calculation.response.dto';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-not-found.error';
import { RetirementPlanningRppsRemunerationCalculationNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-remuneration-calculation-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPlanningRppsRemunerationCalculationUseCase {
  protected readonly _type =
    GetRetirementPlanningRppsRemunerationCalculationUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationQueryRepositoryGateway)
    private readonly retirementPlanningRppsRemunerationQueryRepositoryGateway: RetirementPlanningRppsRemunerationQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
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

    const remunerations =
      await this.retirementPlanningRppsRemunerationQueryRepositoryGateway.findByRetirementPlanningRppsId(
        retirementPlanningRppsId,
      );

    if (remunerations.length === 0) {
      throw new RetirementPlanningRppsRemunerationCalculationNotFoundError();
    }

    const calculation = this.remunerationCalculatorGateway.calculate(
      remunerations.map((remuneration) =>
        RemunerationDataInputModel.build({
          remunerationDate: remuneration.remunerationDate,
          remunerationAmount: remuneration.remunerationAmount,
        }),
      ),
    );

    return GetRetirementPlanningRppsRemunerationCalculationResponseDto.build({
      ...calculation,
    });
  }
}
