import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/command/teacher-retirement-planning-period.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item-document/command/teacher-retirement-planning-period-item-document.command.repository.gateway';
import { TeacherRetirementPlanningPeriodItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item/command/teacher-retirement-planning-period-item.command.repository.gateway';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningPeriodItemDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity';
import { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';
import { TeacherRetirementPlanningPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';
import { TeacherRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';
import { CreateTeacherRetirementPlanningPeriodRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning-period.request.dto';
import { CreateTeacherRetirementPlanningPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning-period.response.dto';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
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
      activityType: planning.activityType,
      publicServiceStartDate: planning.publicServiceStartDate,
      careerStartDate: planning.careerStartDate,
    });

    const periodId = new TeacherRetirementPlanningPeriodId();

    const period = new TeacherRetirementPlanningPeriodEntity({
      id: periodId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      positionName: dto.positionName,
      careerName: dto.careerName,
      serviceType: dto.serviceType,
      department: dto.department,
      teacherRetirementPlanning: planningEntity,
    });

    const transactionOperations: TransactionType[] = [
      this.teacherRetirementPlanningPeriodCommandRepositoryGateway.createTeacherRetirementPlanningPeriod(
        period,
      ),
    ];

    for (const itemDto of dto.items) {
      const item = new TeacherRetirementPlanningPeriodItemEntity({
        id: new TeacherRetirementPlanningPeriodItemId(),
        startDate: itemDto.startDate,
        endDate: itemDto.endDate,
        institutionName: itemDto.institutionName,
        institutionType: itemDto.institutionType,
        educationLevel: itemDto.educationLevel,
        rolePerformed: itemDto.rolePerformed,
        teacherRetirementPlanningPeriod: period,
      });

      transactionOperations.push(
        this.teacherRetirementPlanningPeriodItemCommandRepositoryGateway.createTeacherRetirementPlanningPeriodItem(
          item,
        ),
      );

      if (itemDto.documents) {
        for (const itemDocumentDto of itemDto.documents) {
          const documentUrl = await this.uploadBase64File(
            itemDocumentDto.document.base64.decodeToBuffer(),
            itemDocumentDto.document.originalFileName,
          );

          const itemDocument = new TeacherRetirementPlanningPeriodItemDocumentEntity({
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
      teacherRetirementPlanningPeriodId: periodId,
    });
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
