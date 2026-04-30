import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-work-period/command/teacher-retirement-planning-rejection-work-period.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import { DeleteTeacherRetirementPlanningRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/delete-teacher-retirement-planning-rejection-work-period.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteTeacherRetirementPlanningRejectionWorkPeriodUseCase {
  protected readonly _type =
    DeleteTeacherRetirementPlanningRejectionWorkPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway: TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId,
  ): Promise<DeleteTeacherRetirementPlanningRejectionWorkPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.teacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway.deleteTeacherRetirementPlanningRejectionWorkPeriod(
        teacherRetirementPlanningRejectionWorkPeriodId,
      ),
    );

    await transaction.commit();

    return DeleteTeacherRetirementPlanningRejectionWorkPeriodResponseDto.build({
      teacherRetirementPlanningRejectionId,
    });
  }
}
