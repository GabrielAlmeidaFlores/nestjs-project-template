import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-document/command/teacher-retirement-planning-document.command.repository.gateway';
import { TeacherRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-inss-benefit/command/teacher-retirement-planning-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-legal-proceeding/command/teacher-retirement-planning-legal-proceeding.command.repository.gateway';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/teacher-retirement-planning-document.entity';
import { TeacherRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';
import { TeacherRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.entity';
import { TeacherRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';
import { TeacherRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.entity';
import { TeacherRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';
import { CreateTeacherRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning.request.dto';
import { CreateTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';

@Injectable()
export class CreateTeacherRetirementPlanningUseCase {
  protected readonly _type = CreateTeacherRetirementPlanningUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningCommandRepositoryGateway)
    private readonly teacherRetirementPlanningCommandRepositoryGateway: TeacherRetirementPlanningCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningDocumentCommandRepositoryGateway)
    private readonly teacherRetirementPlanningDocumentCommandRepositoryGateway: TeacherRetirementPlanningDocumentCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningInssBenefitCommandRepositoryGateway)
    private readonly teacherRetirementPlanningInssBenefitCommandRepositoryGateway: TeacherRetirementPlanningInssBenefitCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway)
    private readonly teacherRetirementPlanningLegalProceedingCommandRepositoryGateway: TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateTeacherRetirementPlanningRequestDto,
    recordType: AnalysisToolRecordTypeEnum = AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING,
  ): Promise<CreateTeacherRetirementPlanningResponseDto> {
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

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const teacherRetirementPlanningId = new TeacherRetirementPlanningId();

    const teacherRetirementPlanning = new TeacherRetirementPlanningEntity({
      id: teacherRetirementPlanningId,
      federativeEntity: dto.federativeEntity,
      state: dto.state as StateCodeEnum,
      municipality: dto.municipality ?? null,
      analysisName: dto.analysisName ?? null,
      currentPosition: dto.currentPosition ?? null,
      activityType: dto.activityType,
      publicServiceStartDate: dto.publicServiceStartDate ?? null,
      careerStartDate: dto.careerStartDate ?? null,
      administrativeProcessAnalysis: dto.administrativeProcessAnalysis ?? null,
    });

    const transactionOperations: TransactionType[] = [
      this.teacherRetirementPlanningCommandRepositoryGateway.createTeacherRetirementPlanning(
        teacherRetirementPlanning,
      ),
    ];

    if (dto.inssBenefitNumber) {
      for (const inssBenefitNumber of dto.inssBenefitNumber) {
        const inssBenefit = new TeacherRetirementPlanningInssBenefitEntity({
          id: new TeacherRetirementPlanningInssBenefitId(),
          inssBenefitNumber,
          teacherRetirementPlanning,
        });

        transactionOperations.push(
          this.teacherRetirementPlanningInssBenefitCommandRepositoryGateway.createTeacherRetirementPlanningInssBenefit(
            inssBenefit,
          ),
        );
      }
    }

    if (dto.legalProceedingNumber) {
      for (const legalProceedingNumber of dto.legalProceedingNumber) {
        const legalProceeding =
          new TeacherRetirementPlanningLegalProceedingEntity({
            id: new TeacherRetirementPlanningLegalProceedingId(),
            legalProceedingNumber,
            teacherRetirementPlanning,
          });

        transactionOperations.push(
          this.teacherRetirementPlanningLegalProceedingCommandRepositoryGateway.createTeacherRetirementPlanningLegalProceeding(
            legalProceeding,
          ),
        );
      }
    }

    if (dto.documents) {
      for (const documentDto of dto.documents) {
        const documentUrl = await this.uploadBase64File(
          documentDto.document.base64.decodeToBuffer(),
          documentDto.document.originalFileName,
        );

        const document = new TeacherRetirementPlanningDocumentEntity({
          id: new TeacherRetirementPlanningDocumentId(),
          document: documentUrl,
          teacherRetirementPlanning,
        });

        transactionOperations.push(
          this.teacherRetirementPlanningDocumentCommandRepositoryGateway.createTeacherRetirementPlanningDocument(
            document,
          ),
        );
      }
    }
    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: new AnalysisToolRecordId(),
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: recordType,
      teacherRetirementPlanning,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    transactionOperations.push(
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      ),
    );
    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateTeacherRetirementPlanningResponseDto.build({
      teacherRetirementPlanningId,
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
