import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { ElderlyBpcRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/command/elderly-bpc-rejection.command.repository.gateway';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-document/command/elderly-bpc-rejection-document.command.repository.gateway';
import { ElderlyBpcRejectionFamiliarGroupCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-familiar-group/command/elderly-bpc-rejection-familiar-group.command.repository.gateway';
import { ElderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-familiar-group-document/command/elderly-bpc-rejection-familiar-group-document.command.repository.gateway';
import { ElderlyBpcRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-inss-benefit/command/elderly-bpc-rejection-inss-benefit.command.repository.gateway';
import { ElderlyBpcRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-legal-proceeding/command/elderly-bpc-rejection-legal-proceeding.command.repository.gateway';
import { ElderlyBpcRejectionEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/elderly-bpc-rejection-document.entity';
import { ElderlyBpcRejectionFamiliarGroupEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/elderly-bpc-rejection-familiar-group.entity';
import { ElderlyBpcRejectionFamiliarGroupDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/elderly-bpc-rejection-familiar-group-document.entity';
import { ElderlyBpcRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/elderly-bpc-rejection-inss-benefit.entity';
import { ElderlyBpcRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/elderly-bpc-rejection-legal-proceeding.entity';
import {
  UpdateElderlyBpcRejectionFamiliarGroupRequestDto,
  UpdateElderlyBpcRejectionRequestDto,
} from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/request/update-elderly-bpc-rejection.request.dto';
import { UpdateElderlyBpcRejectionResponseDto } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/update-elderly-bpc-rejection.response.dto';
import { ElderlyBpcRejectionNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';

@Injectable()
export class UpdateElderlyBpcRejectionUseCase {
  protected readonly _type = UpdateElderlyBpcRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionQueryRepositoryGateway)
    private readonly elderlyBpcRejectionQueryRepositoryGateway: ElderlyBpcRejectionQueryRepositoryGateway,
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
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    dto: UpdateElderlyBpcRejectionRequestDto,
  ): Promise<UpdateElderlyBpcRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations(
        elderlyBpcRejectionId,
        ElderlyBpcRejectionNotFoundError,
      );

    const updated = new ElderlyBpcRejectionEntity({
      id: elderlyBpcRejectionId,
      analysisName: dto.analysisName ?? existing.analysisName,
      category: dto.category ?? existing.category,
      maritalStatus: dto.maritalStatus ?? existing.maritalStatus,
      applicantLivesAlone:
        dto.applicantLivesAlone ?? existing.applicantLivesAlone,
      elderlyBpcRejectionResultId:
        existing.elderlyBpcRejectionResult?.id ?? null,
    });

    const documentEntities =
      dto.documents !== undefined
        ? await this.buildDocumentEntities(elderlyBpcRejectionId, dto)
        : null;

    const inssBenefitEntities =
      dto.inssBenefitNumber !== undefined
        ? dto.inssBenefitNumber.map(
            (value) =>
              new ElderlyBpcRejectionInssBenefitEntity({
                inssBenefit: value,
                elderlyBpcRejectionId,
              }),
          )
        : null;

    const legalProceedingEntities =
      dto.legalProceedingNumber !== undefined
        ? dto.legalProceedingNumber.map(
            (value) =>
              new ElderlyBpcRejectionLegalProceedingEntity({
                legalProceedingNumber: value,
                elderlyBpcRejectionId,
              }),
          )
        : null;

    const familiarGroupEntities =
      dto.familiarGroups !== undefined
        ? await this.buildFamiliarGroupEntities(elderlyBpcRejectionId, dto)
        : null;

    const transactionOperations: TransactionType[] = [
      this.elderlyBpcRejectionCommandRepositoryGateway.updateElderlyBpcRejection(
        elderlyBpcRejectionId,
        updated,
      ),
    ];

    if (documentEntities !== null) {
      transactionOperations.push(
        this.elderlyBpcRejectionDocumentCommandRepositoryGateway.deleteElderlyBpcRejectionDocumentsByElderlyBpcRejectionId(
          elderlyBpcRejectionId,
        ),
        ...documentEntities.map((value) =>
          this.elderlyBpcRejectionDocumentCommandRepositoryGateway.createElderlyBpcRejectionDocument(
            value,
          ),
        ),
      );
    }

    if (inssBenefitEntities !== null) {
      transactionOperations.push(
        this.elderlyBpcRejectionInssBenefitCommandRepositoryGateway.deleteElderlyBpcRejectionInssBenefitsByElderlyBpcRejectionId(
          elderlyBpcRejectionId,
        ),
        ...inssBenefitEntities.map((value) =>
          this.elderlyBpcRejectionInssBenefitCommandRepositoryGateway.createElderlyBpcRejectionInssBenefit(
            value,
          ),
        ),
      );
    }

    if (legalProceedingEntities !== null) {
      transactionOperations.push(
        this.elderlyBpcRejectionLegalProceedingCommandRepositoryGateway.deleteElderlyBpcRejectionLegalProceedingsByElderlyBpcRejectionId(
          elderlyBpcRejectionId,
        ),
        ...legalProceedingEntities.map((value) =>
          this.elderlyBpcRejectionLegalProceedingCommandRepositoryGateway.createElderlyBpcRejectionLegalProceeding(
            value,
          ),
        ),
      );
    }

    if (familiarGroupEntities !== null) {
      const deleteFamiliarGroupDocumentTransactions = (
        existing.elderlyBpcRejectionFamiliarGroup ?? []
      ).map((value) =>
        this.elderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway.deleteElderlyBpcRejectionFamiliarGroupDocumentsByFamiliarGroupId(
          value.id,
        ),
      );

      transactionOperations.push(
        ...deleteFamiliarGroupDocumentTransactions,
        this.elderlyBpcRejectionFamiliarGroupCommandRepositoryGateway.deleteElderlyBpcRejectionFamiliarGroupsByElderlyBpcRejectionId(
          elderlyBpcRejectionId,
        ),
        ...familiarGroupEntities.groups.map((value) =>
          this.elderlyBpcRejectionFamiliarGroupCommandRepositoryGateway.createElderlyBpcRejectionFamiliarGroup(
            value,
          ),
        ),
        ...familiarGroupEntities.documents.map((value) =>
          this.elderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway.createElderlyBpcRejectionFamiliarGroupDocument(
            value,
          ),
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateElderlyBpcRejectionResponseDto.build({
      elderlyBpcRejectionId,
    });
  }

  private async buildDocumentEntities(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    dto: UpdateElderlyBpcRejectionRequestDto,
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
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    dto: UpdateElderlyBpcRejectionRequestDto,
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
    groupDto: UpdateElderlyBpcRejectionFamiliarGroupRequestDto,
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
}
