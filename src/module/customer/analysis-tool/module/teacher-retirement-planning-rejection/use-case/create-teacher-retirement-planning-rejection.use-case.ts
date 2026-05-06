import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TeacherRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/command/teacher-retirement-planning-rejection.command.repository.gateway';
import { TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-inss-benefit/command/teacher-retirement-planning-rejection-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity';
import { TeacherRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/teacher-retirement-planning-rejection-inss-benefit.entity';
import { CreateTeacherRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection.request.dto';
import { CreateTeacherRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTeacherRetirementPlanningRejectionUseCase {
  protected readonly _type =
    CreateTeacherRetirementPlanningRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionCommandRepositoryGateway: TeacherRetirementPlanningRejectionCommandRepositoryGateway,
    @Inject(
      TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway,
    )
    private readonly teacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway: TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateTeacherRetirementPlanningRejectionRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const teacherRetirementPlanningRejection =
      new TeacherRetirementPlanningRejectionEntity({
        analysisName: dto.analysisName ?? null,
        requestEntryDate: dto.requestEntryDate ?? null,
        denialDate: dto.denialDate ?? null,
        category: dto.category ?? null,
        activityType: dto.activityType ?? null,
        activityTypeDescription: dto.activityTypeDescription ?? null,
        denialReason: dto.denialReason ?? null,
        denialReasonDescription: dto.denialReasonDescription ?? null,
      });

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new TeacherRetirementPlanningRejectionInssBenefitEntity({
                inssBenefit: value,
                teacherRetirementPlanningRejectionId:
                  teacherRetirementPlanningRejection.id,
              }),
          )
        : [];

    await this.createOnDatabase(
      teacherRetirementPlanningRejection,
      inssBenefitEntities,
    );

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING_REJECTION,
      cnisFastAnalysis: null,
      teacherRetirementPlanningRejection,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateTeacherRetirementPlanningRejectionResponseDto.build({
      teacherRetirementPlanningRejectionId:
        teacherRetirementPlanningRejection.id,
    });
  }

  private async createOnDatabase(
    teacherRetirementPlanningRejection: TeacherRetirementPlanningRejectionEntity,
    inssBenefitEntities: TeacherRetirementPlanningRejectionInssBenefitEntity[],
  ): Promise<void> {
    const rejectionTransaction =
      this.teacherRetirementPlanningRejectionCommandRepositoryGateway.createTeacherRetirementPlanningRejection(
        teacherRetirementPlanningRejection,
      );

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.teacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway.createTeacherRetirementPlanningRejectionInssBenefit(
        value,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      rejectionTransaction,
      ...inssBenefitTransactions,
    ]);

    await transaction.commit();
  }

  private async createAnalysisToolRecordOnDatabase(
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
