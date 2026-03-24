import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/command/medical-and-social-report-objection-generator-analysis.command.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/medical-and-social-report-objection-generator-analysis.query.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { DeleteMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/delete-medical-and-social-report-objection-generator-analysis.response';
import { MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteMedicalAndSocialReportObjectionGeneratorAnalysisUseCase {
  protected readonly _type =
    DeleteMedicalAndSocialReportObjectionGeneratorAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
  ): Promise<DeleteMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const medicalAndSocialReportObjectionGeneratorAnalysisResult =
      await this.medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway.findOneByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    const deleteTransaction =
      this.medicalAndSocialReportObjectionGeneratorAnalysisCommandRepositoryGateway.deleteMedicalAndSocialReportObjectionGeneratorAnalysis(
        medicalAndSocialReportObjectionGeneratorAnalysisResult.id,
        organizationMember.id,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.DELETED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id.toString(),
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecordQueryResult.id.toString(),
        transactions: [deleteTransaction],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return DeleteMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto.build(
      {
        medicalAndSocialReportObjectionGeneratorAnalysisId:
          medicalAndSocialReportObjectionGeneratorAnalysisResult.id,
      },
    );
  }
}
