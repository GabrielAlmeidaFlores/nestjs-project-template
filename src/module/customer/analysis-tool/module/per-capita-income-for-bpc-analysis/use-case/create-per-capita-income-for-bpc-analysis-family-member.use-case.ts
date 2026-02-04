import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member/command/per-capita-income-for-bpc-analysis-family-member.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member-document/command/per-capita-income-for-bpc-analysis-family-member-document.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document.entity';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/create-per-capita-income-for-bpc-analysis-family-member.request.dto';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis-family-member.response.dto';
import { PerCapitaIncomeForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase {
  protected readonly _type =
    CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway,
    @Inject(
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway,
    )
    private readonly perCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        dto.perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    const perCapitaIncomeForBpcAnalysisQueryResult =
      analysisToolRecordQueryResult.perCapitaIncomeForBpcAnalysis;

    if (perCapitaIncomeForBpcAnalysisQueryResult === null) {
      throw new PerCapitaIncomeForBpcAnalysisNotFoundError();
    }

    const perCapitaIncomeForBpcAnalysis =
      new PerCapitaIncomeForBpcAnalysisEntity({
        id: perCapitaIncomeForBpcAnalysisQueryResult.id,
        createdBy: organizationMember.id,
        updatedBy: organizationMember.id,
      });

    const transactions: TransactionType[] = [];
    const familyMembersEntities: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity[] =
      [];

    for (const familyMemberDto of dto.familyMembers) {
      const familyMemberEntity =
        new PerCapitaIncomeForBpcAnalysisFamilyMemberEntity({
          fullName: familyMemberDto.fullName,
          birthDate: familyMemberDto.birthDate,
          kinship: familyMemberDto.kinship,
          livesInSameResidence: familyMemberDto.livesInSameResidence,
          hasIncome: familyMemberDto.hasIncome,
          monthlyIncomeAmount: familyMemberDto.monthlyIncomeAmount ?? null,
          incomeType: familyMemberDto.incomeType ?? null,
          perCapitaIncomeForBpcAnalysis,
        });

      familyMembersEntities.push(familyMemberEntity);

      // Processar documentos se existirem
      if (familyMemberDto.documents && familyMemberDto.documents.length > 0) {
        const documentEntities: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity[] =
          [];

        for (const documentDto of familyMemberDto.documents) {
          const fileBuffer = Buffer.from(
            documentDto.document.base64.toString(),
            'base64',
          );

          const fileModel = {
            originalname: documentDto.document.originalFileName,
            buffer: fileBuffer,
          } as any;

          const documentFile =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const documentEntity =
            new PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity({
              document: documentFile,
              type: documentDto.type,
              perCapitaIncomeForBpcAnalysisFamilyMember: familyMemberEntity,
            });

          documentEntities.push(documentEntity);
        }

        const createDocumentsTransaction =
          this.perCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway.createManyPerCapitaIncomeForBpcAnalysisFamilyMemberDocument(
            documentEntities,
          );

        transactions.push(...createDocumentsTransaction);
      }
    }

    const createFamilyMembersTransaction =
      this.perCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway.createManyPerCapitaIncomeForBpcAnalysisFamilyMember(
        familyMembersEntities,
      );

    transactions.push(...createFamilyMembersTransaction);

    await this.baseTransactionRepositoryGateway.execute(transactions);

    return CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto.build({});
  }
}
