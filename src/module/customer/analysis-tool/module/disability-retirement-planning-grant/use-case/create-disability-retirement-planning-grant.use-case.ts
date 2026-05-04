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
import { DisabilityRetirementPlanningGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/command/disability-retirement-planning-grant.command.repository.gateway';
import { DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-document/command/disability-retirement-planning-grant-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-inss-benefit/command/disability-retirement-planning-grant-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-legal-proceeding/command/disability-retirement-planning-grant-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import { DisabilityRetirementPlanningGrantDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity';
import { DisabilityRetirementPlanningGrantDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/value-object/disability-retirement-planning-grant-document-id.value-object';
import { DisabilityRetirementPlanningGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity';
import { CreateDisabilityRetirementPlanningGrantRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant.request.dto';
import { CreateDisabilityRetirementPlanningGrantResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDisabilityRetirementPlanningGrantUseCase {
  protected readonly _type =
    CreateDisabilityRetirementPlanningGrantUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantCommandRepositoryGateway: DisabilityRetirementPlanningGrantCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantDocumentCommandRepositoryGateway: DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway: DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway: DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway,
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
    dto: CreateDisabilityRetirementPlanningGrantRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningGrantResponseDto> {
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

    const disabilityRetirementPlanningGrant =
      new DisabilityRetirementPlanningGrantEntity({
        category: dto.category,
        analysisName: dto.analysisName ?? null,
        longPrizeDisability: dto.longPrizeDisability,
      });

    const documentEntities = await this.buildDocumentEntities(
      disabilityRetirementPlanningGrant.id,
      dto,
    );

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new DisabilityRetirementPlanningGrantInssBenefitEntity({
                inssBenefit: value,
                disabilityRetirementPlanningGrantId:
                  disabilityRetirementPlanningGrant.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new DisabilityRetirementPlanningGrantLegalProceedingEntity({
                legalProceedingNumber: value,
                disabilityRetirementPlanningGrantId:
                  disabilityRetirementPlanningGrant.id,
              }),
          )
        : [];

    await this.createOnDatabase(
      disabilityRetirementPlanningGrant,
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
      type: AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING_GRANT,
      cnisFastAnalysis: null,
      disabilityRetirementPlanningGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateDisabilityRetirementPlanningGrantResponseDto.build({
      disabilityRetirementPlanningGrantId: disabilityRetirementPlanningGrant.id,
      analysisCode: analysisToolRecord.code.toString(),
    });
  }

  private async createOnDatabase(
    disabilityRetirementPlanningGrant: DisabilityRetirementPlanningGrantEntity,
    documentEntities: DisabilityRetirementPlanningGrantDocumentEntity[],
    inssBenefitEntities: DisabilityRetirementPlanningGrantInssBenefitEntity[],
    legalProceedingEntities: DisabilityRetirementPlanningGrantLegalProceedingEntity[],
  ): Promise<void> {
    const grantTransaction =
      this.disabilityRetirementPlanningGrantCommandRepositoryGateway.createDisabilityRetirementPlanningGrant(
        disabilityRetirementPlanningGrant,
      );

    const documentTransactions = documentEntities.map((value) =>
      this.disabilityRetirementPlanningGrantDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningGrantDocument(
        value,
      ),
    );

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.disabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway.createDisabilityRetirementPlanningGrantInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.disabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway.createDisabilityRetirementPlanningGrantLegalProceeding(
        value,
      ),
    );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      grantTransaction,
      ...documentTransactions,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
    ]);

    await transactions.commit();
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
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantEntity['id'],
    dto: CreateDisabilityRetirementPlanningGrantRequestDto,
  ): Promise<DisabilityRetirementPlanningGrantDocumentEntity[]> {
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

        return new DisabilityRetirementPlanningGrantDocumentEntity({
          id: new DisabilityRetirementPlanningGrantDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          disabilityRetirementPlanningGrantId,
        });
      }),
    );
  }
}
