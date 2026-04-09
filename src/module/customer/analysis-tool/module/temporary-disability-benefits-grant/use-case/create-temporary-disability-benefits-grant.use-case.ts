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
import { TemporaryDisabilityBenefitsGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/command/temporary-disability-benefits-grant.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-document/command/temporary-disability-benefits-grant-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-inss-benefit/command/temporary-disability-benefits-grant-inss-benefit.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-legal-proceeding/command/temporary-disability-benefits-grant-legal-proceeding.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import { TemporaryDisabilityBenefitsGrantDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity';
import { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';
import { TemporaryDisabilityBenefitsGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit.entity';
import { TemporaryDisabilityBenefitsGrantInssBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/value-object/temporary-disability-benefits-grant-inss-benefit-id.value-object';
import { TemporaryDisabilityBenefitsGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding.entity';
import { TemporaryDisabilityBenefitsGrantLegalProceedingId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/value-object/temporary-disability-benefits-grant-legal-proceeding-id.value-object';
import { CreateTemporaryDisabilityBenefitsGrantRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant.request.dto';
import { CreateTemporaryDisabilityBenefitsGrantResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/create-temporary-disability-benefits-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateTemporaryDisabilityBenefitsGrantUseCase {
  protected readonly _type = CreateTemporaryDisabilityBenefitsGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantCommandRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantInssBenefitCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantInssBenefitCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantInssBenefitCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsGrantLegalProceedingCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsGrantLegalProceedingCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantLegalProceedingCommandRepositoryGateway,
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
    dto: CreateTemporaryDisabilityBenefitsGrantRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsGrantResponseDto> {
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

    const temporaryDisabilityBenefitsGrant =
      new TemporaryDisabilityBenefitsGrantEntity({
        category: dto.category,
        analysisName: dto.analysisName ?? null,
      });

    const documentEntities = await this.buildDocumentEntities(
      temporaryDisabilityBenefitsGrant.id,
      dto,
    );

    const inssBenefitEntities = this.buildInssBenefitEntities(
      temporaryDisabilityBenefitsGrant.id,
      dto,
    );

    const legalProceedingEntities = this.buildLegalProceedingEntities(
      temporaryDisabilityBenefitsGrant.id,
      dto,
    );

    await this.persistGrantAndDocuments(
      temporaryDisabilityBenefitsGrant,
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
      type: AnalysisToolRecordTypeEnum.TEMPORARY_DISABILITY_BENEFITS_GRANT,
      cnisFastAnalysis: null,
      temporaryDisabilityBenefitsGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.persistAnalysisToolRecord(analysisToolRecord);

    return CreateTemporaryDisabilityBenefitsGrantResponseDto.build({
      temporaryDisabilityBenefitsGrantId: temporaryDisabilityBenefitsGrant.id,
    });
  }

  private async persistGrantAndDocuments(
    grant: TemporaryDisabilityBenefitsGrantEntity,
    documentEntities: TemporaryDisabilityBenefitsGrantDocumentEntity[],
    inssBenefitEntities: TemporaryDisabilityBenefitsGrantInssBenefitEntity[],
    legalProceedingEntities: TemporaryDisabilityBenefitsGrantLegalProceedingEntity[],
  ): Promise<void> {
    const grantTransaction =
      this.temporaryDisabilityBenefitsGrantCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrant(
        grant,
      );

    const documentTransactions = documentEntities.map((doc) =>
      this.temporaryDisabilityBenefitsGrantDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantDocument(
        doc,
      ),
    );

    const inssBenefitTransactions = inssBenefitEntities.map((entity) =>
      this.temporaryDisabilityBenefitsGrantInssBenefitCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantInssBenefit(
        entity,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((entity) =>
      this.temporaryDisabilityBenefitsGrantLegalProceedingCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantLegalProceeding(
        entity,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      grantTransaction,
      ...documentTransactions,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ]);

    await transaction.commit();
  }

  private async persistAnalysisToolRecord(
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

  private buildInssBenefitEntities(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantEntity['id'],
    dto: CreateTemporaryDisabilityBenefitsGrantRequestDto,
  ): TemporaryDisabilityBenefitsGrantInssBenefitEntity[] {
    if (!dto.inssBenefits || dto.inssBenefits.length === 0) {
      return [];
    }

    return dto.inssBenefits.map(
      (inssBenefit) =>
        new TemporaryDisabilityBenefitsGrantInssBenefitEntity({
          id: new TemporaryDisabilityBenefitsGrantInssBenefitId(),
          inssBenefit,
          temporaryDisabilityBenefitsGrantId,
        }),
    );
  }

  private buildLegalProceedingEntities(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantEntity['id'],
    dto: CreateTemporaryDisabilityBenefitsGrantRequestDto,
  ): TemporaryDisabilityBenefitsGrantLegalProceedingEntity[] {
    if (!dto.legalProceeding || dto.legalProceeding.length === 0) {
      return [];
    }

    return dto.legalProceeding.map(
      (legalProceedingNumber) =>
        new TemporaryDisabilityBenefitsGrantLegalProceedingEntity({
          id: new TemporaryDisabilityBenefitsGrantLegalProceedingId(),
          legalProceedingNumber,
          temporaryDisabilityBenefitsGrantId,
        }),
    );
  }

  private async buildDocumentEntities(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantEntity['id'],
    dto: CreateTemporaryDisabilityBenefitsGrantRequestDto,
  ): Promise<TemporaryDisabilityBenefitsGrantDocumentEntity[]> {
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

        const fileName = await this.fileProcessorGateway.uploadFile(fileModel);

        return new TemporaryDisabilityBenefitsGrantDocumentEntity({
          id: new TemporaryDisabilityBenefitsGrantDocumentId(),
          fileName,
          type: documentDto.type,
          temporaryDisabilityBenefitsGrantId,
        });
      }),
    );
  }
}
