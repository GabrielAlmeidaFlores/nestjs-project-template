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
import { RuralOrHybridRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/command/rural-or-hybrid-retirement-analysis.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-document/command/rural-or-hybrid-retirement-analysis-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import { RuralOrHybridRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/rural-or-hybrid-retirement-analysis-document.entity';
import { RuralOrHybridRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/value-object/rural-or-hybrid-retirement-analysis-document-id.value-object';
import { CreateRuralOrHybridRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis.request.dto';
import { CreateRuralOrHybridRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRuralOrHybridRetirementAnalysisUseCase {
  protected readonly _type = CreateRuralOrHybridRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisCommandRepositoryGateway: RuralOrHybridRetirementAnalysisCommandRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway: RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway,
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
    dto: CreateRuralOrHybridRetirementAnalysisRequestDto,
  ): Promise<CreateRuralOrHybridRetirementAnalysisResponseDto> {
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

    const ruralOrHybridRetirementAnalysis =
      new RuralOrHybridRetirementAnalysisEntity({
        analysisName: dto.analysisName ?? null,
        activityType: dto.activityType ?? null,
        requestedBenefit: dto.requestedBenefit ?? null,
      });

    const documentEntities = await this.buildDocumentEntities(
      ruralOrHybridRetirementAnalysis.id,
      dto,
    );

    await this.createOnDatabase(
      ruralOrHybridRetirementAnalysis,
      documentEntities,
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
      type: AnalysisToolRecordTypeEnum.RURAL_OR_HYBRID_RETIREMENT_ANALYSIS,
      cnisFastAnalysis: null,
      ruralOrHybridRetirementAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createAnalysisToolRecordOnDatabase(analysisToolRecord);

    return CreateRuralOrHybridRetirementAnalysisResponseDto.build({
      ruralOrHybridRetirementAnalysisId: ruralOrHybridRetirementAnalysis.id,
    });
  }

  private async createOnDatabase(
    ruralOrHybridRetirementAnalysis: RuralOrHybridRetirementAnalysisEntity,
    documentEntities: RuralOrHybridRetirementAnalysisDocumentEntity[],
  ): Promise<void> {
    const analysisTransaction =
      this.ruralOrHybridRetirementAnalysisCommandRepositoryGateway.createRuralOrHybridRetirementAnalysis(
        ruralOrHybridRetirementAnalysis,
      );

    const documentTransactions = documentEntities.map((value) =>
      this.ruralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisDocument(
        value,
      ),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      analysisTransaction,
      ...documentTransactions,
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
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisEntity['id'],
    dto: CreateRuralOrHybridRetirementAnalysisRequestDto,
  ): Promise<RuralOrHybridRetirementAnalysisDocumentEntity[]> {
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

        return new RuralOrHybridRetirementAnalysisDocumentEntity({
          id: new RuralOrHybridRetirementAnalysisDocumentId(),
          document: documentUrl,
          type: documentDto.type,
          ruralOrHybridRetirementAnalysisId,
        });
      }),
    );
  }
}
