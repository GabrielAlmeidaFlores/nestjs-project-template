import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { GetCnisFastAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/query/result/get-cnis-fast-analysis-inss-benefit.query.result';
import { CnisFastAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/command/cnis-fast-analysis-legal-proceeding.command.repository.gateway';
import { GetCnisFastAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-legal-proceeding/query/result/get-cnis-fast-analysis-legal-proceeding.query.result';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.entity';
import { CnisFastAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-legal-proceeding/cnis-fast-analysis-legal-proceeding.entity';
import { AnalysisSolicitationStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-solicitation-status.enum';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis.request.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/error/cnis-document-is-not-valid.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DocumentAnalysisGateway } from '@module/customer/analysis-tool/lib/document-analysis/document-analysis.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateCnisFastAnalysisUseCase {
  protected readonly _type = UpdateCnisFastAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientInssBenefitCommandRepositoryGateway)
    private readonly cnisFastAnalysisInssBenefitCommandRepositoryGateway: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(CnisFastAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly cnisFastAnalysisLegalProceedingCommandRepositoryGateway: CnisFastAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(DocumentAnalysisGateway)
    private readonly documentAnalysisGateway: DocumentAnalysisGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
    dto: UpdateCnisFastAnalysisRequestDto,
  ): Promise<UpdateCnisFastAnalysisResponseDto> {
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
        CnisFastAnalysisNotFoundError,
      );

    if (dto.cnisDocument) {
      const validateCnisDocument =
        await this.documentAnalysisGateway.validateCnisDocument(
          dto.cnisDocument.buffer,
        );

      if (validateCnisDocument === false) {
        throw new CnisDocumentIsNotValidError();
      }
    }

    const cnisDocument =
      dto.cnisDocument !== undefined
        ? await this.fileProcessorGateway.uploadDocument(
            dto.cnisDocument.buffer,
            cnisFastAnalysisQueryResult.cnisDocument ?? undefined,
          )
        : cnisFastAnalysisQueryResult.cnisDocument;

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail(
        dto.json?.analysisToolClientId ??
          cnisFastAnalysisQueryResult.analysisToolClient.id,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      ...cnisFastAnalysisQueryResult,
      analysisToolClient,
      cnisDocument,
      status: AnalysisSolicitationStatusEnum.IN_PROGRESS,
      cnisFastAnalysisResult: null,
      createdBy: cnisFastAnalysisQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          cnisFastAnalysis,
          cnisFastAnalysisQueryResult.cnisFastAnalysisInssBenefit,
          dto.json.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          cnisFastAnalysis,
          cnisFastAnalysisQueryResult.cnisFastAnalysisLegalProceeding,
          dto.json.legalProceedingNumber,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    const cnisFastAnalysisTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis(
        cnisFastAnalysis.id,
        cnisFastAnalysis,
      );
    transactions.push(cnisFastAnalysisTransaction);

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await executeTransactions.commit();

    return UpdateCnisFastAnalysisResponseDto.build({
      cnisFastAnalysisId,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    cnisFastAnalysis: CnisFastAnalysisEntity,
    currentInssBenefitNumber: GetCnisFastAnalysisInssBenefitQueryResult[],
    newInssBenefitNumber: number[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.cnisFastAnalysisInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit(
        value.id,
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new AnalysisToolClientInssBenefitEntity({
        inssBenefitNumber: value,
        cnisFastAnalysis,
      });

      return this.cnisFastAnalysisInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    cnisFastAnalysis: CnisFastAnalysisEntity,
    currentLegalProceedingNumber: GetCnisFastAnalysisLegalProceedingQueryResult[],
    newLegalProceeding: number[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.cnisFastAnalysisLegalProceedingCommandRepositoryGateway.deleteCnisFastAnalysisLegalProceeding(
        value.id,
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity = new CnisFastAnalysisLegalProceedingEntity({
        legalProceedingNumber: value,
        cnisFastAnalysis,
      });

      return this.cnisFastAnalysisLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
