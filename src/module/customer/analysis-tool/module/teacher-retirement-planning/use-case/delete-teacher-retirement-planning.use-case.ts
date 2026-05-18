import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TeacherRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { DeleteTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/delete-teacher-retirement-planning.response.dto';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteTeacherRetirementPlanningUseCase {
  protected readonly _type = DeleteTeacherRetirementPlanningUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningCommandRepositoryGateway)
    private readonly teacherRetirementPlanningCommandRepositoryGateway: TeacherRetirementPlanningCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<DeleteTeacherRetirementPlanningResponseDto> {
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

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.teacherRetirementPlanningCommandRepositoryGateway.deleteTeacherRetirementPlanning(
        planning.id,
      ),
    ]);

    await transaction.commit();

    return DeleteTeacherRetirementPlanningResponseDto.build({
      teacherRetirementPlanningId: planning.id,
    });
  }
}
