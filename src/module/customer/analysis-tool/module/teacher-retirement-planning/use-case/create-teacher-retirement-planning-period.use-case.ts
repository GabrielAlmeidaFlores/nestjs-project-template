import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/command/teacher-retirement-planning-period.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item/command/teacher-retirement-planning-period-item.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item-document/command/teacher-retirement-planning-period-item-document.command.repository.gateway';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';
import { TeacherRetirementPlanningPeriodItemWorkloadTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-workload-type.enum';
import { TeacherRetirementPlanningPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';
import { TeacherRetirementPlanningPeriodItemDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity';
import { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';
import {
  CreateTeacherRetirementPlanningPeriodItemRequestDto,
  CreateTeacherRetirementPlanningPeriodRequestDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning-period.request.dto';
import { CreateTeacherRetirementPlanningPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning-period.response.dto';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
import { TeacherRetirementPlanningPeriodItemDatesRequiredForPartTimeError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-period-item-dates-required-for-part-time.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateTeacherRetirementPlanningPeriodUseCase {
  protected readonly _type = CreateTeacherRetirementPlanningPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningPeriodCommandRepositoryGateway)
    private readonly teacherRetirementPlanningPeriodCommandRepositoryGateway: TeacherRetirementPlanningPeriodCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningPeriodItemCommandRepositoryGateway)
    private readonly teacherRetirementPlanningPeriodItemCommandRepositoryGateway: TeacherRetirementPlanningPeriodItemCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway)
    private readonly teacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway: TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateTeacherRetirementPlanningPeriodRequestDto,
  ): Promise<CreateTeacherRetirementPlanningPeriodResponseDto> {
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
        dto.teacherRetirementPlanningId,
      );

    if (planning === null) {
      throw new TeacherRetirementPlanningNotFoundError();
    }

    const planningEntity = new TeacherRetirementPlanningEntity({
      id: planning.id,
      federativeEntity: planning.federativeEntity,
      state: planning.state,
      municipality: planning.municipality,
      analysisName: planning.analysisName,
      currentPosition: planning.currentPosition,
      activityType: planning.activityType,
      publicServiceStartDate: planning.publicServiceStartDate,
      careerStartDate: planning.careerStartDate,
    });

    const transactionOperations: TransactionType[] = [];

    for (const periodDto of dto.periods) {
      const periodId = new TeacherRetirementPlanningPeriodId();

      const period = new TeacherRetirementPlanningPeriodEntity({
        id: periodId,
        startDate: periodDto.startDate,
        endDate: periodDto.endDate,
        positionName: periodDto.positionName,
        careerName: periodDto.careerName,
        serviceType: periodDto.serviceType,
        department: periodDto.department,
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

        const item = new TeacherRetirementPlanningPeriodItemEntity({
          id: new TeacherRetirementPlanningPeriodItemId(),
          startDate,
          endDate,
          institutionName: itemDto.institutionName,
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
            new TeacherRetirementPlanningPeriodItemDocumentEntity({
              id: new TeacherRetirementPlanningPeriodItemDocumentId(),
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

    return CreateTeacherRetirementPlanningPeriodResponseDto.build({
      teacherRetirementPlanningId: dto.teacherRetirementPlanningId,
    });
  }

  private resolveItemDates(
    periodDto: {
      startDate: Date;
      endDate: Date;
    },
    itemDto: CreateTeacherRetirementPlanningPeriodItemRequestDto,
  ): { startDate: Date; endDate: Date } {
    if (
      itemDto.workloadType ===
      TeacherRetirementPlanningPeriodItemWorkloadTypeEnum.FULL_TIME
    ) {
      return {
        startDate: periodDto.startDate,
        endDate: periodDto.endDate,
      };
    }

    if (!itemDto.startDate || !itemDto.endDate) {
      throw new TeacherRetirementPlanningPeriodItemDatesRequiredForPartTimeError();
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
