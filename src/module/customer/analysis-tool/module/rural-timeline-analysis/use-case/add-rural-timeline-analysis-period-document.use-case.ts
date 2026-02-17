import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/command/rural-timeline-analysis-period-document.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodDocumentHolderTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-holder-type.enum';
import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import { AddRuralTimelineAnalysisPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/add-rural-timeline-analysis-period-document.request.dto';
import { AddRuralTimelineAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/add-rural-timeline-analysis-period-document.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AddRuralTimelineAnalysisPeriodDocumentUseCase {
  protected readonly _type = AddRuralTimelineAnalysisPeriodDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway: RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
    dto: AddRuralTimelineAnalysisPeriodDocumentRequestDto,
  ): Promise<AddRuralTimelineAnalysisPeriodDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    void (await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    ));

    const uploadedFileName = await this.fileProcessorGateway.uploadFile(
      dto.file,
    );

    const { selfOwned, documentHolderType } = this.inferMetadataFromType(
      dto.json.type,
    );

    const document = new RuralTimelineAnalysisPeriodDocumentEntity({
      documentYear: null,
      documentHolderType,
      selfOwned,
      probatoryPurpose: null,
      document: uploadedFileName,
      type: dto.json.type,
      ruralTimelinePeriodId: ruralTimelineAnalysisPeriodId,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway.createRuralTimelineAnalysisPeriodDocument(
        document,
      ),
    ]);

    await transaction.commit();

    return AddRuralTimelineAnalysisPeriodDocumentResponseDto.build({
      id: document.id,
    });
  }

  private inferMetadataFromType(
    type: RuralTimelineAnalysisPeriodDocumentTypeEnum,
  ): {
    selfOwned: boolean | null;
    documentHolderType: RuralTimelineAnalysisPeriodDocumentHolderTypeEnum | null;
  } {
    switch (type) {
      case RuralTimelineAnalysisPeriodDocumentTypeEnum.SELF_OWNED_DOCUMENT:
        return {
          selfOwned: true,
          documentHolderType:
            RuralTimelineAnalysisPeriodDocumentHolderTypeEnum.CLIENT,
        };

      case RuralTimelineAnalysisPeriodDocumentTypeEnum.FAMILY_GROUP_OWNED_DOCUMENT:
        return {
          selfOwned: false,
          documentHolderType:
            RuralTimelineAnalysisPeriodDocumentHolderTypeEnum.FAMILY_GROUP_MEMBER,
        };

      case RuralTimelineAnalysisPeriodDocumentTypeEnum.THIRD_PARTY_OWNED_DOCUMENT:
        return {
          selfOwned: false,
          documentHolderType:
            RuralTimelineAnalysisPeriodDocumentHolderTypeEnum.THIRD_PARTY,
        };

      case RuralTimelineAnalysisPeriodDocumentTypeEnum.CTPS:
        return { selfOwned: null, documentHolderType: null };

      default:
        return { selfOwned: null, documentHolderType: null };
    }
  }
}
