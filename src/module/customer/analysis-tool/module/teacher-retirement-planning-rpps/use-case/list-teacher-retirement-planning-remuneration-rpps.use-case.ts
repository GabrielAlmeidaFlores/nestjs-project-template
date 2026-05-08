import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { ListTeacherRetirementPlanningRppsRemunerationQueryParam } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-remuneration/query/param/list-teacher-retirement-planning-remuneration.query.param';
import { TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-remuneration/query/teacher-retirement-planning-remuneration.query.repository.gateway';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { ListTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/list-teacher-retirement-planning-remuneration.request.dto';
import { GetTeacherRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/get-teacher-retirement-planning-remuneration.response.dto';
import { ListTeacherRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/list-teacher-retirement-planning-remuneration.response.dto';
import { TeacherRetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/error/teacher-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListTeacherRetirementPlanningRemunerationRppsUseCase {
  protected readonly _type =
    ListTeacherRetirementPlanningRemunerationRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningRppsQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRemunerationQueryRepositoryGateway: TeacherRetirementPlanningRppsRemunerationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    dto: ListTeacherRetirementPlanningRemunerationRequestDto,
  ): Promise<ListTeacherRetirementPlanningRemunerationResponseDto> {
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
      await this.teacherRetirementPlanningRemunerationQueryRepositoryGateway.listByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        teacherRetirementPlanningId,
        new ListTeacherRetirementPlanningRppsRemunerationQueryParam(dto),
      );

    return ListTeacherRetirementPlanningRemunerationResponseDto.build({
      ...remunerations,
      resource: remunerations.resource.map((resource) =>
        GetTeacherRetirementPlanningRppsRemunerationResponseDto.build({
          contributionDate: resource.contributionDate,
          amount: resource.amount,
        }),
      ),
    });
  }
}
