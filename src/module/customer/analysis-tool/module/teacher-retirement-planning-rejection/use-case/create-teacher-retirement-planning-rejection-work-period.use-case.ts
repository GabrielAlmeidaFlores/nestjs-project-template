import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-work-period/command/teacher-retirement-planning-rejection-work-period.command.repository.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-work-period-document/command/teacher-retirement-planning-rejection-work-period-document.command.repository.gateway';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-work-period-earnings-history/command/teacher-retirement-planning-rejection-work-period-earnings-history.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/teacher-retirement-planning-rejection-work-period.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/teacher-retirement-planning-rejection-work-period-document.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/value-object/teacher-retirement-planning-rejection-work-period-document-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/teacher-retirement-planning-rejection-work-period-earnings-history.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/value-object/teacher-retirement-planning-rejection-work-period-earnings-history-id.value-object';
import {
  CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto,
  TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryItemRequestDto,
  TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection-work-period.request.dto';
import { CreateTeacherRetirementPlanningRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-work-period.response.dto';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateTeacherRetirementPlanningRejectionWorkPeriodUseCase {
  protected readonly _type =
    CreateTeacherRetirementPlanningRejectionWorkPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway: TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(
      TeacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway,
    )
    private readonly teacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway: TeacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly teacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    dto: CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRejectionWorkPeriodResponseDto> {
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

    const transactions: TransactionType[] = [];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodId =
        new TeacherRetirementPlanningRejectionWorkPeriodId();

      transactions.push(
        this.teacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway.createTeacherRetirementPlanningRejectionWorkPeriod(
          this.buildWorkPeriodEntity(
            workPeriodId,
            teacherRetirementPlanningRejectionId,
            workPeriodDto,
          ),
        ),
      );

      if (workPeriodDto.documents && workPeriodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          workPeriodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const fileName =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.teacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway.createTeacherRetirementPlanningRejectionWorkPeriodDocument(
              new TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity({
                id: new TeacherRetirementPlanningRejectionWorkPeriodDocumentId(),
                fileName,
                teacherRetirementPlanningRejectionWorkPeriodId: workPeriodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (earningsHistoryDto) =>
            this.teacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway.createTeacherRetirementPlanningRejectionWorkPeriodEarningsHistory(
              this.buildEarningsHistoryEntity(
                new TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId(),
                workPeriodId,
                earningsHistoryDto,
              ),
            ),
        );

        transactions.push(...earningsHistoryTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateTeacherRetirementPlanningRejectionWorkPeriodResponseDto.build({
      teacherRetirementPlanningRejectionId,
    });
  }

  private buildEarningsHistoryEntity(
    id: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId,
    teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId,
    dto: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryItemRequestDto,
  ): TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity {
    return new TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity(
      {
        id,
        competence: dto.competence?.toISOString() ?? null,
        remuneration: dto.remuneration ?? null,
        indicators: dto.indicators ?? null,
        paymentDate: dto.paymentDate ?? null,
        contribution: dto.contribution ?? null,
        contributionSalary: dto.contributionSalary ?? null,
        competenceBelowMinimum: dto.competenceBelowMinimum ?? null,
        teacherRetirementPlanningRejectionWorkPeriodId,
      },
    );
  }

  private buildWorkPeriodEntity(
    workPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    workPeriodDto: TeacherRetirementPlanningRejectionWorkPeriodItemRequestDto,
  ): TeacherRetirementPlanningRejectionWorkPeriodEntity {
    return new TeacherRetirementPlanningRejectionWorkPeriodEntity({
      id: workPeriodId,
      bondOrigin: workPeriodDto.bondOrigin ?? null,
      startDate: workPeriodDto.startDate ?? null,
      endDate: workPeriodDto.endDate ?? null,
      category: workPeriodDto.category ?? null,
      activityDescription: workPeriodDto.activityDescription ?? null,
      competenceBelowTheMinimum:
        workPeriodDto.competenceBelowTheMinimum ?? null,
      pendencyReason: workPeriodDto.pendencyReason ?? null,
      periodConsideration: workPeriodDto.periodConsideration ?? null,
      contributionAverage: workPeriodDto.contributionAverage ?? null,
      status: workPeriodDto.status ?? null,
      gracePeriod: workPeriodDto.gracePeriod ?? null,
      impactMonths: workPeriodDto.impactMonths ?? null,
      isPendency: workPeriodDto.isPendency ?? null,
      wantsToComplementViaMeuINSS:
        workPeriodDto.wantsToComplementViaMeuINSS ?? null,
      hasSpecialPeriod: workPeriodDto.hasSpecialPeriod ?? null,
      timelineClassification: workPeriodDto.timelineClassification ?? null,
      teacherRetirementPlanningRejectionId,
    });
  }
}
