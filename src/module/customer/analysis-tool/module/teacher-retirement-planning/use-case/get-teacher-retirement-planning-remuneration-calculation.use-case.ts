import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/teacher-retirement-planning-remuneration.query.repository.gateway';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { GetTeacherRetirementPlanningRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/get-teacher-retirement-planning-remuneration-calculation.response.dto';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetTeacherRetirementPlanningRemunerationCalculationUseCase {
  protected readonly _type =
    GetTeacherRetirementPlanningRemunerationCalculationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRemunerationQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRemunerationQueryRepositoryGateway: TeacherRetirementPlanningRemunerationQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningRemunerationCalculationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const planning =
      await this.teacherRetirementPlanningQueryRepositoryGateway.findOneTeacherRetirementPlanningById(
        teacherRetirementPlanningId,
      );

    if (planning === null) {
      throw new TeacherRetirementPlanningNotFoundError();
    }

    const remunerations =
      await this.teacherRetirementPlanningRemunerationQueryRepositoryGateway.findByTeacherRetirementPlanningId(
        teacherRetirementPlanningId,
      );

    const calculation = this.remunerationCalculatorGateway.calculate(
      remunerations.map((item) =>
        RemunerationDataInputModel.build({
          remunerationDate: item.contributionDate,
          remunerationAmount: item.amount,
        }),
      ),
    );

    return GetTeacherRetirementPlanningRemunerationCalculationResponseDto.build(
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
