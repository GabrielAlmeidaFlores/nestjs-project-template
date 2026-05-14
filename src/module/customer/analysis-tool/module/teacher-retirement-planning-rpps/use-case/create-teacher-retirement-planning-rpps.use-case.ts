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
import { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/command/teacher-retirement-planning.command.repository.gateway';
import { TeacherRetirementPlanningRppsDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-document/command/teacher-retirement-planning-document.command.repository.gateway';
import { TeacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-inss-benefit/command/teacher-retirement-planning-inss-benefit.command.repository.gateway';
import { TeacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-legal-proceeding/command/teacher-retirement-planning-legal-proceeding.command.repository.gateway';
import { TeacherRetirementPlanningRppsActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningRppsFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/teacher-retirement-planning-document.entity';
import { TeacherRetirementPlanningRppsDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';
import { TeacherRetirementPlanningRppsInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.entity';
import { TeacherRetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';
import { TeacherRetirementPlanningRppsLegalProceedingEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.entity';
import { TeacherRetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';
import { CreateTeacherRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/create-teacher-retirement-planning.request.dto';
import { CreateTeacherRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';

@Injectable()
export class CreateTeacherRetirementPlanningRppsUseCase {
  protected readonly _type = CreateTeacherRetirementPlanningRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRppsCommandRepositoryGateway: TeacherRetirementPlanningRppsCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsDocumentCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRppsDocumentCommandRepositoryGateway: TeacherRetirementPlanningRppsDocumentCommandRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway)
    private readonly teacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway: TeacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway,
    @Inject(
      TeacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway,
    )
    private readonly teacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway: TeacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateTeacherRetirementPlanningRppsRequestDto,
    recordType: AnalysisToolRecordTypeEnum = AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS,
  ): Promise<CreateTeacherRetirementPlanningRppsResponseDto> {
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

    const teacherRetirementPlanningRppsId =
      new TeacherRetirementPlanningRppsId();

    const teacherRetirementPlanningRpps =
      new TeacherRetirementPlanningRppsEntity({
        id: teacherRetirementPlanningRppsId,
        federativeEntity: dto.federativeEntity,
        state: dto.state as StateCodeEnum,
        municipality: dto.municipality ?? null,
        analysisName: dto.analysisName ?? null,
        currentPosition: dto.currentPosition ?? null,
        activityType: dto.activityType,
        publicServiceStartDate: dto.publicServiceStartDate ?? null,
        careerStartDate: dto.careerStartDate ?? null,
        administrativeProcessAnalysis:
          dto.administrativeProcessAnalysis ?? null,
      });

    const transactionOperations: TransactionType[] = [
      this.teacherRetirementPlanningRppsCommandRepositoryGateway.createTeacherRetirementPlanning(
        teacherRetirementPlanningRpps,
      ),
    ];

    if (dto.inssBenefitNumber) {
      for (const inssBenefitNumber of dto.inssBenefitNumber) {
        const inssBenefit = new TeacherRetirementPlanningRppsInssBenefitEntity({
          id: new TeacherRetirementPlanningRppsInssBenefitId(),
          inssBenefitNumber,
          teacherRetirementPlanning: teacherRetirementPlanningRpps,
        });

        transactionOperations.push(
          this.teacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway.createTeacherRetirementPlanningInssBenefit(
            inssBenefit,
          ),
        );
      }
    }

    if (dto.legalProceedingNumber) {
      for (const legalProceedingNumber of dto.legalProceedingNumber) {
        const legalProceeding =
          new TeacherRetirementPlanningRppsLegalProceedingEntity({
            id: new TeacherRetirementPlanningRppsLegalProceedingId(),
            legalProceedingNumber,
            teacherRetirementPlanning: teacherRetirementPlanningRpps,
          });

        transactionOperations.push(
          this.teacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway.createTeacherRetirementPlanningLegalProceeding(
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

        const document = new TeacherRetirementPlanningRppsDocumentEntity({
          id: new TeacherRetirementPlanningRppsDocumentId(),
          document: documentUrl,
          teacherRetirementPlanning: teacherRetirementPlanningRpps,
        });

        transactionOperations.push(
          this.teacherRetirementPlanningRppsDocumentCommandRepositoryGateway.createTeacherRetirementPlanningDocument(
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
      teacherRetirementPlanning: this.buildTeacherRetirementPlanningEntity(
        teacherRetirementPlanningRpps,
      ),
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

    return CreateTeacherRetirementPlanningRppsResponseDto.build({
      teacherRetirementPlanningId: teacherRetirementPlanningRppsId,
    });
  }

  private buildTeacherRetirementPlanningEntity(
    planning: TeacherRetirementPlanningRppsEntity,
  ): TeacherRetirementPlanningEntity {
    return new TeacherRetirementPlanningEntity({
      id: new TeacherRetirementPlanningId(planning.id.toString()),
      federativeEntity: this.mapFederativeEntity(planning.federativeEntity),
      state: planning.state,
      municipality: planning.municipality,
      analysisName: planning.analysisName,
      currentPosition: planning.currentPosition,
      activityType: this.mapActivityType(planning.activityType),
      publicServiceStartDate: planning.publicServiceStartDate,
      careerStartDate: planning.careerStartDate,
      administrativeProcessAnalysis: planning.administrativeProcessAnalysis,
      teacherRetirementPlanningResult: null,
    });
  }

  private mapFederativeEntity(
    federativeEntity: TeacherRetirementPlanningRppsFederativeEntityEnum,
  ): TeacherRetirementPlanningFederativeEntityEnum {
    const mapper: Record<
      TeacherRetirementPlanningRppsFederativeEntityEnum,
      TeacherRetirementPlanningFederativeEntityEnum
    > = {
      [TeacherRetirementPlanningRppsFederativeEntityEnum.STATE]:
        TeacherRetirementPlanningFederativeEntityEnum.STATE,
      [TeacherRetirementPlanningRppsFederativeEntityEnum.MUNICIPALITY]:
        TeacherRetirementPlanningFederativeEntityEnum.MUNICIPALITY,
      [TeacherRetirementPlanningRppsFederativeEntityEnum.UNION]:
        TeacherRetirementPlanningFederativeEntityEnum.UNION,
      [TeacherRetirementPlanningRppsFederativeEntityEnum.FEDERAL_DISTRICT]:
        TeacherRetirementPlanningFederativeEntityEnum.FEDERAL_DISTRICT,
    };

    return mapper[federativeEntity];
  }

  private mapActivityType(
    activityType: TeacherRetirementPlanningRppsActivityTypeEnum,
  ): TeacherRetirementPlanningActivityTypeEnum {
    const mapper: Record<
      TeacherRetirementPlanningRppsActivityTypeEnum,
      TeacherRetirementPlanningActivityTypeEnum
    > = {
      [TeacherRetirementPlanningRppsActivityTypeEnum.CLASSROOM_ONLY]:
        TeacherRetirementPlanningActivityTypeEnum.CLASSROOM_ONLY,
      [TeacherRetirementPlanningRppsActivityTypeEnum.CLASSROOM_AND_PEDAGOGICAL_FUNCTION]:
        TeacherRetirementPlanningActivityTypeEnum.CLASSROOM_AND_PEDAGOGICAL_FUNCTION,
      [TeacherRetirementPlanningRppsActivityTypeEnum.NO_TEACHING_ACTIVITY]:
        TeacherRetirementPlanningActivityTypeEnum.NO_TEACHING_ACTIVITY,
    };

    return mapper[activityType];
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
