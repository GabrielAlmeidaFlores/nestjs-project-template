import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-time-accelerator/command/teacher-retirement-planning-rejection-time-accelerator.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/teacher-retirement-planning-rejection-time-accelerator.entity';
import { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';
import {
  CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
  TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection-time-accelerator.request.dto';
import { CreateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-time-accelerator.response.dto';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase {
  protected readonly _type =
    CreateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(
      TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway,
    )
    private readonly teacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway: TeacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    dto: CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
      teacherRetirementPlanningRejectionId,
      TeacherRetirementPlanningRejectionNotFoundError,
    );

    const transactions: TransactionType[] = dto.timeAccelerators.map((taDto) =>
      this.teacherRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway.createTeacherRetirementPlanningRejectionTimeAccelerator(
        this.buildTimeAcceleratorEntity(
          new TeacherRetirementPlanningRejectionTimeAcceleratorId(),
          teacherRetirementPlanningRejectionId,
          taDto,
        ),
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto.build(
      {
        teacherRetirementPlanningRejectionId,
      },
    );
  }

  private buildTimeAcceleratorEntity(
    id: TeacherRetirementPlanningRejectionTimeAcceleratorId,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    dto: TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto,
  ): TeacherRetirementPlanningRejectionTimeAcceleratorEntity {
    return new TeacherRetirementPlanningRejectionTimeAcceleratorEntity({
      id,
      timeType: dto.timeType ?? null,
      institution: dto.institution ?? null,
      recognitionInss: dto.recognitionInss ?? null,
      affectsQualifyingPeriod: dto.affectsQualifyingPeriod ?? null,
      technicalNote: dto.technicalNote ?? null,
      startDate: dto.startDate ?? null,
      endDate: dto.endDate ?? null,
      gracePeriod: dto.gracePeriod ?? null,
      viability: dto.viability ?? null,
      teacherRetirementPlanningRejectionId,
    });
  }
}
