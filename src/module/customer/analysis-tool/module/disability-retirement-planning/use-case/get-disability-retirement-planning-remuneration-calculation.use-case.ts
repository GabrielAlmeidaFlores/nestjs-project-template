import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/disability-retirement-planning-remuneration.query.repository.gateway';
import { GetDisabilityRetirementPlanningRemunerationListQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/result/get-disability-retirement-planning-remuneration-list.query.result';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { GetDisabilityRetirementPlanningRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning-remuneration-calculation.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface RemunerationCalculationResultInterface {
  totalCompetencies: number;
  totalAmount: number;
  averageAmount: number;
  topEightyPercentCompetencies: number;
  bottomTwentyPercentCompetencies: number;
  topEightyPercentAverageAmount: number;
}

@Injectable()
export class GetDisabilityRetirementPlanningRemunerationCalculationUseCase {
  private static readonly TOP_EIGHTY_PERCENT = 0.8;

  protected readonly _type =
    GetDisabilityRetirementPlanningRemunerationCalculationUseCase.name;

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
  ): Promise<GetDisabilityRetirementPlanningRemunerationCalculationResponseDto> {
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

    const remunerations =
      await this.disabilityRetirementPlanningRemunerationQueryRepositoryGateway.findByDisabilityRetirementPlanningId(
        disabilityRetirementPlanningId,
      );

    if (remunerations.length === 0) {
      return GetDisabilityRetirementPlanningRemunerationCalculationResponseDto.build(
        {},
      );
    }

    const calculation = this.calculateRemuneration(remunerations);

    return GetDisabilityRetirementPlanningRemunerationCalculationResponseDto.build(
      {
        totalCompetencies: calculation.totalCompetencies,
        totalAmount: calculation.totalAmount,
        averageAmount: calculation.averageAmount,
        topEightyPercentCompetencies: calculation.topEightyPercentCompetencies,
        bottomTwentyPercentCompetencies:
          calculation.bottomTwentyPercentCompetencies,
        topEightyPercentAverageAmount:
          calculation.topEightyPercentAverageAmount,
      },
    );
  }

  private calculateRemuneration(
    remunerations: GetDisabilityRetirementPlanningRemunerationListQueryResult[],
  ): RemunerationCalculationResultInterface {
    const totalCompetencies = remunerations.length;
    const totalAmount = this.sumAmounts(remunerations);
    const averageAmount = totalAmount / totalCompetencies;

    const topEightyPercentCompetencies =
      this.computeTopEightyPercentCount(totalCompetencies);
    const bottomTwentyPercentCompetencies =
      totalCompetencies - topEightyPercentCompetencies;
    const topEightyPercentAverageAmount = this.computeTopEightyPercentAverage(
      remunerations,
      topEightyPercentCompetencies,
    );

    return {
      totalCompetencies,
      totalAmount,
      averageAmount,
      topEightyPercentCompetencies,
      bottomTwentyPercentCompetencies,
      topEightyPercentAverageAmount,
    };
  }

  private sumAmounts(
    remunerations: GetDisabilityRetirementPlanningRemunerationListQueryResult[],
  ): number {
    return remunerations.reduce((sum, r) => sum + r.remunerationAmount, 0);
  }

  private computeTopEightyPercentCount(total: number): number {
    return Math.ceil(
      total *
        GetDisabilityRetirementPlanningRemunerationCalculationUseCase.TOP_EIGHTY_PERCENT,
    );
  }

  private computeTopEightyPercentAverage(
    remunerations: GetDisabilityRetirementPlanningRemunerationListQueryResult[],
    topCount: number,
  ): number {
    const sortedDescending = [...remunerations].sort(
      (a, b) => b.remunerationAmount - a.remunerationAmount,
    );
    const topRemunerations = sortedDescending.slice(0, topCount);
    const topTotal = topRemunerations.reduce(
      (sum, r) => sum + r.remunerationAmount,
      0,
    );

    return topTotal / topCount;
  }
}
