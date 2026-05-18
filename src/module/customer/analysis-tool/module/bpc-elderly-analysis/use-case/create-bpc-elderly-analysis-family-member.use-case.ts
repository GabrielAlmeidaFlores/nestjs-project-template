import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyAnalysisFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-family-member/command/bpc-elderly-analysis-family-member.command.repository.gateway';
import { BpcElderlyAnalysisFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-family-member-document/command/bpc-elderly-analysis-family-member-document.command.repository.gateway';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/bpc-elderly-analysis-family-member-document.entity';
import { CreateBpcElderlyAnalysisFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/request/create-bpc-elderly-analysis-family-member.request.dto';
import { CreateBpcElderlyAnalysisFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis-family-member.response.dto';
import { BpcElderlyAnalysisNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/error/bpc-elderly-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateBpcElderlyAnalysisFamilyMemberUseCase {
  protected readonly _type = CreateBpcElderlyAnalysisFamilyMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
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
    dto: CreateBpcElderlyAnalysisFamilyMemberRequestDto,
  ): Promise<CreateBpcElderlyAnalysisFamilyMemberResponseDto> {
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

    const bpcElderlyAnalysisQueryResult =
      analysisToolRecordQueryResult.bpcElderlyAnalysis;

    if (bpcElderlyAnalysisQueryResult === null) {
      throw new BpcElderlyAnalysisNotFoundError();
    }

    const bpcElderlyAnalysis = new BpcElderlyAnalysisEntity({
      id: bpcElderlyAnalysisQueryResult.id,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const transactions: TransactionType[] = [];

    for (const familyMemberDto of dto.familyMembers) {
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

    return CreateBpcElderlyAnalysisFamilyMemberResponseDto.build({
      bpcElderlyAnalysisId: bpcElderlyAnalysis.id,
    });
  }
}
