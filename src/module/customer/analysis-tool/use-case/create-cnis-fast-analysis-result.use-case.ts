import { Inject, Injectable } from '@nestjs/common';
import { stringify } from 'flatted';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { CnisAnalyzerGateway } from '@lib/cnis-analysis/cnis-analyzer-gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CnisDocumentRequiredError } from '@module/customer/analysis-tool/error/cnis-document-required.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
@Injectable()
export class CreateCnisFastAnalysisResultUseCase {
  protected readonly _type = CreateCnisFastAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(CnisFastAnalysisResultCommandRepositoryGateway)
    private readonly cnisFastAnalysisResultCommandRepositoryGateway: CnisFastAnalysisResultCommandRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CnisAnalyzerGateway)
    private readonly cnisAnalysisGateway: CnisAnalyzerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<CreateCnisFastAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisFastAnalysisQueryResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        CnisFastAnalysisNotFoundError,
      );

    if (cnisFastAnalysisQueryResult.cnisDocument === null) {
      throw new CnisDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(cnisFastAnalysisQueryResult.analysisToolClient, null, 2),
      'utf-8',
    );
    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      cnisFastAnalysisQueryResult.cnisDocument,
    );
    const cnisDocumentData =
      await this.analysisProcessorGateway.parseCnisDocument(cnisDocumentBuffer);

    const cnisDocumentDataBuffer = Buffer.from(
      JSON.stringify(cnisDocumentData, null, 2),
      'utf-8',
    );

    const cnisAnalyzerResponse =
      await this.cnisAnalysisGateway.analyseCnisDocument(cnisDocumentBuffer);

    const jsonCnisAnalyzerResponse = stringify(cnisAnalyzerResponse);

    const cnisCompleteAnalysis =
      await this.analysisProcessorGateway.getCnisCompleteAnalysis(
        [clientDataBuffer, cnisDocumentDataBuffer],
        jsonCnisAnalyzerResponse,
      );

    let clientLastAffiliationDate: Date | null = null;

    cnisDocumentData.socialSecurityRelations?.forEach(
      (socialSecurityRelation) => {
        if (
          socialSecurityRelation.socialSecurityAffiliationInfo.dataFim ===
          undefined
        ) {
          return;
        }

        if (clientLastAffiliationDate === null) {
          clientLastAffiliationDate =
            socialSecurityRelation.socialSecurityAffiliationInfo.dataFim ??
            null;
          return;
        }

        if (
          socialSecurityRelation.socialSecurityAffiliationInfo.dataFim >
          clientLastAffiliationDate
        ) {
          clientLastAffiliationDate =
            socialSecurityRelation.socialSecurityAffiliationInfo.dataFim;
        }
      },
    );

    const cnisFastAnalysisResult = new CnisFastAnalysisResultEntity({
      clientLastAffiliationDate,
      cnisCompleteAnalysis,
      clientBirthDate:
        cnisDocumentData.affiliateIdentification?.dataDeNascimento ?? null,
      clientName: cnisDocumentData.affiliateIdentification?.nome ?? null,
      clientFederalDocument:
        cnisDocumentData.affiliateIdentification?.cpf !== undefined
          ? new FederalDocument(cnisDocumentData.affiliateIdentification.cpf)
          : null,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...cnisFastAnalysisQueryResult.analysisToolClient,
      createdBy: cnisFastAnalysisQueryResult.analysisToolClient.createdBy.id,
      updatedBy: cnisFastAnalysisQueryResult.analysisToolClient.updatedBy.id,
    });

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      ...cnisFastAnalysisQueryResult,
      analysisToolClient,
      cnisFastAnalysisResult,
      status: AnalysisStatusEnum.COMPLETED,
      cnisDocument: cnisFastAnalysisQueryResult.cnisDocument,
      createdBy: cnisFastAnalysisQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const createCnisFastAnalysisResultTransaction =
      this.cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult(
        cnisFastAnalysisResult,
      );
    const updateCnisFastAnalysisTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis(
        cnisFastAnalysis.id,
        cnisFastAnalysis,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createCnisFastAnalysisResultTransaction,
      updateCnisFastAnalysisTransaction,
    ]);
    await transaction.commit();

    return CreateCnisFastAnalysisResultResponseDto.build({
      ...cnisFastAnalysisResult,
    });
  }
}
