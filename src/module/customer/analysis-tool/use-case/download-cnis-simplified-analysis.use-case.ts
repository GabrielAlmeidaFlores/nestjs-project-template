import { Inject, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { CnisFastAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-does-not-contain-complete-analysis.error';
import { CnisFastAnalysisDoesNotContainSimplifiedAnalysisError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-does-not-contain-simplified-analysis.error copy';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class DownloadCnisSimplifiedAnalysisUseCase {
  protected readonly _type = DownloadCnisSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(CnisFastAnalysisResultCommandRepositoryGateway)
    private readonly cnisFastAnalysisResultCommandRepositoryGateway: CnisFastAnalysisResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisFastAnalysisQueryResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        CnisFastAnalysisNotFoundError,
      );

    if (!cnisFastAnalysisQueryResult.cnisFastAnalysisResult) {
      throw new CnisFastAnalysisDoesNotContainCompleteAnalysisError();
    }

    if (
      cnisFastAnalysisQueryResult.cnisFastAnalysisResult
        .cnisCompleteAnalysis === null
    ) {
      throw new CnisFastAnalysisDoesNotContainCompleteAnalysisError();
    }

    let responseAi =
      cnisFastAnalysisQueryResult.cnisFastAnalysisResult.cnisSimplifiedAnalysis;

    if (responseAi === null) {
      const cnisSimplifiedAnalysis =
        await this.analysisProcessorGateway.getCnisSimplifiedAnalysis([
          Buffer.from(
            cnisFastAnalysisQueryResult.cnisFastAnalysisResult
              .cnisCompleteAnalysis,
            'utf-8',
          ),
        ]);

      const cnisFastAnalysisResult = new CnisFastAnalysisResultEntity({
        ...cnisFastAnalysisQueryResult.cnisFastAnalysisResult,
        cnisSimplifiedAnalysis,
      });

      const cnisFastAnalysisResultTransaction =
        this.cnisFastAnalysisResultCommandRepositoryGateway.updateCnisFastAnalysisResult(
          cnisFastAnalysisQueryResult.cnisFastAnalysisResult.id,
          cnisFastAnalysisResult,
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute(
        cnisFastAnalysisResultTransaction,
      );
      await transaction.commit();

      responseAi = cnisSimplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new CnisFastAnalysisDoesNotContainSimplifiedAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_simplificada_rapida_cnis',
    );
  }
}
