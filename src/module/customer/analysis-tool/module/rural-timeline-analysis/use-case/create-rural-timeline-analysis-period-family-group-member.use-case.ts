import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/query/rural-timeline-analysis-period.query.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/command/rural-timeline-analysis-period-family-group-member.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity';
import { CreateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-period-family-group-member.request.dto';
import { CreateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-analysis-period-family-group-member.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase {
  protected readonly _type =
    CreateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodQueryRepositoryGateway: RuralTimelineAnalysisPeriodQueryRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway: RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    periodId: RuralTimelineAnalysisPeriodId,
    dto: CreateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto,
  ): Promise<CreateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    );

    const period =
      await this.ruralTimelineAnalysisPeriodQueryRepositoryGateway.findOneById(
        periodId,
      );

    if (period === null) {
      throw new RuralTimelineAnalysisPeriodNotFoundError();
    }

    let cnisDocumentFileName: string | null = null;

    if (dto.cnisDocument) {
      const buffer = dto.cnisDocument.base64.decodeToBuffer();
      const fileModel = FileModel.build({
        buffer,
        originalName: dto.cnisDocument.originalFileName,
        size: buffer.length,
        encoding: 'base64',
      });

      cnisDocumentFileName =
        await this.fileProcessorGateway.uploadFile(fileModel);
    }

    const familyGroupMemberEntity =
      new RuralTimelineAnalysisPeriodFamilyGroupMemberEntity({
        name: dto.name,
        federalDocument: dto.federalDocument,
        kinship: dto.kinship,
        receivesRuralBenefit: dto.receivesRuralBenefit,
        benefitNumber: dto.benefitNumber ?? null,
        cnisDocument: cnisDocumentFileName,
        ruralTimelinePeriodId: periodId,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway.createRuralTimelineAnalysisPeriodFamilyGroupMember(
        familyGroupMemberEntity,
      ),
    ]);

    await transaction.commit();

    return CreateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto.build({
      ruralTimelineAnalysisPeriodFamilyGroupMemberId:
        familyGroupMemberEntity.id,
    });
  }
}
