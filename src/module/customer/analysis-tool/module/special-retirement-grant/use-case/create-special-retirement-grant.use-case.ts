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
import { SpecialRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/command/special-retirement-grant.command.repository.gateway';
import { SpecialRetirementGrantBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-benefit/command/special-retirement-grant-benefit.command.repository.gateway';
import { SpecialRetirementGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-document/command/special-retirement-grant-document.command.repository.gateway';
import { SpecialRetirementGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-legal-proceeding/command/special-retirement-grant-legal-proceeding.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity';
import { SpecialRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity';
import { CreateSpecialRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant.request.dto';
import { CreateSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateSpecialRetirementGrantUseCase {
  protected readonly _type = CreateSpecialRetirementGrantUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantCommandRepositoryGateway)
    private readonly specialRetirementGrantCommandRepositoryGateway: SpecialRetirementGrantCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantBenefitCommandRepositoryGateway)
    private readonly specialRetirementGrantBenefitCommandRepositoryGateway: SpecialRetirementGrantBenefitCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantDocumentCommandRepositoryGateway)
    private readonly specialRetirementGrantDocumentCommandRepositoryGateway: SpecialRetirementGrantDocumentCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantLegalProceedingCommandRepositoryGateway)
    private readonly specialRetirementGrantLegalProceedingCommandRepositoryGateway: SpecialRetirementGrantLegalProceedingCommandRepositoryGateway,
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
    dto: CreateSpecialRetirementGrantRequestDto,
  ): Promise<CreateSpecialRetirementGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    let cnisDocumentKey: string | null = null;
    if (dto.cnisDocument) {
      const cnisBuffer = dto.cnisDocument.buffer;
      const cnisFileModel = FileModel.build({
        buffer: cnisBuffer,
        originalName: dto.cnisDocument.originalName,
        size: cnisBuffer.length,
        encoding: 'base64',
      });
      cnisDocumentKey =
        await this.fileProcessorGateway.uploadFile(cnisFileModel);
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.json.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const specialRetirementGrant = new SpecialRetirementGrantEntity({
      name: dto.json.name,
      specialActivity: dto.json.specialActivity,
      cnisDocument: cnisDocumentKey,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const benefits =
      dto.json.inssBenefitNumber?.map((value) => {
        return new SpecialRetirementGrantBenefitEntity({
          inssBenefitNumber: value,
          specialRetirementGrant,
        });
      }) ?? [];

    const legalProceedings =
      dto.json.legalProceedingNumber?.map((value) => {
        return new SpecialRetirementGrantLegalProceedingEntity({
          legalProceedingNumber: value,
          specialRetirementGrant,
        });
      }) ?? [];

    const documents =
      dto.json.documents !== undefined
        ? await Promise.all(
            dto.json.documents.map(async (docDto) => {
              const buffer = docDto.document.base64.decodeToBuffer();
              const fileModel = FileModel.build({
                buffer,
                originalName: docDto.document.originalFileName,
                size: buffer.length,
                encoding: 'base64',
              });
              const documentKey =
                await this.fileProcessorGateway.uploadFile(fileModel);
              return new SpecialRetirementGrantDocumentEntity({
                document: documentKey,
                type: docDto.type,
                specialRetirementGrant,
              });
            }),
          )
        : [];

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.SPECIAL_RETIREMENT_GRANT,
      specialRetirementGrant,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      specialRetirementGrant,
      benefits,
      legalProceedings,
      documents,
      analysisToolRecord,
    );

    return CreateSpecialRetirementGrantResponseDto.build({
      specialRetirementGrantId: specialRetirementGrant.id,
    });
  }

  private async createOnDatabase(
    specialRetirementGrant: SpecialRetirementGrantEntity,
    benefits: SpecialRetirementGrantBenefitEntity[],
    legalProceedings: SpecialRetirementGrantLegalProceedingEntity[],
    documents: SpecialRetirementGrantDocumentEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const benefitTransactions = benefits.map((value) =>
      this.specialRetirementGrantBenefitCommandRepositoryGateway.createSpecialRetirementGrantBenefit(
        value,
      ),
    );

    const legalProceedingTransactions = legalProceedings.map((value) =>
      this.specialRetirementGrantLegalProceedingCommandRepositoryGateway.createSpecialRetirementGrantLegalProceeding(
        value,
      ),
    );

    const documentTransactions = documents.map((value) =>
      this.specialRetirementGrantDocumentCommandRepositoryGateway.createSpecialRetirementGrantDocument(
        value,
      ),
    );

    const specialRetirementGrantTransaction =
      this.specialRetirementGrantCommandRepositoryGateway.createSpecialRetirementGrant(
        specialRetirementGrant,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      specialRetirementGrantTransaction,
      ...benefitTransactions,
      ...legalProceedingTransactions,
      ...documentTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
