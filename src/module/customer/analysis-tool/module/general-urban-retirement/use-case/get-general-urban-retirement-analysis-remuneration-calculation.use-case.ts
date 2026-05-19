import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/general-urban-retirement-analysis-remuneration.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-remuneration-calculation.response.dto';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase {
  protected readonly _type =
    GetGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisRemunerationQueryRepositoryGateway: GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdOrFail(
      generalUrbanRetirementAnalysisId,
      organizationSessionData.organizationId,
      GeneralUrbanRetirementAnalysisNotFoundError,
    );

    const remunerations =
      await this.generalUrbanRetirementAnalysisRemunerationQueryRepositoryGateway.findByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        generalUrbanRetirementAnalysisId,
      );

    const calculation = this.remunerationCalculatorGateway.calculate(
      remunerations.map((item) =>
        RemunerationDataInputModel.build({
          remunerationDate: item.remunerationDate,
          remunerationAmount: item.remunerationAmount,
        }),
      ),
    );

    return GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto.build(
      {
        totalCompetencies: calculation.totalCompetencies ?? 0,
        totalAmount: calculation.totalAmount ?? 0,
        averageAmount: calculation.averageAmount ?? 0,
        topEightyPercentCompetencies:
          calculation.topEightyPercentCompetencies ?? 0,
        bottomTwentyPercentCompetencies:
          calculation.bottomTwentyPercentCompetencies ?? 0,
        topEightyPercentAverageAmount:
          calculation.topEightyPercentAverageAmount ?? 0,
      },
    );
  }
}
