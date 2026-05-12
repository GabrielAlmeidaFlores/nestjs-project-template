import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant/command/bpc-disability-grant.command.repository.gateway';
import { BpcDisabilityGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-document/command/bpc-disability-grant-document.command.repository.gateway';
import { BpcDisabilityGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-inss-benefit/command/bpc-disability-grant-inss-benefit.command.repository.gateway';
import { BpcDisabilityGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-legal-proceeding/command/bpc-disability-grant-legal-proceeding.command.repository.gateway';
import { BpcDisabilityGrantEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/bpc-disability-grant.entity';
import { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import { BpcDisabilityGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity';
import { BpcDisabilityGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity';
import { CreateBpcDisabilityGrantRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/create-bpc-disability-grant.request.dto';
import { CreateBpcDisabilityGrantResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateBpcDisabilityGrantUseCase {
  protected readonly _type = CreateBpcDisabilityGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantCommandRepositoryGateway)
    private readonly bpcDisabilityGrantCommandRepositoryGateway: BpcDisabilityGrantCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
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
    dto: CreateBpcDisabilityGrantRequestDto,
  ): Promise<CreateBpcDisabilityGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const BpcDisabilityGrant = new BpcDisabilityGrantEntity({
      analysisName: dto.analysisName ?? null,
      requestEntryDate: dto.requestEntryDate ?? null,
      denialDate: dto.denialDate ?? null,
      requestedBenefitType: dto.requestedBenefitType ?? null,
      category: dto.category ?? null,
      disabilityType: dto.disabilityType ?? null,
      disabilityDegree: dto.disabilityDegree ?? null,
      estimatedDisabilityStartDate: dto.estimatedDisabilityStartDate ?? null,
      attendsSchoolOrTechnicalCourse:
        dto.attendsSchoolOrTechnicalCourse ?? null,
      performsLaborActivity: dto.performsLaborActivity ?? null,
      needsThirdPartyHelp: dto.needsThirdPartyHelp ?? null,
      hasAccessToBasicServices: dto.hasAccessToBasicServices ?? null,
      otherBarriersDescription: dto.otherBarriersDescription ?? null,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.BPC_DISABILITY_GRANT,
      bpcDisabilityGrant: BpcDisabilityGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const createBpcDisabilityGrantTransaction =
      this.bpcDisabilityGrantCommandRepositoryGateway.createBpcDisabilityGrant(
        BpcDisabilityGrant,
      );

    const createAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const inssBenefitTransactions = (dto.inssBenefitNumbers ?? []).map(
      (inssBenefitNumber) =>
        this.bpcDisabilityGrantInssBenefitCommandRepositoryGateway.createBpcDisabilityGrantInssBenefit(
          new BpcDisabilityGrantInssBenefitEntity({
            inssBenefitNumber,
            BpcDisabilityGrantId: BpcDisabilityGrant.id,
          }),
        ),
    );

    const legalProceedingTransactions = (dto.legalProceedingNumbers ?? []).map(
      (legalProceedingNumber) =>
        this.bpcDisabilityGrantLegalProceedingCommandRepositoryGateway.createBpcDisabilityGrantLegalProceeding(
          new BpcDisabilityGrantLegalProceedingEntity({
            legalProceedingNumber,
            BpcDisabilityGrantId: BpcDisabilityGrant.id,
          }),
        ),
    );

    const documentEntities: BpcDisabilityGrantDocumentEntity[] = [];

    for (const documentDto of dto.documents ?? []) {
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

      documentEntities.push(
        new BpcDisabilityGrantDocumentEntity({
          document: uploadedDocument,
          type: documentDto.type,
          BpcDisabilityGrant,
        }),
      );
    }

    const documentTransactions =
      documentEntities.length > 0
        ? this.bpcDisabilityGrantDocumentCommandRepositoryGateway.createManyBpcDisabilityGrantDocument(
            documentEntities,
          )
        : [];

    const transactions = [
      createBpcDisabilityGrantTransaction,
      createAnalysisToolRecordTransaction,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
      ...documentTransactions,
    ];

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.BPC_DISABILITY_GRANT,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return CreateBpcDisabilityGrantResponseDto.build({
      BpcDisabilityGrantId: BpcDisabilityGrant.id,
    });
  }
}
