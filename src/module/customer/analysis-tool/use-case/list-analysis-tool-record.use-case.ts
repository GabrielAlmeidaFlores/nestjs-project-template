import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
import {
  GetAnalysisToolRecordClientResponseDto,
  GetAnalysisToolRecordResponseDto,
  GetAnalysisToolRecordResponsibleResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-record.response.dto';
import { ListAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-record.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListAnalysisToolRecordUseCase {
  protected readonly _type = ListAnalysisToolRecordUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListAnalysisToolRecordRequestDto,
  ): Promise<ListAnalysisToolRecordResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordList =
      await this.analysisToolRecordQueryRepositoryGateway.listByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        new ListAnalysisToolRecordQueryParam(dto),
      );

    const resource = (
      await Promise.all(
        analysisToolRecordList.resource.map(async (analysisToolRecord) => {
          const createdBy = GetAnalysisToolRecordResponsibleResponseDto.build({
            ...analysisToolRecord.createdBy.customer,
          });

          if (analysisToolRecord.createdBy.customer.profilePicture !== null) {
            const profilePicture =
              await this.fileProcessorGateway.getFileSignedUrl(
                analysisToolRecord.createdBy.customer.profilePicture,
              );

            createdBy.profilePicture = profilePicture.toString();
          }

          const updatedBy = GetAnalysisToolRecordResponsibleResponseDto.build({
            ...analysisToolRecord.updatedBy.customer,
          });

          if (analysisToolRecord.updatedBy.customer.profilePicture !== null) {
            const profilePicture =
              await this.fileProcessorGateway.getFileSignedUrl(
                analysisToolRecord.updatedBy.customer.profilePicture,
              );

            updatedBy.profilePicture = profilePicture.toString();
          }

          const client = GetAnalysisToolRecordClientResponseDto.build({
            ...analysisToolRecord.analysisToolClient,
          });

          const analysis =
            analysisToolRecord.cnisFastAnalysis ??
            analysisToolRecord.retirementPlanningRpps ??
            analysisToolRecord.retirementPlanningRgps ??
            analysisToolRecord.disabilityRetirementPlanningGrant ??
            analysisToolRecord.teacherRetirementPlanning ??
            analysisToolRecord.generalUrbanRetirementGrant ??
            analysisToolRecord.generalUrbanRetirementAnalysis ??
            analysisToolRecord.judicialCaseAnalysis ??
            analysisToolRecord.administrativeProcedureInssAnalysis ??
            analysisToolRecord.medicalAndSocialReportObjectionGeneratorAnalysis ??
            analysisToolRecord.specialActivity ??
            analysisToolRecord.disabilityAssessmentForBpcAnalysis ??
            analysisToolRecord.ruralOrHybridRetirementRejection ??
            analysisToolRecord.ruralOrHybridRetirementAnalysis ??
            analysisToolRecord.ruralTimelineAnalysis ??
            analysisToolRecord.speechGenerator ??
            analysisToolRecord.medicalQuestionGenerator ??
            analysisToolRecord.perCapitaIncomeForBpcAnalysis ??
            analysisToolRecord.insuranceQualityAnalysis ??
            analysisToolRecord.disabilityRetirementPlanning ??
            analysisToolRecord.audienceQuestionGenerator ??
            analysisToolRecord.survivorPensionAnalysis ??
            analysisToolRecord.specialRetirementGrant ??
            analysisToolRecord.maternityPayGrant ??
            analysisToolRecord.deathBenefitGrant ??
            analysisToolRecord.generalUrbanRetirementDenial ??
            analysisToolRecord.disabilityRetirementPlanningRejection ??
            analysisToolRecord.bpcDisabilityDenial ??
            analysisToolRecord.deathBenefitGrant ??
            analysisToolRecord.temporaryIncapacityBenefitRejection ??
            analysisToolRecord.deathBenefitRejection ??
            analysisToolRecord.bpcElderlyAnalysis ??
            analysisToolRecord.maternityPayRejection;

          const analysisId = analysis?.id ?? null;

          if (analysisId === null) {
            return null;
          }

          return GetAnalysisToolRecordResponseDto.build({
            ...analysisToolRecord,
            analysisId,
            status: analysisToolRecord.status,
            analysisToolClient: client,
            createdBy,
            updatedBy,
          });
        }),
      )
    ).filter((item): item is GetAnalysisToolRecordResponseDto => item !== null);

    return ListAnalysisToolRecordResponseDto.build({
      ...analysisToolRecordList,
      resource,
    });
  }
}
