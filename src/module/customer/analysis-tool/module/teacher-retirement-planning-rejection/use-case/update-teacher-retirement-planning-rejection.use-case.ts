import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TeacherRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/command/teacher-retirement-planning-rejection.command.repository.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-inss-benefit/command/teacher-retirement-planning-rejection-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/teacher-retirement-planning-rejection-inss-benefit.entity';
import { UpdateTeacherRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/update-teacher-retirement-planning-rejection.request.dto';
import { UpdateTeacherRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/update-teacher-retirement-planning-rejection.response.dto';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateTeacherRetirementPlanningRejectionUseCase {
  protected readonly _type =
    UpdateTeacherRetirementPlanningRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionCommandRepositoryGateway: TeacherRetirementPlanningRejectionCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway: TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    dto: UpdateTeacherRetirementPlanningRejectionRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
        teacherRetirementPlanningRejectionId,
        TeacherRetirementPlanningRejectionNotFoundError,
      );

    const updated = new TeacherRetirementPlanningRejectionEntity({
      id: teacherRetirementPlanningRejectionId,
      analysisName: dto.analysisName ?? existing.analysisName,
      requestEntryDate: dto.requestEntryDate ?? existing.requestEntryDate,
      denialDate: dto.denialDate ?? existing.denialDate,
      category: dto.category ?? existing.category,
      activityType: dto.activityType ?? existing.activityType,
      activityTypeDescription:
        dto.activityTypeDescription ?? existing.activityTypeDescription,
      denialReason: dto.denialReason ?? existing.denialReason,
      denialReasonDescription:
        dto.denialReasonDescription ?? existing.denialReasonDescription,
      teacherRetirementPlanningRejectionResultId:
        existing.result?.id ?? null,
    });

    const transactions: TransactionType[] = [
      this.teacherRetirementPlanningRejectionCommandRepositoryGateway.updateTeacherRetirementPlanningRejection(
        teacherRetirementPlanningRejectionId,
        updated,
      ),
    ];

    if (dto.inssBenefitNumber !== undefined) {
      transactions.push(
        this.teacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway.deleteAllByTeacherRetirementPlanningRejectionId(
          teacherRetirementPlanningRejectionId,
        ),
      );

      transactions.push(
        ...dto.inssBenefitNumber.map((inssBenefit) =>
          this.teacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway.createTeacherRetirementPlanningRejectionInssBenefit(
            new TeacherRetirementPlanningRejectionInssBenefitEntity({
              inssBenefit,
              teacherRetirementPlanningRejectionId,
            }),
          ),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTeacherRetirementPlanningRejectionResponseDto.build({
      teacherRetirementPlanningRejectionId,
    });
  }
}
