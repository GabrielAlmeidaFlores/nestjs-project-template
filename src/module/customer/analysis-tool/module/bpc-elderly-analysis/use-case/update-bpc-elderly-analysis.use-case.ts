import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/command/bpc-elderly-analysis.command.repository.gateway';
import { BpcElderlyAnalysisFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-family-member/command/bpc-elderly-analysis-family-member.command.repository.gateway';
import { BpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-family-member-document/command/bpc-elderly-analysis-family-member-document.command.repository.gateway';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';
import { UpdateBpcElderlyAnalysisRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/request/update-bpc-elderly-analysis.request.dto';
import { UpdateBpcElderlyAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/update-bpc-elderly-analysis.response.dto';
import { BpcElderlyAnalysisNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateBpcElderlyAnalysisUseCase {
  protected readonly _type = UpdateBpcElderlyAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcElderlyAnalysisCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisCommandRepositoryGateway: BpcElderlyAnalysisCommandRepositoryGateway,
    @Inject(BpcElderlyAnalysisFamilyMemberCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisFamilyMemberCommandRepositoryGateway: BpcElderlyAnalysisFamilyMemberCommandRepositoryGateway,
    @Inject(BpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway)
    private readonly bpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway: BpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    dto: UpdateBpcElderlyAnalysisRequestDto,
  ): Promise<UpdateBpcElderlyAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyAnalysisNotFoundError,
      );

    const transactions: TransactionType[] = [];

    if (dto.category !== undefined) {
      const updatedBpcElderlyAnalysis = new BpcElderlyAnalysisEntity({
        id: bpcElderlyAnalysisId,
        category: dto.category,
        createdBy: organizationMember.id,
        updatedBy: organizationMember.id,
      });

      transactions.push(
        this.bpcElderlyAnalysisCommandRepositoryGateway.updateBpcElderlyAnalysis(
          bpcElderlyAnalysisId,
          updatedBpcElderlyAnalysis,
        ),
      );
    }

    if (dto.analysisToolClientId !== undefined) {
      transactions.push(
        this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordAnalysisToolClient(
          analysisToolRecordQueryResult.id,
          dto.analysisToolClientId,
        ),
      );
    }

    if (dto.familyMembers !== undefined) {
      transactions.push(
        this.bpcElderlyAnalysisFamilyMemberCommandRepositoryGateway.deleteAllByBpcElderlyAnalysisId(
          bpcElderlyAnalysisId,
        ),
      );

      const familyMemberTransactions = await this.buildFamilyMemberTransactions(
        bpcElderlyAnalysisId,
        dto.familyMembers,
        organizationMember.id,
      );

      transactions.push(...familyMemberTransactions);
    }

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return UpdateBpcElderlyAnalysisResponseDto.build({
      bpcElderlyAnalysisId,
    });
  }

  private async buildFamilyMemberTransactions(
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    familyMemberDtos: UpdateBpcElderlyAnalysisRequestDto['familyMembers'] & {},
    organizationMemberId: OrganizationMemberId,
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [];

    const bpcElderlyAnalysis = new BpcElderlyAnalysisEntity({
      id: bpcElderlyAnalysisId,
      createdBy: organizationMemberId,
      updatedBy: organizationMemberId,
    });

    for (const familyMemberDto of familyMemberDtos) {
      const familyMemberEntity = new BpcElderlyAnalysisFamilyMemberEntity({
        fullName: familyMemberDto.fullName,
        birthDate: familyMemberDto.birthDate,
        kinship: familyMemberDto.kinship,
        livesInSameResidence: familyMemberDto.livesInSameResidence,
        hasIncome: familyMemberDto.hasIncome,
        monthlyIncomeAmount: familyMemberDto.monthlyIncomeAmount ?? null,
        incomeType: familyMemberDto.incomeType ?? null,
        bpcElderlyAnalysis,
      });

      transactions.push(
        this.bpcElderlyAnalysisFamilyMemberCommandRepositoryGateway.createBpcElderlyAnalysisFamilyMember(
          familyMemberEntity,
        ),
      );

      if (familyMemberDto.documents && familyMemberDto.documents.length > 0) {
        for (const documentDto of familyMemberDto.documents) {
          const fileBuffer = Buffer.from(
            documentDto.document.base64.toString(),
            'base64',
          );

          const fileModel = FileModel.build({
            buffer: fileBuffer,
            originalName: documentDto.document.originalFileName,
            size: fileBuffer.length,
            encoding: '7bit',
          });

          const documentFile =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const documentEntity =
            new BpcElderlyAnalysisFamilyMemberDocumentEntity({
              document: documentFile,
              type: documentDto.type,
              bpcElderlyAnalysisFamilyMember: familyMemberEntity,
            });

          transactions.push(
            this.bpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway.createBpcElderlyAnalysisFamilyMemberDocument(
              documentEntity,
            ),
          );
        }
      }
    }

    return transactions;
  }
}
