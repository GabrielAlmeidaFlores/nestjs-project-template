import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-teaching-period/command/teacher-retirement-planning-rejection-teaching-period.command.repository.gateway';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-teaching-period-document/command/teacher-retirement-planning-rejection-teaching-period-document.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionTeachingPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/teacher-retirement-planning-rejection-teaching-period.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/teacher-retirement-planning-rejection-teaching-period-document.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/value-object/teacher-retirement-planning-rejection-teaching-period-document-id.value-object';
import { SaveTeacherRetirementPlanningRejectionTeachingPeriodsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/save-teacher-retirement-planning-rejection-teaching-periods.request.dto';
import { SaveTeacherRetirementPlanningRejectionTeachingPeriodsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/save-teacher-retirement-planning-rejection-teaching-periods.response.dto';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase {
  protected readonly _type =
    SaveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway: TeacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway: TeacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    dto: SaveTeacherRetirementPlanningRejectionTeachingPeriodsRequestDto,
  ): Promise<SaveTeacherRetirementPlanningRejectionTeachingPeriodsResponseDto> {
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

    const transactions: TransactionType[] = [
      this.teacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway.deleteAllByTeacherRetirementPlanningRejectionId(
        teacherRetirementPlanningRejectionId,
      ),
    ];

    for (const periodDto of dto.teachingPeriods) {
      const teachingPeriodId =
        new TeacherRetirementPlanningRejectionTeachingPeriodId();

      transactions.push(
        this.teacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway.createTeacherRetirementPlanningRejectionTeachingPeriod(
          new TeacherRetirementPlanningRejectionTeachingPeriodEntity({
            id: teachingPeriodId,
            startDate: periodDto.startDate ?? null,
            endDate: periodDto.endDate ?? null,
            institutionName: periodDto.institutionName ?? null,
            establishmentType: periodDto.establishmentType ?? null,
            educationLevel: periodDto.educationLevel ?? null,
            functionPerformed: periodDto.functionPerformed ?? null,
            rejectionReason: periodDto.rejectionReason ?? null,
            legalBasisForRecognition:
              periodDto.legalBasisForRecognition ?? null,
            favorableJurisprudence:
              periodDto.favorableJurisprudence ?? null,
            proofStrategy: periodDto.proofStrategy ?? null,
            teacherRetirementPlanningRejectionId,
          }),
        ),
      );

      if (periodDto.documents && periodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          periodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const fileName =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.teacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway.createTeacherRetirementPlanningRejectionTeachingPeriodDocument(
              new TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity(
                {
                  id: new TeacherRetirementPlanningRejectionTeachingPeriodDocumentId(),
                  fileName,
                  teacherRetirementPlanningRejectionTeachingPeriodId:
                    teachingPeriodId,
                },
              ),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return SaveTeacherRetirementPlanningRejectionTeachingPeriodsResponseDto.build(
      {
        teacherRetirementPlanningRejectionId,
      },
    );
  }
}
