import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/command/rural-timeline-analysis-cnis-contribution-period.command.repository.gateway';
import { ListRuralTimelineAnalysisCnisContributionPeriodQueryParam } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/param/list-rural-timeline-analysis-cnis-contribution-period.query.param';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/command/rural-timeline-analysis-cnis-contribution-period-under-minimum.command.repository.gateway';
import { RuralTimelineAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/command/rural-timeline-analysis-document.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import { AddRuralTimelineAnalysisCnisDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/add-rural-timeline-analysis-cnis-document.request.dto';
import { AddRuralTimelineAnalysisCnisDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/add-rural-timeline-analysis-cnis-document.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AddRuralTimelineAnalysisCnisDocumentUseCase {
  protected readonly _type = AddRuralTimelineAnalysisCnisDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisDocumentCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisDocumentCommandRepositoryGateway: RuralTimelineAnalysisDocumentCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(CnisProcessorGateway)
    private readonly cnisProcessorGateway: CnisProcessorGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalyzerGateway: CnisAnalyzerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: AddRuralTimelineAnalysisCnisDocumentRequestDto,
  ): Promise<AddRuralTimelineAnalysisCnisDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralTimelineAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RuralTimelineAnalysisNotFoundError,
      );

    const bucketKey = await this.fileProcessorGateway.uploadFile(
      dto.cnisDocument,
    );

    const cnisDocumentEntity = new RuralTimelineAnalysisDocumentEntity({
      type: RuralTimelineAnalysisDocumentTypeEnum.CNIS,
      document: bucketKey,
      ruralTimelineId: ruralTimelineAnalysisId,
    });

    const cnisData = await this.cnisProcessorGateway.parseCnisDocument(
      dto.cnisDocument.buffer,
    );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.updatedBy.id,
    });

    const cnisAnalysis = await this.cnisAnalyzerGateway.analyzeCnisDocument(
      cnisData,
      analysisToolClient,
    );

    const existingPeriods =
      await this.ruralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway.listByRuralTimelineAnalysisId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        new ListRuralTimelineAnalysisCnisContributionPeriodQueryParam({
          ruralTimelineAnalysis: ruralTimelineAnalysisId,
        }),
      );

    if (existingPeriods.resource.length > 0) {
      const deleteOperations = existingPeriods.resource.map((period) =>
        this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.deleteRuralTimelineAnalysisCnisContributionPeriod(
          period.id,
        ),
      );
      const deleteTransaction =
        await this.baseTransactionRepositoryGateway.execute(deleteOperations);
      await deleteTransaction.commit();
    }

    const transactionOperations = [
      this.ruralTimelineAnalysisDocumentCommandRepositoryGateway.createRuralTimelineAnalysisDocument(
        cnisDocumentEntity,
      ),
    ];

    for (const contributionPeriod of cnisAnalysis.tempoDeContribuicao) {
      if (contributionPeriod.dados === undefined) {
        continue;
      }

      const contributionPeriodEntity =
        new RuralTimelineAnalysisCnisContributionPeriodEntity({
          ruralTimelineId: ruralTimelineAnalysisId,
          employmentRelationshipSource:
            contributionPeriod.origemDoVinculo ?? null,
          startDate: contributionPeriod.dados.data?.dataInicio ?? null,
          endDate: contributionPeriod.dados.data?.dataFim ?? null,
          category: contributionPeriod.tipoDoVinculo ?? null,
          qualifyingPeriod: contributionPeriod.dados.meses,
          status: RuralTimelineAnalysisCnisContributionPeriodStatusEnum.VALID,
          averageContributionAmount: null,
          contributionAdjustmentIntent:
            ContributionAdjustmentIntentTypeEnum.PROVISIONAL,
          externalSupplementationIntent: false,
        });

      transactionOperations.push(
        this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriod(
          contributionPeriodEntity,
        ),
      );

      const matchingSocialSecurityRelation =
        cnisData.socialSecurityRelations?.find(
          (relation) =>
            relation.socialSecurityAffiliationInfo.origemDoVinculo ===
              contributionPeriod.origemDoVinculo &&
            contributionPeriod.dados !== undefined &&
            relation.socialSecurityAffiliationInfo.dataInicio ===
              contributionPeriod.dados.data?.dataInicio,
        );

      if (
        matchingSocialSecurityRelation?.socialSecurityAffiliationEarningsHistory
      ) {
        for (const earnings of matchingSocialSecurityRelation.socialSecurityAffiliationEarningsHistory) {
          if (
            earnings.competencia !== undefined &&
            earnings.remuneracao !== undefined
          ) {
            const underMinimumEntity =
              new RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity(
                {
                  contributionDate: earnings.competencia,
                  contributionAmount: new DecimalValue(
                    parseFloat(earnings.remuneracao),
                  ),
                  ruralTimelineCnisContributionPeriodId:
                    contributionPeriodEntity.id,
                },
              );

            transactionOperations.push(
              this.ruralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriodUnderMinimum(
                underMinimumEntity,
              ),
            );
          }
        }
      }
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return AddRuralTimelineAnalysisCnisDocumentResponseDto.build({
      cnisDocumentId: cnisDocumentEntity.id.toString(),
    });
  }
}
