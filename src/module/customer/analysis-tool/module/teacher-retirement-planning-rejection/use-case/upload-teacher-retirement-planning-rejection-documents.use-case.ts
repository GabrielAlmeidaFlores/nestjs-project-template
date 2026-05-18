import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection-document/command/teacher-retirement-planning-rejection-document.command.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/teacher-retirement-planning-rejection-document.entity';
import { TeacherRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/value-object/teacher-retirement-planning-rejection-document-id.value-object';
import { UploadTeacherRetirementPlanningRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/upload-teacher-retirement-planning-rejection-documents.request.dto';
import { UploadTeacherRetirementPlanningRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/upload-teacher-retirement-planning-rejection-documents.response.dto';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadTeacherRetirementPlanningRejectionDocumentsUseCase {
  protected readonly _type =
    UploadTeacherRetirementPlanningRejectionDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRejectionDocumentCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionDocumentCommandRepositoryGateway: TeacherRetirementPlanningRejectionDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    dto: UploadTeacherRetirementPlanningRejectionDocumentsRequestDto,
  ): Promise<UploadTeacherRetirementPlanningRejectionDocumentsResponseDto> {
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

    const deleteExistingTransaction =
      this.teacherRetirementPlanningRejectionDocumentCommandRepositoryGateway.deleteAllByTeacherRetirementPlanningRejectionId(
        teacherRetirementPlanningRejectionId,
      );

    const documentEntities = await this.buildDocumentEntities(
      teacherRetirementPlanningRejectionId,
      dto,
    );

    const createDocumentTransactions = documentEntities.map((entity) =>
      this.teacherRetirementPlanningRejectionDocumentCommandRepositoryGateway.createTeacherRetirementPlanningRejectionDocument(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteExistingTransaction,
      ...createDocumentTransactions,
    ]);

    await transaction.commit();

    return UploadTeacherRetirementPlanningRejectionDocumentsResponseDto.build({
      teacherRetirementPlanningRejectionId,
    });
  }

  private async buildDocumentEntities(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    dto: UploadTeacherRetirementPlanningRejectionDocumentsRequestDto,
  ): Promise<TeacherRetirementPlanningRejectionDocumentEntity[]> {
    return Promise.all(
      dto.documents.map(async (documentDto) => {
        const buffer = documentDto.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: documentDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return new TeacherRetirementPlanningRejectionDocumentEntity({
          id: new TeacherRetirementPlanningRejectionDocumentId(),
          fileName: documentUrl,
          name: documentDto.name,
          type: documentDto.type,
          teacherRetirementPlanningRejectionId,
        });
      }),
    );
  }
}
