import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/command/bpc-disability-grant.command.repository.gateway';
import { BpcDisabilityGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-document/command/bpc-disability-grant-document.command.repository.gateway';
import { BpcDisabilityGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-inss-benefit/command/bpc-disability-grant-inss-benefit.command.repository.gateway';
import { BpcDisabilityGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-legal-proceeding/command/bpc-disability-grant-legal-proceeding.command.repository.gateway';
import { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import { BpcDisabilityGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity';
import { BpcDisabilityGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity';
import { UpdateBpcDisabilityGrantRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/update-bpc-disability-grant.request.dto';
import { UpdateBpcDisabilityGrantResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/update-bpc-disability-grant.response.dto';
import { BpcDisabilityGrantNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateBpcDisabilityGrantUseCase {
  protected readonly _type = UpdateBpcDisabilityGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BpcDisabilityGrantCommandRepositoryGateway)
    private readonly bpcDisabilityGrantCommandRepositoryGateway: BpcDisabilityGrantCommandRepositoryGateway,
    @Inject(BpcDisabilityGrantInssBenefitCommandRepositoryGateway)
    private readonly bpcDisabilityGrantInssBenefitCommandRepositoryGateway: BpcDisabilityGrantInssBenefitCommandRepositoryGateway,
    @Inject(BpcDisabilityGrantLegalProceedingCommandRepositoryGateway)
    private readonly bpcDisabilityGrantLegalProceedingCommandRepositoryGateway: BpcDisabilityGrantLegalProceedingCommandRepositoryGateway,
    @Inject(BpcDisabilityGrantDocumentCommandRepositoryGateway)
    private readonly bpcDisabilityGrantDocumentCommandRepositoryGateway: BpcDisabilityGrantDocumentCommandRepositoryGateway,
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
    dto: UpdateBpcDisabilityGrantRequestDto,
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

    const transactions: TransactionType[] = [];
    const currentBpcDisabilityGrant =
      analysisToolRecordQueryResult.bpcDisabilityGrant;

    if (currentBpcDisabilityGrant === null) {
      throw new BpcDisabilityGrantNotFoundError();
    }

    const updatedBpcDisabilityGrant = new BpcDisabilityGrantEntity({
      id: bpcDisabilityGrantId,
      analysisName:
        dto.analysisName ?? currentBpcDisabilityGrant.analysisName ?? null,
      requestEntryDate:
        dto.requestEntryDate ??
        currentBpcDisabilityGrant.requestEntryDate ??
        null,
      denialDate:
        dto.denialDate ?? currentBpcDisabilityGrant.denialDate ?? null,
      requestedBenefitType:
        dto.requestedBenefitType ??
        currentBpcDisabilityGrant.requestedBenefitType ??
        null,
      category: dto.category ?? currentBpcDisabilityGrant.category ?? null,
      disabilityType:
        dto.disabilityType ?? currentBpcDisabilityGrant.disabilityType ?? null,
      disabilityDegree:
        dto.disabilityDegree ??
        currentBpcDisabilityGrant.disabilityDegree ??
        null,
      estimatedDisabilityStartDate:
        dto.estimatedDisabilityStartDate ??
        currentBpcDisabilityGrant.estimatedDisabilityStartDate ??
        null,
      attendsSchoolOrTechnicalCourse:
        dto.attendsSchoolOrTechnicalCourse ??
        currentBpcDisabilityGrant.attendsSchoolOrTechnicalCourse ??
        null,
      performsLaborActivity:
        dto.performsLaborActivity ??
        currentBpcDisabilityGrant.performsLaborActivity ??
        null,
      needsThirdPartyHelp:
        dto.needsThirdPartyHelp ??
        currentBpcDisabilityGrant.needsThirdPartyHelp ??
        null,
      hasAccessToBasicServices:
        dto.hasAccessToBasicServices ??
        currentBpcDisabilityGrant.hasAccessToBasicServices ??
        null,
      otherBarriersDescription:
        dto.otherBarriersDescription ??
        currentBpcDisabilityGrant.otherBarriersDescription ??
        null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    transactions.push(
      this.bpcDisabilityGrantCommandRepositoryGateway.updateBpcDisabilityGrant(
        bpcDisabilityGrantId,
        updatedBpcDisabilityGrant,
      ),
    );

    if (dto.analysisToolClientId !== undefined) {
      transactions.push(
        this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecordAnalysisToolClient(
          analysisToolRecordQueryResult.id,
          dto.analysisToolClientId,
        ),
      );
    }

    if (dto.inssBenefitNumbers !== undefined) {
      for (const inssBenefit of currentBpcDisabilityGrant.BpcDisabilityGrantInssBenefit) {
        transactions.push(
          this.bpcDisabilityGrantInssBenefitCommandRepositoryGateway.deleteBpcDisabilityGrantInssBenefit(
            inssBenefit.id,
          ),
        );
      }

      for (const inssBenefitNumber of dto.inssBenefitNumbers) {
        transactions.push(
          this.bpcDisabilityGrantInssBenefitCommandRepositoryGateway.createBpcDisabilityGrantInssBenefit(
            new BpcDisabilityGrantInssBenefitEntity({
              inssBenefitNumber,
              BpcDisabilityGrantId: bpcDisabilityGrantId,
            }),
          ),
        );
      }
    }

    if (dto.legalProceedingNumbers !== undefined) {
      for (const legalProceeding of currentBpcDisabilityGrant.BpcDisabilityGrantLegalProceeding) {
        transactions.push(
          this.bpcDisabilityGrantLegalProceedingCommandRepositoryGateway.deleteBpcDisabilityGrantLegalProceeding(
            legalProceeding.id,
          ),
        );
      }

      for (const legalProceedingNumber of dto.legalProceedingNumbers) {
        transactions.push(
          this.bpcDisabilityGrantLegalProceedingCommandRepositoryGateway.createBpcDisabilityGrantLegalProceeding(
            new BpcDisabilityGrantLegalProceedingEntity({
              legalProceedingNumber,
              BpcDisabilityGrantId: bpcDisabilityGrantId,
            }),
          ),
        );
      }
    }

    if (dto.documents !== undefined) {
      transactions.push(
        this.bpcDisabilityGrantDocumentCommandRepositoryGateway.deleteAllByBpcDisabilityGrantId(
          bpcDisabilityGrantId,
        ),
      );

      for (const documentDto of dto.documents) {
        const fileBuffer = Buffer.from(
          documentDto.file.base64.toString(),
          'base64',
        );

        const fileModel = FileModel.build({
          buffer: fileBuffer,
          originalName: documentDto.file.originalFileName,
          size: fileBuffer.length,
          encoding: '7bit',
        });

        const uploadedDocument =
          await this.fileProcessorGateway.uploadFile(fileModel);

        const documentEntity = new BpcDisabilityGrantDocumentEntity({
          document: uploadedDocument,
          type: documentDto.type,
          BpcDisabilityGrant: updatedBpcDisabilityGrant,
        });

        const documentTransactions =
          this.bpcDisabilityGrantDocumentCommandRepositoryGateway.createManyBpcDisabilityGrantDocument(
            [documentEntity],
          );

        transactions.push(...documentTransactions);
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

    return UpdateBpcDisabilityGrantResponseDto.build({
      BpcDisabilityGrantId: bpcDisabilityGrantId,
    });
  }
}
