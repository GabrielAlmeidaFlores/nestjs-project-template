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
import { SpecialRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/command/special-retirement-rejection.command.repository.gateway';
import { SpecialRetirementRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-document/command/special-retirement-rejection-document.command.repository.gateway';
import { SpecialRetirementRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-inss-benefit/command/special-retirement-rejection-inss-benefit.command.repository.gateway';
import { SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-legal-proceeding/command/special-retirement-rejection-legal-proceeding.command.repository.gateway';
import { SpecialRetirementRejectionEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity';
import { SpecialRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/special-retirement-rejection-document.entity';
import { SpecialRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.entity';
import { SpecialRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.entity';
import { CreateSpecialRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/request/create-special-retirement-rejection.request.dto';
import { CreateSpecialRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/special-retirement-rejection/dto/response/create-special-retirement-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateSpecialRetirementRejectionUseCase {
  protected readonly _type = CreateSpecialRetirementRejectionUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialRetirementRejectionCommandRepositoryGateway)
    private readonly specialRetirementRejectionCommandRepositoryGateway: SpecialRetirementRejectionCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(SpecialRetirementRejectionInssBenefitCommandRepositoryGateway)
    private readonly specialRetirementRejectionInssBenefitCommandRepositoryGateway: SpecialRetirementRejectionInssBenefitCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionDocumentCommandRepositoryGateway)
    private readonly specialRetirementRejectionDocumentCommandRepositoryGateway: SpecialRetirementRejectionDocumentCommandRepositoryGateway,
    @Inject(SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway)
    private readonly specialRetirementRejectionLegalProceedingCommandRepositoryGateway: SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateSpecialRetirementRejectionRequestDto,
  ): Promise<CreateSpecialRetirementRejectionResponseDto> {
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

    const specialRetirementRejection = new SpecialRetirementRejectionEntity({
      analysisName: dto.analysisName ?? null,
      category: dto.category ?? null,
      requirementStartDate: dto.requirementStartDate ?? null,
      rejectionDate: dto.rejectionDate ?? null,
      harmfulAgents: dto.harmfulAgents ?? null,
      otherAgents: dto.otherAgents ?? null,
      rejectionReason: dto.rejectionReason ?? null,
      otherRejectionReason: dto.otherRejectionReason ?? null,
    });

    const benefits = (dto.inssBenefitNumber ?? []).map(
      (benefitNumber) =>
        new SpecialRetirementRejectionInssBenefitEntity({
          benefitNumber,
          specialRetirementRejectionId: specialRetirementRejection.id,
        }),
    );

    const legalProceedings = (dto.legalProceedingNumber ?? []).map(
      (number) =>
        new SpecialRetirementRejectionLegalProceedingEntity({
          number,
          specialRetirementRejectionId: specialRetirementRejection.id,
        }),
    );

    const documents = await this.buildDocumentEntities(
      dto.documents ?? [],
      specialRetirementRejection.id,
    );

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.SPECIAL_RETIREMENT_REJECTION,
      specialRetirementRejection,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      specialRetirementRejection,
      benefits,
      legalProceedings,
      documents,
      analysisToolRecord,
    );

    return CreateSpecialRetirementRejectionResponseDto.build({
      specialRetirementRejectionId: specialRetirementRejection.id,
    });
  }

  private async buildDocumentEntities(
    documents: NonNullable<
      CreateSpecialRetirementRejectionRequestDto['documents']
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

  private async createOnDatabase(
    specialRetirementRejection: SpecialRetirementRejectionEntity,
    benefits: SpecialRetirementRejectionInssBenefitEntity[],
    legalProceedings: SpecialRetirementRejectionLegalProceedingEntity[],
    documents: SpecialRetirementRejectionDocumentEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const benefitTransactions = benefits.map((benefit) =>
      this.specialRetirementRejectionInssBenefitCommandRepositoryGateway.createSpecialRetirementRejectionInssBenefit(
        benefit,
      ),
    );

    const legalProceedingTransactions = legalProceedings.map(
      (legalProceeding) =>
        this.specialRetirementRejectionLegalProceedingCommandRepositoryGateway.createSpecialRetirementRejectionLegalProceeding(
          legalProceeding,
        ),
    );

    const documentTransactions = documents.map((document) =>
      this.specialRetirementRejectionDocumentCommandRepositoryGateway.createSpecialRetirementRejectionDocument(
        document,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.specialRetirementRejectionCommandRepositoryGateway.createSpecialRetirementRejection(
        specialRetirementRejection,
      ),
      ...benefitTransactions,
      ...legalProceedingTransactions,
      ...documentTransactions,
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      ),
    ]);

    await transaction.commit();
  }
}
