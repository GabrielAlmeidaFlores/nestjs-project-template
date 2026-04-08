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
import { DeathBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/command/death-benefit.command.repository.gateway';
import { DeathBenefitDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-document/command/death-benefit-document.command.repository.gateway';
import { DeathBenefitInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-inss-benefit/command/death-benefit-inss-benefit.command.repository.gateway';
import { DeathBenefitLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-legal-proceeding/command/death-benefit-legal-proceeding.command.repository.gateway';
import { DeathBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/death-benefit.entity';
import { DeathBenefitDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity';
import { DeathBenefitDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/value-object/death-benefit-document-id.value-object';
import { DeathBenefitInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/death-benefit-inss-benefit.entity';
import { DeathBenefitLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/death-benefit-legal-proceeding.entity';
import { CreateDeathBenefitRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit.request.dto';
import { CreateDeathBenefitResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDeathBenefitUseCase {
  protected readonly _type = CreateDeathBenefitUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(DeathBenefitCommandRepositoryGateway)
    private readonly deathBenefitCommandRepositoryGateway: DeathBenefitCommandRepositoryGateway,
    @Inject(DeathBenefitDocumentCommandRepositoryGateway)
    private readonly deathBenefitDocumentCommandRepositoryGateway: DeathBenefitDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitInssBenefitCommandRepositoryGateway)
    private readonly deathBenefitInssBenefitCommandRepositoryGateway: DeathBenefitInssBenefitCommandRepositoryGateway,
    @Inject(DeathBenefitLegalProceedingCommandRepositoryGateway)
    private readonly deathBenefitLegalProceedingCommandRepositoryGateway: DeathBenefitLegalProceedingCommandRepositoryGateway,
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
    dto: CreateDeathBenefitRequestDto,
  ): Promise<CreateDeathBenefitResponseDto> {
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

    const deathBenefit = new DeathBenefitEntity({
      analysisName: dto.analysisName ?? null,
    });

    const documentEntities = await this.buildDocumentEntities(
      deathBenefit.id,
      dto,
    );

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new DeathBenefitInssBenefitEntity({
                inssBenefit: value,
                deathBenefitId: deathBenefit.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new DeathBenefitLegalProceedingEntity({
                legalProceedingNumber: value,
                deathBenefitId: deathBenefit.id,
              }),
          )
        : [];

    await this.createOnDatabase(
      deathBenefit,
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
      deathBenefit,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateDeathBenefitResponseDto.build({
      deathBenefitId: deathBenefit.id,
    });
  }

  private async createOnDatabase(
    deathBenefit: DeathBenefitEntity,
    documentEntities: DeathBenefitDocumentEntity[],
    inssBenefitEntities: DeathBenefitInssBenefitEntity[],
    legalProceedingEntities: DeathBenefitLegalProceedingEntity[],
  ): Promise<void> {
    const deathBenefitTransaction =
      this.deathBenefitCommandRepositoryGateway.createDeathBenefit(
        deathBenefit,
      );

    const documentTransactions = documentEntities.map((value) =>
      this.deathBenefitDocumentCommandRepositoryGateway.createDeathBenefitDocument(
        value,
      ),
    );

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.deathBenefitInssBenefitCommandRepositoryGateway.createDeathBenefitInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.deathBenefitLegalProceedingCommandRepositoryGateway.createDeathBenefitLegalProceeding(
        value,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deathBenefitTransaction,
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
    deathBenefitId: DeathBenefitEntity['id'],
    dto: CreateDeathBenefitRequestDto,
  ): Promise<DeathBenefitDocumentEntity[]> {
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

        return new DeathBenefitDocumentEntity({
          id: new DeathBenefitDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          deathBenefitId,
        });
      }),
    );
  }
}
