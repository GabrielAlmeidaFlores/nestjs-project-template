import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import {
  GetTeacherRetirementPlanningDocumentResponseDto,
  GetTeacherRetirementPlanningPeriodItemDocumentResponseDto,
  GetTeacherRetirementPlanningPeriodItemResponseDto,
  GetTeacherRetirementPlanningPeriodResponseDto,
  GetTeacherRetirementPlanningRemunerationResponseDto,
  GetTeacherRetirementPlanningResponseDto,
  GetTeacherRetirementPlanningResultResponseDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/get-teacher-retirement-planning.response.dto';
import { TeacherRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning/error/teacher-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetTeacherRetirementPlanningUseCase {
  protected readonly _type = GetTeacherRetirementPlanningUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningResponseDto> {
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
      throw new TeacherRetirementPlanningNotFoundError();
    }

    const periods = await Promise.all(
      planning.periods.map(async (period) =>
        GetTeacherRetirementPlanningPeriodResponseDto.build({
          startDate: period.startDate,
          endDate: period.endDate,
          positionName: period.positionName,
          careerName: period.careerName,
          serviceType: period.serviceType,
          department: period.department,
          items: await Promise.all(
            period.items.map(async (item) =>
              GetTeacherRetirementPlanningPeriodItemResponseDto.build({
                startDate: item.startDate,
                endDate: item.endDate,
                institutionName: item.institutionName,
                institutionType: item.institutionType,
                educationLevel: item.educationLevel,
                rolePerformed: item.rolePerformed,
                documents: await Promise.all(
                  item.documents.map(async (document) => {
                    const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
                      document.document,
                    );
                    const originalFileName =
                      await this.fileProcessorGateway.getOriginalFileName(
                        document.document,
                      );
                    return GetTeacherRetirementPlanningPeriodItemDocumentResponseDto.build(
                      {
                        document: Base64.encodeBuffer(fileBuffer).toString(),
                        originalFileName,
                      },
                    );
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
    );

    const documents = await Promise.all(
      planning.documents.map(async (document) => {
        const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
          document.document,
        );
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(
            document.document,
          );
        return GetTeacherRetirementPlanningDocumentResponseDto.build({
          document: Base64.encodeBuffer(fileBuffer).toString(),
          originalFileName,
        });
      }),
    );

    const remunerations = planning.remunerations.map((remuneration) =>
      GetTeacherRetirementPlanningRemunerationResponseDto.build({
        contributionDate: remuneration.contributionDate,
        amount: remuneration.amount,
      }),
    );

    const teacherRetirementPlanningResult = planning.result
      ? GetTeacherRetirementPlanningResultResponseDto.build({
          ...(planning.result.teacherRetirementPlanningCompleteAnalysis !==
            null && {
            teacherRetirementPlanningCompleteAnalysis: JSON.parse(
              planning.result.teacherRetirementPlanningCompleteAnalysis,
            ) as object,
          }),
          ...(planning.result.teacherRetirementPlanningSimplifiedAnalysis !==
            null && {
            teacherRetirementPlanningSimplifiedAnalysis: JSON.parse(
              planning.result.teacherRetirementPlanningSimplifiedAnalysis,
            ) as object,
          }),
        })
      : undefined;

    return GetTeacherRetirementPlanningResponseDto.build({
      teacherRetirementPlanningId: planning.id,
      federativeEntity: planning.federativeEntity,
      ...(planning.state !== null && { state: planning.state.toString() }),
      ...(planning.municipality !== null && { municipality: planning.municipality }),
      ...(planning.analysisName !== null && { analysisName: planning.analysisName }),
      activityType: planning.activityType,
      publicServiceStartDate: planning.publicServiceStartDate,
      careerStartDate: planning.careerStartDate,
      ...(planning.inssBenefits.length > 0 && {
        inssBenefitNumber: planning.inssBenefits.map(
          (inssBenefit) => inssBenefit.inssBenefitNumber,
        ),
      }),
      ...(planning.legalProceedings.length > 0 && {
        legalProceedingNumber: planning.legalProceedings.map(
          (legalProceeding) => legalProceeding.legalProceedingNumber,
        ),
      }),
      ...(documents.length > 0 && { documents }),
      ...(periods.length > 0 && { periods }),
      ...(remunerations.length > 0 && { remunerations }),
      ...(teacherRetirementPlanningResult && { teacherRetirementPlanningResult }),
    });
  }
}
