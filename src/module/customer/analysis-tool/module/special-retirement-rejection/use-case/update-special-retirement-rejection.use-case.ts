import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/command/special-retirement-rejection.command.repository.gateway';
import { SpecialRetirementRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-document/command/special-retirement-rejection-document.command.repository.gateway';
import { SpecialRetirementRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-inss-benefit/command/special-retirement-rejection-inss-benefit.command.repository.gateway';
import { SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-legal-proceeding/command/special-retirement-rejection-legal-proceeding.command.repository.gateway';
import { SpecialRetirementRejectionEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/special-retirement-rejection-document.entity';
import { SpecialRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.entity';
import { SpecialRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.entity';
import { UpdateSpecialRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/update-special-retirement-rejection.request.dto';
import { UpdateSpecialRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/update-special-retirement-rejection.response.dto';
import { SpecialRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';

@Injectable()
export class UpdateSpecialRetirementRejectionUseCase {
  protected readonly _type = UpdateSpecialRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionCommandRepositoryGateway)
    private readonly specialRetirementRejectionCommandRepositoryGateway: SpecialRetirementRejectionCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionInssBenefitCommandRepositoryGateway)
    private readonly specialRetirementRejectionInssBenefitCommandRepositoryGateway: SpecialRetirementRejectionInssBenefitCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway)
    private readonly specialRetirementRejectionLegalProceedingCommandRepositoryGateway: SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionDocumentCommandRepositoryGateway)
    private readonly specialRetirementRejectionDocumentCommandRepositoryGateway: SpecialRetirementRejectionDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    dto: UpdateSpecialRetirementRejectionRequestDto,
  ): Promise<UpdateSpecialRetirementRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementRejectionNotFoundError,
      );

    const currentSpecialRetirementRejection =
      analysisToolRecordQueryResult.specialRetirementRejection;

    if (currentSpecialRetirementRejection === null) {
      throw new SpecialRetirementRejectionNotFoundError();
    }

    const specialRetirementRejection = new SpecialRetirementRejectionEntity({
      id: currentSpecialRetirementRejection.specialRetirementRejectionId,
      analysisName:
        dto.analysisName ?? currentSpecialRetirementRejection.analysisName,
      category: dto.category ?? currentSpecialRetirementRejection.category,
      requirementStartDate:
        dto.requirementStartDate ??
        currentSpecialRetirementRejection.requirementStartDate,
      rejectionDate:
        dto.rejectionDate ?? currentSpecialRetirementRejection.rejectionDate,
      harmfulAgents:
        dto.harmfulAgents ?? currentSpecialRetirementRejection.harmfulAgents,
      otherAgents:
        dto.otherAgents ?? currentSpecialRetirementRejection.otherAgents,
      rejectionReason:
        dto.rejectionReason ??
        currentSpecialRetirementRejection.rejectionReason,
      otherRejectionReason:
        dto.otherRejectionReason ??
        currentSpecialRetirementRejection.otherRejectionReason,
      specialRetirementRejectionResultId:
        currentSpecialRetirementRejection.specialRetirementRejectionResult
          ?.id ?? null,
      createdAt: currentSpecialRetirementRejection.createdAt,
      updatedAt: currentSpecialRetirementRejection.updatedAt,
      deletedAt: currentSpecialRetirementRejection.deletedAt,
    });

    const analysisToolRecord = this.buildAnalysisToolRecordEntity(
      analysisToolRecordQueryResult,
      specialRetirementRejection,
      organizationMember.id,
    );

    const transactions: TransactionType[] = [];

    if (dto.inssBenefitNumber !== undefined) {
      transactions.push(
        this.specialRetirementRejectionInssBenefitCommandRepositoryGateway.deleteAllSpecialRetirementRejectionInssBenefitBySpecialRetirementRejectionId(
          specialRetirementRejection.id,
        ),
        ...dto.inssBenefitNumber.map((benefitNumber) =>
          this.specialRetirementRejectionInssBenefitCommandRepositoryGateway.createSpecialRetirementRejectionInssBenefit(
            new SpecialRetirementRejectionInssBenefitEntity({
              benefitNumber,
              specialRetirementRejectionId: specialRetirementRejection.id,
            }),
          ),
        ),
      );
    }

    if (dto.legalProceedingNumber !== undefined) {
      transactions.push(
        this.specialRetirementRejectionLegalProceedingCommandRepositoryGateway.deleteAllSpecialRetirementRejectionLegalProceedingBySpecialRetirementRejectionId(
          specialRetirementRejection.id,
        ),
        ...dto.legalProceedingNumber.map((number) =>
          this.specialRetirementRejectionLegalProceedingCommandRepositoryGateway.createSpecialRetirementRejectionLegalProceeding(
            new SpecialRetirementRejectionLegalProceedingEntity({
              number,
              specialRetirementRejectionId: specialRetirementRejection.id,
            }),
          ),
        ),
      );
    }

    if (dto.documents !== undefined) {
      const documents = await this.buildDocumentEntities(
        dto.documents,
        specialRetirementRejection.id,
      );

      transactions.push(
        this.specialRetirementRejectionDocumentCommandRepositoryGateway.deleteAllSpecialRetirementRejectionDocumentBySpecialRetirementRejectionId(
          specialRetirementRejection.id,
        ),
        ...documents.map((document) =>
          this.specialRetirementRejectionDocumentCommandRepositoryGateway.createSpecialRetirementRejectionDocument(
            document,
          ),
        ),
      );
    }

    transactions.push(
      this.specialRetirementRejectionCommandRepositoryGateway.updateSpecialRetirementRejection(
        specialRetirementRejection.id,
        specialRetirementRejection,
      ),
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateSpecialRetirementRejectionResponseDto.build({
      specialRetirementRejectionId: specialRetirementRejection.id,
    });
  }

  private buildAnalysisToolClientEntity(
    analysisToolRecordQueryResult: GetAnalysisToolRecordWithRelationsQueryResult,
  ): AnalysisToolClientEntity {
    return new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });
  }

  private buildAnalysisToolRecordEntity(
    analysisToolRecordQueryResult: GetAnalysisToolRecordWithRelationsQueryResult,
    specialRetirementRejection: SpecialRetirementRejectionEntity,
    updatedBy: GetAnalysisToolRecordWithRelationsQueryResult['updatedBy']['id'],
  ): AnalysisToolRecordEntity {
    return new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      deletedAt: analysisToolRecordQueryResult.deletedAt,
      analysisToolClient: this.buildAnalysisToolClientEntity(
        analysisToolRecordQueryResult,
      ),
      specialRetirementRejection,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy,
    });
  }

  private async buildDocumentEntities(
    documents: NonNullable<
      UpdateSpecialRetirementRejectionRequestDto['documents']
    >,
    specialRetirementRejectionId: SpecialRetirementRejectionEntity['id'],
  ): Promise<SpecialRetirementRejectionDocumentEntity[]> {
    return await Promise.all(
      documents.map(async (documentDto) => {
        const buffer = documentDto.file.base64.decodeToBuffer();
        const fileModel = FileModel.build({
          buffer,
          originalName: documentDto.file.originalFileName,
          size: buffer.length,
          encoding: 'base64',
        });
        const fileName = await this.fileProcessorGateway.uploadFile(fileModel);

        return new SpecialRetirementRejectionDocumentEntity({
          fileName,
          type: documentDto.type,
          specialRetirementRejectionId,
        });
      }),
    );
  }
}
