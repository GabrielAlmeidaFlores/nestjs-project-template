import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-remuneration/query/teacher-retirement-planning-remuneration.query.repository.gateway';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { GetTeacherRetirementPlanningRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/get-teacher-retirement-planning-remuneration-calculation.response.dto';
import { TeacherRetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/error/teacher-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetTeacherRetirementPlanningRemunerationCalculationRppsUseCase {
  protected readonly _type =
    GetTeacherRetirementPlanningRemunerationCalculationRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningRppsQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRemunerationQueryRepositoryGateway: TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
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
      throw new TeacherRetirementPlanningRppsNotFoundError();
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
        totalCompetencies: calculation.totalCompetencies,
        totalAmount: calculation.totalAmount,
        averageAmount: calculation.averageAmount,
        topEightyPercentCompetencies:
          calculation.topEightyPercentCompetencies,
        bottomTwentyPercentCompetencies:
          calculation.bottomTwentyPercentCompetencies,
        topEightyPercentAverageAmount:
          calculation.topEightyPercentAverageAmount,
      },
    );
  }
}
