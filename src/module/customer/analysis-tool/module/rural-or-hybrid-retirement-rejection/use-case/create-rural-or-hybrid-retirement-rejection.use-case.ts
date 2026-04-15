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
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-document/command/rural-or-hybrid-retirement-rejection-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-inss-benefit/command/rural-or-hybrid-retirement-rejection-inss-benefit.command.repository.gateway';
import { RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-legal-proceeding/command/rural-or-hybrid-retirement-rejection-legal-proceeding.command.repository.gateway';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/rural-or-hybrid-retirement-rejection-document.entity';
import { RuralOrHybridRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/value-object/rural-or-hybrid-retirement-rejection-document-id.value-object';
import { RuralOrHybridRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/rural-or-hybrid-retirement-rejection-inss-benefit.entity';
import { RuralOrHybridRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/rural-or-hybrid-retirement-rejection-legal-proceeding.entity';
import { CreateRuralOrHybridRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection.request.dto';
import { CreateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type =
    CreateRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionCommandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway: RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway: RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRuralOrHybridRetirementRejectionRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionResponseDto> {
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

    const ruralOrHybridRetirementRejection =
      new RuralOrHybridRetirementRejectionEntity({
        analysisName: dto.analysisName ?? null,
        activityType: dto.activityType ?? null,
        requestedBenefit: dto.requestedBenefit ?? null,
        applicationSubmissionDate: dto.applicationSubmissionDate ?? null,
        dateOfRejection: dto.dateOfRejection ?? null,
      });

    const documentEntities = await this.buildDocumentEntities(
      ruralOrHybridRetirementRejection.id,
      dto,
    );

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new RuralOrHybridRetirementRejectionInssBenefitEntity({
                inssBenefit: value,
                ruralOrHybridRetirementRejectionId:
                  ruralOrHybridRetirementRejection.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new RuralOrHybridRetirementRejectionLegalProceedingEntity({
                legalProceedingNumber: value,
                ruralOrHybridRetirementRejectionId:
                  ruralOrHybridRetirementRejection.id,
              }),
          )
        : [];

    await this.createOnDatabase(
      ruralOrHybridRetirementRejection,
      documentEntities,
      inssBenefitEntities,
      legalProceedingEntities,
    );

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.RURAL_OR_HYBRID_RETIREMENT_REJECTION,
      cnisFastAnalysis: null,
      ruralOrHybridRetirementRejection,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateRuralOrHybridRetirementRejectionResponseDto.build({
      ruralOrHybridRetirementRejectionId: ruralOrHybridRetirementRejection.id,
    });
  }

  private async createOnDatabase(
    ruralOrHybridRetirementRejection: RuralOrHybridRetirementRejectionEntity,
    documentEntities: RuralOrHybridRetirementRejectionDocumentEntity[],
    inssBenefitEntities: RuralOrHybridRetirementRejectionInssBenefitEntity[],
    legalProceedingEntities: RuralOrHybridRetirementRejectionLegalProceedingEntity[],
  ): Promise<void> {
    const rejectionTransaction =
      this.ruralOrHybridRetirementRejectionCommandRepositoryGateway.createRuralOrHybridRetirementRejection(
        ruralOrHybridRetirementRejection,
      );

    const documentTransactions = documentEntities.map((value) =>
      this.ruralOrHybridRetirementRejectionDocumentCommandRepositoryGateway.createRuralOrHybridRetirementRejectionDocument(
        value,
      ),
    );

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.ruralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway.createRuralOrHybridRetirementRejectionInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.ruralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway.createRuralOrHybridRetirementRejectionLegalProceeding(
        value,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      rejectionTransaction,
      ...documentTransactions,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ]);

    await transaction.commit();
  }

  private async createAnalysisToolRecordOnDatabase(
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }

  private async buildDocumentEntities(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionEntity['id'],
    dto: CreateRuralOrHybridRetirementRejectionRequestDto,
  ): Promise<RuralOrHybridRetirementRejectionDocumentEntity[]> {
    if (!dto.documents || dto.documents.length === 0) {
      return [];
    }

    return Promise.all(
      dto.documents.map(async (documentDto) => {
        const buffer = documentDto.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: documentDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return new RuralOrHybridRetirementRejectionDocumentEntity({
          id: new RuralOrHybridRetirementRejectionDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          ruralOrHybridRetirementRejectionId,
        });
      }),
    );
  }
}
