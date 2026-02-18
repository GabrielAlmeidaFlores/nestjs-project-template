import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/command/rural-timeline-analysis-period-family-group-member.command.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/query/rural-timeline-analysis-period-family-group-member.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';
import { UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-period-family-group-member.request.dto';
import { UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-period-family-group-member.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-family-group-member-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway: RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway: RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    periodId: RuralTimelineAnalysisPeriodId,
    familyGroupMemberId: RuralTimelineAnalysisPeriodFamilyGroupMemberId,
    dto: UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto> {
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

    const existingFamilyGroupMember =
      await this.ruralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway.findOneById(
        familyGroupMemberId,
      );

    if (existingFamilyGroupMember === null) {
      throw new RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError();
    }

    if (
      existingFamilyGroupMember.ruralTimelinePeriodId.toString() !==
      periodId.toString()
    ) {
      throw new RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError();
    }

    let cnisDocumentLocation: string | null =
      existingFamilyGroupMember.cnisDocument;

    if (dto.cnisDocument !== undefined) {
      const fileBuffer = dto.cnisDocument.base64.decodeToBuffer();
      const fileModel = FileModel.build({
        buffer: fileBuffer,
        originalName: dto.cnisDocument.originalFileName,
        size: fileBuffer.length,
        encoding: 'base64',
      });

      cnisDocumentLocation = await this.fileProcessorGateway.uploadFile(
        fileModel,
        existingFamilyGroupMember.cnisDocument ?? undefined,
      );
    }

    const updatedEntity =
      new RuralTimelineAnalysisPeriodFamilyGroupMemberEntity({
        id: familyGroupMemberId,
        ruralTimelinePeriodId: existingFamilyGroupMember.ruralTimelinePeriodId,
        name: dto.name ?? existingFamilyGroupMember.name,
        federalDocument:
          dto.federalDocument ?? existingFamilyGroupMember.federalDocument,
        kinship: dto.kinship ?? existingFamilyGroupMember.kinship,
        receivesRuralBenefit:
          dto.receivesRuralBenefit ??
          existingFamilyGroupMember.receivesRuralBenefit,
        benefitNumber:
          dto.benefitNumber ?? existingFamilyGroupMember.benefitNumber,
        cnisDocument: cnisDocumentLocation,
        createdAt: existingFamilyGroupMember.createdAt,
        updatedAt: existingFamilyGroupMember.updatedAt,
        deletedAt: existingFamilyGroupMember.deletedAt,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway.updateRuralTimelineAnalysisPeriodFamilyGroupMember(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto.build({
      ruralTimelineAnalysisPeriodFamilyGroupMemberId: updatedEntity.id,
    });
  }
}
