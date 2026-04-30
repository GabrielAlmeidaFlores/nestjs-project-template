import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-time-accelerator/command/teacher-retirement-planning-rejection-time-accelerator.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';
import { DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/delete-teacher-retirement-planning-rejection-time-accelerator.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway: TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    teacherRetirementPlanningRejectionTimeAcceleratorId: TeacherRetirementPlanningRejectionTimeAcceleratorId,
  ): Promise<DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.teacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway.deleteTeacherRetirementPlanningRejectionTimeAccelerator(
        teacherRetirementPlanningRejectionTimeAcceleratorId,
      ),
    );

    await transaction.commit();

    return DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto.build(
      {
        teacherRetirementPlanningRejectionId,
      },
    );
  }
}
