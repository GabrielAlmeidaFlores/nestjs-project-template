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
import { DeathBenefitGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/command/death-benefit-grant.command.repository.gateway';
import { DeathBenefitGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-document/command/death-benefit-grant-document.command.repository.gateway';
import { DeathBenefitGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-inss-benefit/command/death-benefit-grant-inss-benefit.command.repository.gateway';
import { DeathBenefitGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-proceeding/command/death-benefit-grant-legal-proceeding.command.repository.gateway';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import { DeathBenefitGrantDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/value-object/death-benefit-grant-document-id.value-object';
import { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';
import { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';
import { CreateDeathBenefitGrantRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant.request.dto';
import { CreateDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDeathBenefitGrantUseCase {
  protected readonly _type = CreateDeathBenefitGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(DeathBenefitGrantCommandRepositoryGateway)
    private readonly deathBenefitGrantCommandRepositoryGateway: DeathBenefitGrantCommandRepositoryGateway,
    @Inject(DeathBenefitGrantDocumentCommandRepositoryGateway)
    private readonly deathBenefitGrantDocumentCommandRepositoryGateway: DeathBenefitGrantDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitGrantInssBenefitCommandRepositoryGateway)
    private readonly deathBenefitGrantInssBenefitCommandRepositoryGateway: DeathBenefitGrantInssBenefitCommandRepositoryGateway,
    @Inject(DeathBenefitGrantLegalProceedingCommandRepositoryGateway)
    private readonly deathBenefitGrantLegalProceedingCommandRepositoryGateway: DeathBenefitGrantLegalProceedingCommandRepositoryGateway,
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
    dto: CreateDeathBenefitGrantRequestDto,
  ): Promise<CreateDeathBenefitGrantResponseDto> {
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

    const deathBenefitGrant = new DeathBenefitGrantEntity({
      analysisName: dto.analysisName ?? null,
    });

    const documentEntities = await this.buildDocumentEntities(
      deathBenefitGrant.id,
      dto,
    );

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new DeathBenefitGrantInssBenefitEntity({
                inssBenefit: value,
                deathBenefitGrantId: deathBenefitGrant.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new DeathBenefitGrantLegalProceedingEntity({
                legalProceedingNumber: value,
                deathBenefitGrantId: deathBenefitGrant.id,
              }),
          )
        : [];

    await this.createOnDatabase(
      deathBenefitGrant,
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
      type: AnalysisToolRecordTypeEnum.DEATH_BENEFIT,
      cnisFastAnalysis: null,
      deathBenefitGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateDeathBenefitGrantResponseDto.build({
      deathBenefitGrantId: deathBenefitGrant.id,
    });
  }

  private async createOnDatabase(
    deathBenefitGrant: DeathBenefitGrantEntity,
    documentEntities: DeathBenefitGrantDocumentEntity[],
    inssBenefitEntities: DeathBenefitGrantInssBenefitEntity[],
    legalProceedingEntities: DeathBenefitGrantLegalProceedingEntity[],
  ): Promise<void> {
    const deathBenefitGrantTransaction =
      this.deathBenefitGrantCommandRepositoryGateway.createDeathBenefitGrant(
        deathBenefitGrant,
      );

    const documentTransactions = documentEntities.map((value) =>
      this.deathBenefitGrantDocumentCommandRepositoryGateway.createDeathBenefitGrantDocument(
        value,
      ),
    );

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.deathBenefitGrantInssBenefitCommandRepositoryGateway.createDeathBenefitGrantInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.deathBenefitGrantLegalProceedingCommandRepositoryGateway.createDeathBenefitGrantLegalProceeding(
        value,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deathBenefitGrantTransaction,
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
    deathBenefitGrantId: DeathBenefitGrantEntity['id'],
    dto: CreateDeathBenefitGrantRequestDto,
  ): Promise<DeathBenefitGrantDocumentEntity[]> {
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

        return new DeathBenefitGrantDocumentEntity({
          id: new DeathBenefitGrantDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          deathBenefitGrantId,
        });
      }),
    );
  }
}
