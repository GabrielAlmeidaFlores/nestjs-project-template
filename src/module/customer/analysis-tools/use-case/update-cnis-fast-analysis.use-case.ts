import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisClientCommandRepositoryGateway } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client/command/cnis-fast-analysis-client.command.repository.gateway';
import { CnisFastAnalysisClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client-inss-benefit/command/cnis-fast-analysis-client-inss-benefit.command.repository.gateway';
import { GetCnisFastAnalysisClientInssBenefitQueryResult } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client-inss-benefit/query/result/get-cnis-fast-analysis-client-inss-benefit.query.result';
import { CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client-legal-proceeding/command/cnis-fast-analysis-client-legal-proceeding.command.repository.gateway';
import { GetCnisFastAnalysisClientLegalProceedingQueryResult } from '@module/customer/analysis-tools/domain/repository/cnis-fast-analysis-client-legal-proceeding/query/result/get-cnis-fast-analysis-client-legal-proceeding.query.result';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisClientEntity } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';
import { CnisFastAnalysisClientLegalProceedingEntity } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tools/dto/request/update-cnis-fast-analysis.request.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tools/dto/response/update-cnis-fast-analysis.response.dto';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tools/error/cnis-document-is-not-valid.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/analysis-tools/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tools/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tools/lib/file-processor/file-processor.gateway';
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
    @Inject(CnisFastAnalysisClientCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientCommandRepositoryGateway: CnisFastAnalysisClientCommandRepositoryGateway,
    @Inject(CnisFastAnalysisClientInssBenefitCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientInssBenefitCommandRepositoryGateway: CnisFastAnalysisClientInssBenefitCommandRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway)
    private readonly cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway: CnisFastAnalysisClientLegalProceedingCommandRepositoryGateway,
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

    const cnisFastAnalysisClient = new CnisFastAnalysisClientEntity({
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

    if (dto.json?.cnisFastAnalysisClient?.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          cnisFastAnalysisClient,
          cnisFastAnalysisQueryResult.cnisFastAnalysisClient
            .cnisFastAnalysisClientInssBenefit,
          dto.json.cnisFastAnalysisClient.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.json?.cnisFastAnalysisClient?.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          cnisFastAnalysisClient,
          cnisFastAnalysisQueryResult.cnisFastAnalysisClient
            .cnisFastAnalysisClientLegalProceeding,
          dto.json.cnisFastAnalysisClient.legalProceedingNumber,
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
      this.cnisFastAnalysisClientCommandRepositoryGateway.updateCnisFastAnalysisClient(
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
    cnisFastAnalysisClient: CnisFastAnalysisClientEntity,
    currentInssBenefitNumber: GetCnisFastAnalysisClientInssBenefitQueryResult[],
    newInssBenefitNumber: number[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.cnisFastAnalysisClientInssBenefitCommandRepositoryGateway.deleteCnisFastAnalysisClientInssBenefit(
        value.id,
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new CnisFastAnalysisClientInssBenefitEntity({
        inssBenefitNumber: value,
        cnisFastAnalysisClient,
      });

      return this.cnisFastAnalysisClientInssBenefitCommandRepositoryGateway.createCnisFastAnalysisClientInssBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    cnisFastAnalysisClient: CnisFastAnalysisClientEntity,
    currentLegalProceedingNumber: GetCnisFastAnalysisClientLegalProceedingQueryResult[],
    newLegalProceeding: number[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway.deleteCnisFastAnalysisClientLegalProceeding(
        value.id,
      );
    });

    const createNew = newLegalProceeding.map((value) => {
      const entity = new CnisFastAnalysisClientLegalProceedingEntity({
        legalProceedingNumber: value,
        cnisFastAnalysisClient,
      });

      return this.cnisFastAnalysisClientLegalProceedingCommandRepositoryGateway.createCnisFastAnalysisClientLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
