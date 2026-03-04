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
import { RuralTimelineAnalysisDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/query/rural-timeline-analysis-document.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';
import { UpdateRuralTimelineAnalysisDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-document.request.dto';
import { UpdateRuralTimelineAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-document.response.dto';
import { RuralTimelineAnalysisDocumentNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-document-not-found.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';

@Injectable()
export class UpdateRuralTimelineAnalysisDocumentUseCase {
  protected readonly _type = UpdateRuralTimelineAnalysisDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisDocumentQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisDocumentQueryRepositoryGateway: RuralTimelineAnalysisDocumentQueryRepositoryGateway,
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
    documentId: RuralTimelineAnalysisDocumentId,
    dto: UpdateRuralTimelineAnalysisDocumentRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisDocumentResponseDto> {
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

    const existingDocument =
      await this.ruralTimelineAnalysisDocumentQueryRepositoryGateway.findOneById(
        documentId,
      );

    if (existingDocument === null) {
      throw new RuralTimelineAnalysisDocumentNotFoundError();
    }

    if (
      existingDocument.ruralTimelineId.toString() !==
      ruralTimelineAnalysisId.toString()
    ) {
      throw new RuralTimelineAnalysisDocumentNotFoundError();
    }

    let documentLocation: string = existingDocument.document;

    if (dto.document !== undefined) {
      const fileBuffer = dto.document.base64.decodeToBuffer();
      const fileModel = FileModel.build({
        buffer: fileBuffer,
        originalName: dto.document.originalFileName,
        size: fileBuffer.length,
        encoding: 'base64',
      });

      documentLocation = await this.fileProcessorGateway.uploadFile(
        fileModel,
        existingDocument.document,
      );
    }

    const finalType = dto.type ?? existingDocument.type;
    const shouldRegenerateCnisPeriods = dto.document !== undefined;

    const updatedEntity = new RuralTimelineAnalysisDocumentEntity({
      id: documentId,
      ruralTimelineId: existingDocument.ruralTimelineId,
      type: finalType,
      document: documentLocation,
      createdAt: existingDocument.createdAt,
      updatedAt: existingDocument.updatedAt,
      deletedAt: existingDocument.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisDocumentCommandRepositoryGateway.updateRuralTimelineAnalysisDocument(
        updatedEntity,
      ),
    );

    await transaction.commit();

    if (shouldRegenerateCnisPeriods && dto.document !== undefined) {
      await this.regenerateCnisPeriods(
        sessionData,
        organizationSessionData,
        ruralTimelineAnalysisId,
        dto.document.base64.decodeToBuffer(),
        analysisToolRecordQueryResult,
      );
    }

    return UpdateRuralTimelineAnalysisDocumentResponseDto.build({
      ruralTimelineAnalysisDocumentId: updatedEntity.id,
    });
  }

  private async regenerateCnisPeriods(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    documentBuffer: Buffer,
    analysisToolRecordQueryResult: GetAnalysisToolRecordWithRelationsQueryResult,
  ): Promise<void> {
    const cnisData =
      await this.cnisProcessorGateway.parseCnisDocument(documentBuffer);

    const analysisToolClient = new AnalysisToolClientEntity({
      id: analysisToolRecordQueryResult.analysisToolClient.id,
      name: analysisToolRecordQueryResult.analysisToolClient.name,
      federalDocument:
        analysisToolRecordQueryResult.analysisToolClient.federalDocument,
      email: analysisToolRecordQueryResult.analysisToolClient.email,
      corporateEmail:
        analysisToolRecordQueryResult.analysisToolClient.corporateEmail,
      inssPassword:
        analysisToolRecordQueryResult.analysisToolClient.inssPassword,
      phoneNumber: analysisToolRecordQueryResult.analysisToolClient.phoneNumber,
      birthDate: analysisToolRecordQueryResult.analysisToolClient.birthDate,
      gender: analysisToolRecordQueryResult.analysisToolClient.gender,
      clientType: analysisToolRecordQueryResult.analysisToolClient.clientType,
      createdAt: analysisToolRecordQueryResult.analysisToolClient.createdAt,
      updatedAt: analysisToolRecordQueryResult.analysisToolClient.updatedAt,
      deletedAt: analysisToolRecordQueryResult.analysisToolClient.deletedAt,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
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
      const batchSize = 10;
      for (let i = 0; i < existingPeriods.resource.length; i += batchSize) {
        const batch = existingPeriods.resource.slice(i, i + batchSize);
        const deleteOperations = batch.map((period) =>
          this.ruralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway.deleteRuralTimelineAnalysisCnisContributionPeriod(
            period.id,
          ),
        );
        const deleteTransaction =
          await this.baseTransactionRepositoryGateway.execute(deleteOperations);
        await deleteTransaction.commit();
      }
    }

    const batchSize = 5;
    const contributionPeriods = cnisAnalysis.tempoDeContribuicao.filter(
      (period) => period.dados !== undefined && period.dados?.data?.dataInicio != null,
    );

    for (let i = 0; i < contributionPeriods.length; i += batchSize) {
      const batch = contributionPeriods.slice(i, i + batchSize);
      const batchOperations = [];

      for (const contributionPeriod of batch) {
        const contributionPeriodEntity =
          new RuralTimelineAnalysisCnisContributionPeriodEntity({
            ruralTimelineId: ruralTimelineAnalysisId,
            sequencial: contributionPeriod.seq ?? null,
            employmentRelationshipSource:
              contributionPeriod.origemDoVinculo ?? null,
            startDate: contributionPeriod.dados?.data?.dataInicio ?? null,
            endDate: contributionPeriod.dados?.data?.dataFim ?? null,
            category: contributionPeriod.tipoDoVinculo ?? null,
            qualifyingPeriod: contributionPeriod.dados?.meses ?? 0,
            status: RuralTimelineAnalysisCnisContributionPeriodStatusEnum.VALID,
            averageContributionAmount: null,
            contributionAdjustmentIntent:
              ContributionAdjustmentIntentTypeEnum.PROVISIONAL,
            externalSupplementationIntent: false,
            shouldConsiderPeriod: true,
            shouldConsiderLastRemunerationAsExitDate: false,
          });

        batchOperations.push(
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

              batchOperations.push(
                this.ruralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriodUnderMinimum(
                  underMinimumEntity,
                ),
              );
            }
          }
        }
      }

      const batchTransaction =
        await this.baseTransactionRepositoryGateway.execute(batchOperations);
      await batchTransaction.commit();
    }
  }
}
