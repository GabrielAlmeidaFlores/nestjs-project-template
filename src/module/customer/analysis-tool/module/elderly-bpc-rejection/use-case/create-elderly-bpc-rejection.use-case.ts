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
import { ElderlyBpcRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/command/elderly-bpc-rejection.command.repository.gateway';
import { ElderlyBpcRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-document/command/elderly-bpc-rejection-document.command.repository.gateway';
import { ElderlyBpcRejectionFamiliarGroupCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-familiar-group/command/elderly-bpc-rejection-familiar-group.command.repository.gateway';
import { ElderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-familiar-group-document/command/elderly-bpc-rejection-familiar-group-document.command.repository.gateway';
import { ElderlyBpcRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-inss-benefit/command/elderly-bpc-rejection-inss-benefit.command.repository.gateway';
import { ElderlyBpcRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-legal-proceeding/command/elderly-bpc-rejection-legal-proceeding.command.repository.gateway';
import { ElderlyBpcRejectionEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity';
import { ElderlyBpcRejectionDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/elderly-bpc-rejection-document.entity';
import { ElderlyBpcRejectionFamiliarGroupEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/elderly-bpc-rejection-familiar-group.entity';
import { ElderlyBpcRejectionFamiliarGroupDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/elderly-bpc-rejection-familiar-group-document.entity';
import { ElderlyBpcRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/elderly-bpc-rejection-inss-benefit.entity';
import { ElderlyBpcRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/elderly-bpc-rejection-legal-proceeding.entity';
import { CreateElderlyBpcRejectionRequestDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/request/create-elderly-bpc-rejection.request.dto';
import { CreateElderlyBpcRejectionResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/create-elderly-bpc-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';
import type { CreateElderlyBpcRejectionFamiliarGroupRequestDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/request/create-elderly-bpc-rejection.request.dto';

@Injectable()
export class CreateElderlyBpcRejectionUseCase {
  protected readonly _type = CreateElderlyBpcRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ElderlyBpcRejectionCommandRepositoryGateway)
    private readonly elderlyBpcRejectionCommandRepositoryGateway: ElderlyBpcRejectionCommandRepositoryGateway,
    @Inject(ElderlyBpcRejectionDocumentCommandRepositoryGateway)
    private readonly elderlyBpcRejectionDocumentCommandRepositoryGateway: ElderlyBpcRejectionDocumentCommandRepositoryGateway,
    @Inject(ElderlyBpcRejectionInssBenefitCommandRepositoryGateway)
    private readonly elderlyBpcRejectionInssBenefitCommandRepositoryGateway: ElderlyBpcRejectionInssBenefitCommandRepositoryGateway,
    @Inject(ElderlyBpcRejectionLegalProceedingCommandRepositoryGateway)
    private readonly elderlyBpcRejectionLegalProceedingCommandRepositoryGateway: ElderlyBpcRejectionLegalProceedingCommandRepositoryGateway,
    @Inject(ElderlyBpcRejectionFamiliarGroupCommandRepositoryGateway)
    private readonly elderlyBpcRejectionFamiliarGroupCommandRepositoryGateway: ElderlyBpcRejectionFamiliarGroupCommandRepositoryGateway,
    @Inject(ElderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway)
    private readonly elderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway: ElderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway,
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
    dto: CreateElderlyBpcRejectionRequestDto,
  ): Promise<CreateElderlyBpcRejectionResponseDto> {
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

    const elderlyBpcRejection = new ElderlyBpcRejectionEntity({
      analysisName: dto.analysisName ?? null,
      category: dto.category ?? null,
      maritalStatus: dto.maritalStatus ?? null,
      applicantLivesAlone: dto.applicantLivesAlone ?? null,
    });

    const documentEntities = await this.buildDocumentEntities(
      elderlyBpcRejection.id,
      dto,
    );

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new ElderlyBpcRejectionInssBenefitEntity({
                inssBenefit: value,
                elderlyBpcRejectionId: elderlyBpcRejection.id,
              }),
          )
        : [];

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new ElderlyBpcRejectionLegalProceedingEntity({
                legalProceedingNumber: value,
                elderlyBpcRejectionId: elderlyBpcRejection.id,
              }),
          )
        : [];

    const familiarGroupEntities = await this.buildFamiliarGroupEntities(
      elderlyBpcRejection.id,
      dto,
    );

    await this.createOnDatabase(
      elderlyBpcRejection,
      documentEntities,
      inssBenefitEntities,
      legalProceedingEntities,
      familiarGroupEntities.groups,
      familiarGroupEntities.documents,
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
      type: AnalysisToolRecordTypeEnum.ELDERLY_BPC_REJECTION,
      cnisFastAnalysis: null,
      elderlyBpcRejection,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateElderlyBpcRejectionResponseDto.build({
      elderlyBpcRejectionId: elderlyBpcRejection.id,
    });
  }

  private async buildDocumentEntities(
    elderlyBpcRejectionId: ElderlyBpcRejectionEntity['id'],
    dto: CreateElderlyBpcRejectionRequestDto,
  ): Promise<ElderlyBpcRejectionDocumentEntity[]> {
    if (dto.documents === undefined || dto.documents.length === 0) {
      return [];
    }

    return Promise.all(
      dto.documents.map(async (docDto) => {
        const buffer = docDto.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: docDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const fileName = await this.fileProcessorGateway.uploadFile(fileModel);

        return new ElderlyBpcRejectionDocumentEntity({
          document: fileName,
          type: docDto.type,
          elderlyBpcRejectionId,
        });
      }),
    );
  }

  private async buildFamiliarGroupEntities(
    elderlyBpcRejectionId: ElderlyBpcRejectionEntity['id'],
    dto: CreateElderlyBpcRejectionRequestDto,
  ): Promise<{
    groups: ElderlyBpcRejectionFamiliarGroupEntity[];
    documents: ElderlyBpcRejectionFamiliarGroupDocumentEntity[];
  }> {
    if (dto.familiarGroups === undefined || dto.familiarGroups.length === 0) {
      return { groups: [], documents: [] };
    }

    const groups: ElderlyBpcRejectionFamiliarGroupEntity[] = [];
    const documents: ElderlyBpcRejectionFamiliarGroupDocumentEntity[] = [];

    for (const groupDto of dto.familiarGroups) {
      const group = new ElderlyBpcRejectionFamiliarGroupEntity({
        fullName: groupDto.fullName ?? null,
        birthDate: groupDto.birthDate ?? null,
        kinship: groupDto.kinship ?? null,
        livesInSameResidence: groupDto.livesInSameResidence ?? null,
        hasIncome: groupDto.hasIncome ?? null,
        monthlyIncome: groupDto.monthlyIncome ?? null,
        incomeType: groupDto.incomeType ?? null,
        hasSupportingDocuments: groupDto.hasSupportingDocuments ?? null,
        elderlyBpcRejectionId,
      });

      groups.push(group);

      const groupDocuments = await this.buildFamiliarGroupDocumentEntities(
        group.id,
        groupDto,
      );

      documents.push(...groupDocuments);
    }

    return { groups, documents };
  }

  private async buildFamiliarGroupDocumentEntities(
    elderlyBpcRejectionFamiliarGroupId: ElderlyBpcRejectionFamiliarGroupId,
    groupDto: CreateElderlyBpcRejectionFamiliarGroupRequestDto,
  ): Promise<ElderlyBpcRejectionFamiliarGroupDocumentEntity[]> {
    if (groupDto.documents === undefined || groupDto.documents.length === 0) {
      return [];
    }

    return Promise.all(
      groupDto.documents.map(async (docDto) => {
        const buffer = docDto.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: docDto.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const fileName = await this.fileProcessorGateway.uploadFile(fileModel);

        return new ElderlyBpcRejectionFamiliarGroupDocumentEntity({
          document: fileName,
          type: docDto.type,
          elderlyBpcRejectionFamiliarGroupId,
        });
      }),
    );
  }

  private async createOnDatabase(
    elderlyBpcRejection: ElderlyBpcRejectionEntity,
    documentEntities: ElderlyBpcRejectionDocumentEntity[],
    inssBenefitEntities: ElderlyBpcRejectionInssBenefitEntity[],
    legalProceedingEntities: ElderlyBpcRejectionLegalProceedingEntity[],
    familiarGroupEntities: ElderlyBpcRejectionFamiliarGroupEntity[],
    familiarGroupDocumentEntities: ElderlyBpcRejectionFamiliarGroupDocumentEntity[],
  ): Promise<void> {
    const rejectionTransaction =
      this.elderlyBpcRejectionCommandRepositoryGateway.createElderlyBpcRejection(
        elderlyBpcRejection,
      );

    const documentTransactions = documentEntities.map((value) =>
      this.elderlyBpcRejectionDocumentCommandRepositoryGateway.createElderlyBpcRejectionDocument(
        value,
      ),
    );

    const inssBenefitTransactions = inssBenefitEntities.map((value) =>
      this.elderlyBpcRejectionInssBenefitCommandRepositoryGateway.createElderlyBpcRejectionInssBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedingEntities.map((value) =>
      this.elderlyBpcRejectionLegalProceedingCommandRepositoryGateway.createElderlyBpcRejectionLegalProceeding(
        value,
      ),
    );

    const familiarGroupTransactions = familiarGroupEntities.map((value) =>
      this.elderlyBpcRejectionFamiliarGroupCommandRepositoryGateway.createElderlyBpcRejectionFamiliarGroup(
        value,
      ),
    );

    const familiarGroupDocumentTransactions = familiarGroupDocumentEntities.map(
      (value) =>
        this.elderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway.createElderlyBpcRejectionFamiliarGroupDocument(
          value,
        ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      rejectionTransaction,
      ...documentTransactions,
      ...inssBenefitTransactions,
      ...legalProceedingTransactions,
      ...familiarGroupTransactions,
      ...familiarGroupDocumentTransactions,
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
}
