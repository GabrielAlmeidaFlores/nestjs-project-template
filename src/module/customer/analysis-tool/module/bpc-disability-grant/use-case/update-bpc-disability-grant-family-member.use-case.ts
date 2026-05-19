import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityGrantFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-family-member/command/bpc-disability-grant-family-member.command.repository.gateway';
import { BpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-family-member-document/command/bpc-disability-grant-family-member-document.command.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/bpc-disability-grant-family-member.entity';
import { BpcDisabilityGrantFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/bpc-disability-grant-family-member-document.entity';
import { UpdateBpcDisabilityGrantFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/update-bpc-disability-grant-family-member.request.dto';
import { UpdateBpcDisabilityGrantResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/update-bpc-disability-grant.response.dto';
import { BpcDisabilityGrantNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateBpcDisabilityGrantFamilyMemberUseCase {
  protected readonly _type = UpdateBpcDisabilityGrantFamilyMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantFamilyMemberCommandRepositoryGateway)
    private readonly bpcDisabilityGrantFamilyMemberCommandRepositoryGateway: BpcDisabilityGrantFamilyMemberCommandRepositoryGateway,
    @Inject(BpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway)
    private readonly bpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway: BpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway,
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
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    dto: UpdateBpcDisabilityGrantFamilyMemberRequestDto,
  ): Promise<UpdateBpcDisabilityGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityGrantNotFoundError,
      );

    if (analysisToolRecordQueryResult.bpcDisabilityGrant === null) {
      throw new BpcDisabilityGrantNotFoundError();
    }

    const transactions = await this.buildFamilyMemberTransactions(
      bpcDisabilityGrantId,
      dto,
    );

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

    return UpdateBpcDisabilityGrantResponseDto.build({
      BpcDisabilityGrantId: bpcDisabilityGrantId,
    });
  }

  private async buildFamilyMemberTransactions(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    dto: UpdateBpcDisabilityGrantFamilyMemberRequestDto,
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [
      this.bpcDisabilityGrantFamilyMemberCommandRepositoryGateway.deleteAllByBpcDisabilityGrantId(
        bpcDisabilityGrantId,
      ),
    ];

    for (const familyMemberDto of dto.familyMembers) {
      const familyMemberEntity = new BpcDisabilityGrantFamilyMemberEntity({
        fullName: familyMemberDto.fullName,
        birthDate: familyMemberDto.birthDate,
        kinship: familyMemberDto.kinship,
        livesInSameResidence: familyMemberDto.livesInSameResidence,
        hasIncome: familyMemberDto.hasIncome,
        monthlyIncomeAmount: familyMemberDto.monthlyIncomeAmount ?? null,
        incomeType: familyMemberDto.incomeType ?? null,
        hasExpenseProofs: familyMemberDto.hasExpenseProofs ?? null,
        BpcDisabilityGrantId: bpcDisabilityGrantId,
      });

      transactions.push(
        this.bpcDisabilityGrantFamilyMemberCommandRepositoryGateway.createBpcDisabilityGrantFamilyMember(
          familyMemberEntity,
        ),
      );

      for (const documentDto of familyMemberDto.documents ?? []) {
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

        transactions.push(
          this.bpcDisabilityGrantFamilyMemberDocumentCommandRepositoryGateway.createBpcDisabilityGrantFamilyMemberDocument(
            new BpcDisabilityGrantFamilyMemberDocumentEntity({
              document: documentFile,
              type: documentDto.type,
              BpcDisabilityGrantFamilyMemberId: familyMemberEntity.id,
            }),
          ),
        );
      }
    }

    return transactions;
  }
}
