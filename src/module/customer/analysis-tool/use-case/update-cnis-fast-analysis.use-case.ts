import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/query/result/get-analysis-tool-client-inss-benefit.query.result';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.entity';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis.request.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/error/cnis-document-is-not-valid.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tool/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
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
    @Inject(AnalysisToolClientCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientCommandRepositoryGateway: AnalysisToolClientCommandRepositoryGateway,
    @Inject(AnalysisToolClientInssBenefitCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientInssBenefitCommandRepositoryGateway: AnalysisToolClientInssBenefitCommandRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(AnalysisToolClientLegalProceedingCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
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
        await this.fileProcessorGateway.validateCnisDocument(
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

    const cnisFastAnalysisClient = new AnalysisToolClientEntity({
      ...cnisFastAnalysisQueryResult.cnisFastAnalysisClient,
      ...dto.json?.cnisFastAnalysisClient,
    });

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      ...cnisFastAnalysisQueryResult,
      cnisFastAnalysisClient,
      cnisDocument,
      cnisFastAnalysisResult: null,
      createdBy: cnisFastAnalysisQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transactions: TransactionType[] = [];

    if (dto.json?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          cnisFastAnalysis,
          cnisFastAnalysisQueryResult.cnisFastAnalysisClientInssBenefit,
          dto.json.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          cnisFastAnalysis,
          cnisFastAnalysisQueryResult.cnisFastAnalysisClientLegalProceeding,
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

    const cnisFastAnalysisClientTransaction =
      this.cnisFastAnalysisClientCommandRepositoryGateway.updateAnalysisToolClient(
        cnisFastAnalysis.cnisFastAnalysisClient.id,
        cnisFastAnalysis.cnisFastAnalysisClient,
      );
    transactions.push(cnisFastAnalysisClientTransaction);

    const executeTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await executeTransactions.commit();

    return UpdateCnisFastAnalysisResponseDto.build({
      cnisFastAnalysisId,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    cnisFastAnalysis: CnisFastAnalysisEntity,
    currentInssBenefitNumber: GetAnalysisToolClientInssBenefitQueryResult[],
    newInssBenefitNumber: number[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.cnisFastAnalysisClientInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit(
        value.id,
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new AnalysisToolClientInssBenefitEntity({
        inssBenefitNumber: value,
        cnisFastAnalysis,
      });

      return this.cnisFastAnalysisClientInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    cnisFastAnalysis: CnisFastAnalysisEntity,
    currentLegalProceedingNumber: GetAnalysisToolClientLegalProceedingQueryResult[],
    newLegalProceeding: number[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway.deleteAnalysisToolClientLegalProceeding(
        value.id,
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity = new AnalysisToolClientLegalProceedingEntity({
        legalProceedingNumber: value,
        cnisFastAnalysis,
      });

      return this.cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway.createAnalysisToolClientLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
