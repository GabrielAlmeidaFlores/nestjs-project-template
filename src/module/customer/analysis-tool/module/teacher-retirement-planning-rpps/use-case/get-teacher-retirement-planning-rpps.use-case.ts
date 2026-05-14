import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import {
  GetAnalysisToolClientResponseDto,
  GetAnalysisToolClientResponsibleResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import {
  TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto,
  TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto,
  TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning-result.response.dto';
import {
  GetTeacherRetirementPlanningRppsDocumentResponseDto,
  GetTeacherRetirementPlanningRppsPeriodItemDocumentResponseDto,
  GetTeacherRetirementPlanningRppsPeriodItemResponseDto,
  GetTeacherRetirementPlanningRppsPeriodResponseDto,
  GetTeacherRetirementPlanningRppsRemunerationResponseDto,
  GetTeacherRetirementPlanningRppsResponseDto,
  GetTeacherRetirementPlanningRppsResultResponseDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/get-teacher-retirement-planning.response.dto';
import { TeacherRetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/error/teacher-retirement-planning-not-found.error';
import { TeacherRetirementPlanningRppsCompleteAnalysisDataInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/model/generic/teacher-retirement-planning-complete-analysis-data.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetTeacherRetirementPlanningRppsUseCase {
  protected readonly _type = GetTeacherRetirementPlanningRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningRppsQueryRepositoryGateway)
    private readonly teacherRetirementPlanningQueryRepositoryGateway: TeacherRetirementPlanningRppsQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
  ): Promise<GetTeacherRetirementPlanningRppsResponseDto> {
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

    const recordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
        teacherRetirementPlanningId as any,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        TeacherRetirementPlanningRppsNotFoundError,
      );

    const client = recordQueryResult.analysisToolClient;
    const analysisToolClient = GetAnalysisToolClientResponseDto.build({
      ...client,
      analysisCount: 0,
      legalProceedingNumber: client.analysisToolClientLegalProceeding.map(
        (p) => p.legalProceedingNumber,
      ),
      inssBenefitNumber: client.analysisToolClientInssBenefit.map(
        (b) => b.inssBenefitNumber,
      ),
      createdBy: GetAnalysisToolClientResponsibleResponseDto.build({
        id: client.createdBy.customer.id,
        name: client.createdBy.customer.name,
      }),
      updatedBy: GetAnalysisToolClientResponsibleResponseDto.build({
        id: client.updatedBy.customer.id,
        name: client.updatedBy.customer.name,
      }),
    });

    const periods = await Promise.all(
      planning.periods.map(async (period) =>
        GetTeacherRetirementPlanningRppsPeriodResponseDto.build({
          startDate: period.startDate,
          endDate: period.endDate,
          positionName: period.positionName,
          careerName: period.careerName,
          serviceType: period.serviceType,
          department: period.department,
          items: await Promise.all(
            period.items.map(async (item) =>
              GetTeacherRetirementPlanningRppsPeriodItemResponseDto.build({
                startDate: item.startDate,
                endDate: item.endDate,
                institutionName: item.institutionName,
                institutionType: item.institutionType,
                educationLevel: item.educationLevel,
                rolePerformed: item.rolePerformed,
                documents: await Promise.all(
                  item.documents.map(async (document) => {
                    const fileBuffer =
                      await this.fileProcessorGateway.getFileBuffer(
                        document.document,
                      );
                    const originalFileName =
                      await this.fileProcessorGateway.getOriginalFileName(
                        document.document,
                      );
                    return GetTeacherRetirementPlanningRppsPeriodItemDocumentResponseDto.build(
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
        return GetTeacherRetirementPlanningRppsDocumentResponseDto.build({
          document: Base64.encodeBuffer(fileBuffer).toString(),
          originalFileName,
        });
      }),
    );

    const remunerations = planning.remunerations.map((remuneration) =>
      GetTeacherRetirementPlanningRppsRemunerationResponseDto.build({
        contributionDate: remuneration.contributionDate,
        amount: remuneration.amount,
      }),
    );

    const teacherRetirementPlanningResult = planning.result
      ? GetTeacherRetirementPlanningRppsResultResponseDto.build({
          ...(planning.result.teacherRetirementPlanningCompleteAnalysis !==
            null && {
            teacherRetirementPlanningCompleteAnalysis:
              ((): TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto => {
                const analysisData = JSON.parse(
                  planning.result.teacherRetirementPlanningCompleteAnalysis,
                ) as TeacherRetirementPlanningRppsCompleteAnalysisDataInterface;
                return TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto.build(
                  {
                    timeline: analysisData.timeline.map((item) =>
                      TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemResponseDto.build(
                        {
                          startDate: item.startDate,
                          endDate: item.endDate,
                          activityType: item.activityType,
                          type: item.type,
                          location: item.location,
                        },
                      ),
                    ),
                    retirementRules: analysisData.retirementRules.map((rule) =>
                      TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleResponseDto.build(
                        {
                          ruleName: rule.ruleName,
                          ...(rule.result !== undefined && {
                            result: rule.result,
                          }),
                          ...(rule.rightDate !== undefined && {
                            rightDate: rule.rightDate,
                          }),
                          ...(rule.estimatedRMI !== undefined && {
                            estimatedRMI: rule.estimatedRMI,
                          }),
                          bestRMI: rule.bestRMI,
                          highestLawsuitValue: rule.highestLawsuitValue,
                          detailedRuleAnalysis: rule.detailedRuleAnalysis,
                        },
                      ),
                    ),
                    finalAnalysis: analysisData.finalAnalysis,
                    teacherTime: analysisData.teacherTime,
                    commonTime: analysisData.commonTime,
                    totalContributionTime: analysisData.totalContributionTime,
                    publicServiceTime: analysisData.publicServiceTime,
                    positionTenureTime: analysisData.positionTenureTime,
                  },
                );
              })(),
          }),
          ...(planning.result.teacherRetirementPlanningSimplifiedAnalysis !==
            null && {
            teacherRetirementPlanningSimplifiedAnalysis:
              planning.result.teacherRetirementPlanningSimplifiedAnalysis,
          }),
        })
      : undefined;

    const response = GetTeacherRetirementPlanningRppsResponseDto.build({
      teacherRetirementPlanningId: planning.id,
      federativeEntity: planning.federativeEntity,
      ...(planning.state !== null && { state: planning.state.toString() }),
      ...(planning.municipality !== null && {
        municipality: planning.municipality,
      }),
      ...(planning.analysisName !== null && {
        analysisName: planning.analysisName,
      }),
      ...(planning.currentPosition !== null && {
        currentPosition: planning.currentPosition,
      }),
      activityType: planning.activityType,
      ...(planning.publicServiceStartDate !== null && {
        publicServiceStartDate: planning.publicServiceStartDate,
      }),
      ...(planning.careerStartDate !== null && {
        careerStartDate: planning.careerStartDate,
      }),
      ...(planning.administrativeProcessAnalysis !== null && {
        administrativeProcessAnalysis: planning.administrativeProcessAnalysis,
      }),
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
      ...(teacherRetirementPlanningResult && {
        teacherRetirementPlanningResult,
      }),
      analysisToolClient,
    });

    return response;
  }
}
