import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
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
import { UpdateTeacherRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/update-teacher-retirement-planning.request.dto';
import { UpdateTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/update-teacher-retirement-planning.response.dto';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';

@Injectable()
export class UpdateTeacherRetirementPlanningUseCase {
  protected readonly _type = UpdateTeacherRetirementPlanningUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningQueryRepositoryGateway,
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
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    dto: UpdateTeacherRetirementPlanningRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
      dto.analysisToolClientId,
      organizationSessionData.organizationId,
      AnalysisToolClientNotFoundError,
    );

    const currentPlanning =
      await this.teacherRetirementPlanningQueryRepositoryGateway.findOneTeacherRetirementPlanningByIdWithRelations(
        teacherRetirementPlanningId,
      );

    if (currentPlanning === null) {
      throw new TeacherRetirementPlanningNotFoundError();
    }

    const teacherRetirementPlanning = new TeacherRetirementPlanningEntity({
      id: currentPlanning.id,
      federativeEntity: dto.federativeEntity,
      state: dto.state !== undefined ? (dto.state as StateCodeEnum) : null,
      municipality: dto.municipality ?? null,
      analysisName: dto.analysisName ?? null,
      currentPosition: dto.currentPosition ?? null,
      activityType: dto.activityType,
      publicServiceStartDate: dto.publicServiceStartDate,
      careerStartDate: dto.careerStartDate,
      administrativeProcessAnalysis: dto.administrativeProcessAnalysis ?? null,
    });

    const transactionOperations: TransactionType[] = [
      this.teacherRetirementPlanningCommandRepositoryGateway.updateTeacherRetirementPlanning(
        teacherRetirementPlanning.id,
        teacherRetirementPlanning,
      ),
    ];

    for (const inssBenefit of currentPlanning.inssBenefits) {
      transactionOperations.push(
        this.teacherRetirementPlanningInssBenefitCommandRepositoryGateway.deleteTeacherRetirementPlanningInssBenefit(
          inssBenefit.id,
        ),
      );
    }

    for (const legalProceeding of currentPlanning.legalProceedings) {
      transactionOperations.push(
        this.teacherRetirementPlanningLegalProceedingCommandRepositoryGateway.deleteTeacherRetirementPlanningLegalProceeding(
          legalProceeding.id,
        ),
      );
    }

    for (const document of currentPlanning.documents) {
      transactionOperations.push(
        this.teacherRetirementPlanningDocumentCommandRepositoryGateway.deleteTeacherRetirementPlanningDocument(
          document.id,
        ),
      );
    }

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

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateTeacherRetirementPlanningResponseDto.build({
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
