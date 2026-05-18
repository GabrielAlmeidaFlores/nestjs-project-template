import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period/command/teacher-retirement-planning-period.command.repository.gateway';
import { TeacherRetirementPlanningRppsPeriodItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item/command/teacher-retirement-planning-period-item.command.repository.gateway';
import { TeacherRetirementPlanningRppsPeriodItemDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item-document/command/teacher-retirement-planning-period-item-document.command.repository.gateway';
import { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import { TeacherRetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';
import { TeacherRetirementPlanningRppsPeriodItemWorkloadTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-workload-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import { TeacherRetirementPlanningRppsPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';
import { TeacherRetirementPlanningRppsPeriodItemDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity';
import { TeacherRetirementPlanningRppsPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';
import { CreateTeacherRetirementPlanningPeriodItemRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/create-teacher-retirement-planning-period.request.dto';
import { UpdateTeacherRetirementPlanningPeriodRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/update-teacher-retirement-planning-period.request.dto';
import { UpdateTeacherRetirementPlanningPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/update-teacher-retirement-planning-period.response.dto';
import { TeacherRetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/error/teacher-retirement-planning-not-found.error';
import { TeacherRetirementPlanningRppsPeriodItemDatesRequiredForPartTimeError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/error/teacher-retirement-planning-period-item-dates-required-for-part-time.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTeacherRetirementPlanningPeriodRppsUseCase {
  protected readonly _type =
    UpdateTeacherRetirementPlanningPeriodRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningRppsQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsPeriodCommandRepositoryGateway)
    private readonly teacherRetirementPlanningPeriodCommandRepositoryGateway: TeacherRetirementPlanningRppsPeriodCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsPeriodItemCommandRepositoryGateway)
    private readonly teacherRetirementPlanningPeriodItemCommandRepositoryGateway: TeacherRetirementPlanningRppsPeriodItemCommandRepositoryGateway,
    @Inject(
      TeacherRetirementPlanningRppsPeriodItemDocumentCommandRepositoryGateway,
    )
    private readonly teacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway: TeacherRetirementPlanningRppsPeriodItemDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    dto: UpdateTeacherRetirementPlanningPeriodRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const planning =
      await this.teacherRetirementPlanningQueryRepositoryGateway.findOneTeacherRetirementPlanningByIdWithRelations(
        teacherRetirementPlanningId,
      );

    if (planning === null) {
      throw new TeacherRetirementPlanningRppsNotFoundError();
    }

    const planningEntity = new TeacherRetirementPlanningRppsEntity({
      id: planning.id,
      federativeEntity: planning.federativeEntity ?? null,
      state: planning.state,
      municipality: planning.municipality,
      analysisName: planning.analysisName,
      currentPosition: planning.currentPosition,
      activityType: planning.activityType,
      publicServiceStartDate: planning.publicServiceStartDate ?? null,
      careerStartDate: planning.careerStartDate ?? null,
    });

    const transactionOperations: TransactionType[] = [];

    for (const period of planning.periods) {
      for (const item of period.items) {
        for (const document of item.documents) {
          transactionOperations.push(
            this.teacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway.deleteTeacherRetirementPlanningPeriodItemDocument(
              document.id,
            ),
          );
        }

        transactionOperations.push(
          this.teacherRetirementPlanningPeriodItemCommandRepositoryGateway.deleteTeacherRetirementPlanningPeriodItem(
            item.id,
          ),
        );
      }

      transactionOperations.push(
        this.teacherRetirementPlanningPeriodCommandRepositoryGateway.deleteTeacherRetirementPlanningPeriod(
          period.id,
        ),
      );
    }

    for (const periodDto of dto.periods) {
      const period = new TeacherRetirementPlanningRppsPeriodEntity({
        id: new TeacherRetirementPlanningRppsPeriodId(),
        startDate: periodDto.startDate,
        endDate: periodDto.endDate ?? null,
        positionName: periodDto.positionName ?? null,
        careerName: periodDto.careerName ?? null,
        serviceType: periodDto.serviceType ?? null,
        department: periodDto.department ?? null,
        teacherRetirementPlanning: planningEntity,
      });

      transactionOperations.push(
        this.teacherRetirementPlanningPeriodCommandRepositoryGateway.createTeacherRetirementPlanningPeriod(
          period,
        ),
      );

      if (!periodDto.items) {
        continue;
      }

      for (const itemDto of periodDto.items) {
        const { startDate, endDate } = this.resolveItemDates(
          periodDto,
          itemDto,
        );

        const item = new TeacherRetirementPlanningRppsPeriodItemEntity({
          id: new TeacherRetirementPlanningRppsPeriodItemId(),
          startDate,
          endDate,
          institutionName: itemDto.institutionName ?? null,
          institutionType: itemDto.institutionType ?? null,
          educationLevel: itemDto.educationLevel ?? null,
          rolePerformed: itemDto.rolePerformed ?? null,
          teacherRetirementPlanningPeriod: period,
        });

        transactionOperations.push(
          this.teacherRetirementPlanningPeriodItemCommandRepositoryGateway.createTeacherRetirementPlanningPeriodItem(
            item,
          ),
        );

        if (!itemDto.documents) {
          continue;
        }

        for (const itemDocumentDto of itemDto.documents) {
          const documentUrl = await this.uploadBase64File(
            itemDocumentDto.document.base64.decodeToBuffer(),
            itemDocumentDto.document.originalFileName,
          );

          const itemDocument =
            new TeacherRetirementPlanningRppsPeriodItemDocumentEntity({
              id: new TeacherRetirementPlanningRppsPeriodItemDocumentId(),
              document: documentUrl,
              teacherRetirementPlanningPeriodItem: item,
            });

          transactionOperations.push(
            this.teacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway.createTeacherRetirementPlanningPeriodItemDocument(
              itemDocument,
            ),
          );
        }
      }
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateTeacherRetirementPlanningPeriodResponseDto.build({
      teacherRetirementPlanningId,
    });
  }

  private resolveItemDates(
    periodDto: {
      startDate: Date;
      endDate?: Date | null;
    },
    itemDto: CreateTeacherRetirementPlanningPeriodItemRequestDto,
  ): { startDate: Date; endDate: Date | null } {
    if (
      itemDto.workloadType ===
      TeacherRetirementPlanningRppsPeriodItemWorkloadTypeEnum.FULL_TIME
    ) {
      return {
        startDate: periodDto.startDate,
        endDate: periodDto.endDate ?? null,
      };
    }

    if (!itemDto.startDate || !itemDto.endDate) {
      throw new TeacherRetirementPlanningRppsPeriodItemDatesRequiredForPartTimeError();
    }

    return {
      startDate: itemDto.startDate,
      endDate: itemDto.endDate,
    };
  }

  private async uploadBase64File(
    buffer: Buffer,
    originalFileName: string,
  ): Promise<string> {
    const fileModel = FileModel.build({
      buffer,
      originalName: originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });

    return this.fileProcessorGateway.uploadFile(fileModel);
  }
}
