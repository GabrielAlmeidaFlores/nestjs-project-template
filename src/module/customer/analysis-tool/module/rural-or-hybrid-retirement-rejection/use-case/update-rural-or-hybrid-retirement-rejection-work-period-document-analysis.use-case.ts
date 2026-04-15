import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-document-analysis/command/rural-or-hybrid-retirement-rejection-work-period-document-analysis.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/rural-or-hybrid-retirement-rejection-work-period-document-analysis.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/value-object/rural-or-hybrid-retirement-rejection-work-period-document-analysis-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-work-period-document-analysis.request.dto';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-work-period-document-analysis.request.dto';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-work-period-document-analysis.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionWorkPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-work-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase {
  protected readonly _type =
    UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId,
    dto: UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const existingWorkPeriod = (
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriod ?? []
    ).find(
      (workPeriod) =>
        workPeriod.id.toString() ===
        ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
    );

    if (!existingWorkPeriod) {
      throw new RuralOrHybridRetirementRejectionWorkPeriodNotFoundError();
    }

    const existingDocumentAnalyses = (
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis ??
      []
    ).filter(
      (documentAnalysis) =>
        documentAnalysis.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
        ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
    );

    const transactions: TransactionType[] = [
      ...existingDocumentAnalyses.map((documentAnalysis) =>
        this.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
          documentAnalysis.id,
        ),
      ),
      ...dto.documentAnalyses.map((documentAnalysisDto) =>
        this.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway.createRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
          this.buildDocumentAnalysisEntity(
            new RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId(),
            ruralOrHybridRetirementRejectionWorkPeriodId,
            documentAnalysisDto,
          ),
        ),
      ),
    ];

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto.build(
      {
        ruralOrHybridRetirementRejectionId,
      },
    );
  }

  private buildDocumentAnalysisEntity(
    ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId,
    ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId,
    documentAnalysisDto: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemRequestDto,
  ): RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity {
    return new RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity(
      {
        id: ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId,
        documentType: documentAnalysisDto.documentType ?? null,
        ownName: documentAnalysisDto.ownName ?? null,
        documentYear: documentAnalysisDto.documentYear ?? null,
        technicalNote: documentAnalysisDto.technicalNote ?? null,
        ruralOrHybridRetirementRejectionWorkPeriodId,
      },
    );
  }
}
