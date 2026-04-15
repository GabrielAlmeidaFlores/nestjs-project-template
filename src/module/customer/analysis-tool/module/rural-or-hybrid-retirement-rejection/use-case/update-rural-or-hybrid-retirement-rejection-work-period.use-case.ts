import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period/command/rural-or-hybrid-retirement-rejection-work-period.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-document/command/rural-or-hybrid-retirement-rejection-work-period-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-document-analysis/command/rural-or-hybrid-retirement-rejection-work-period-document-analysis.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-earnings-history/command/rural-or-hybrid-retirement-rejection-work-period-earnings-history.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/rural-or-hybrid-retirement-rejection-work-period.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/rural-or-hybrid-retirement-rejection-work-period-document.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/value-object/rural-or-hybrid-retirement-rejection-work-period-document-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-work-period.request.dto';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-work-period.request.dto';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-work-period.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementRejectionWorkPeriodUseCase {
  protected readonly _type =
    UpdateRuralOrHybridRetirementRejectionWorkPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    dto: UpdateRuralOrHybridRetirementRejectionWorkPeriodRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionWorkPeriodResponseDto> {
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

    const existingWorkPeriods =
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriod ?? [];
    const existingWorkPeriodDocuments =
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriodDocument ??
      [];
    const existingWorkPeriodDocumentAnalyses =
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis ??
      [];
    const existingWorkPeriodEarningsHistory =
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory ??
      [];
    const transactions: TransactionType[] = [];

    for (const existingWorkPeriod of existingWorkPeriods) {
      const workPeriodDocuments = existingWorkPeriodDocuments.filter(
        (document) =>
          document.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
          existingWorkPeriod.id.toString(),
      );
      const workPeriodDocumentAnalyses =
        existingWorkPeriodDocumentAnalyses.filter(
          (analysis) =>
            analysis.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
            existingWorkPeriod.id.toString(),
        );
      const workPeriodEarningsHistory =
        existingWorkPeriodEarningsHistory.filter(
          (item) =>
            item.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
            existingWorkPeriod.id.toString(),
        );

      for (const workPeriodDocument of workPeriodDocuments) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriodDocument(
            workPeriodDocument.id,
          ),
        );
      }

      for (const workPeriodDocumentAnalysis of workPeriodDocumentAnalyses) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
            workPeriodDocumentAnalysis.id,
          ),
        );
      }

      for (const earningsHistory of workPeriodEarningsHistory) {
        transactions.push(
          this.ruralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriodEarningsHistory(
            earningsHistory.id,
          ),
        );
      }

      transactions.push(
        this.ruralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionWorkPeriod(
          existingWorkPeriod.id,
          this.buildDeletedWorkPeriodEntity(
            existingWorkPeriod,
            ruralOrHybridRetirementRejectionId,
          ),
        ),
      );
    }

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodId = new RuralOrHybridRetirementRejectionWorkPeriodId();

      transactions.push(
        this.ruralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway.createRuralOrHybridRetirementRejectionWorkPeriod(
          this.buildWorkPeriodEntity(
            workPeriodId,
            ruralOrHybridRetirementRejectionId,
            workPeriodDto,
          ),
        ),
      );

      if (workPeriodDto.documents && workPeriodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          workPeriodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const document =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.ruralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway.createRuralOrHybridRetirementRejectionWorkPeriodDocument(
              new RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity({
                id: new RuralOrHybridRetirementRejectionWorkPeriodDocumentId(),
                document,
                type: documentDto.type,
                ruralOrHybridRetirementRejectionWorkPeriodId: workPeriodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementRejectionWorkPeriodResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }

  private buildDeletedWorkPeriodEntity(
    existingWorkPeriod: Awaited<
      ReturnType<
        typeof this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations
      >
    >['ruralOrHybridRetirementRejectionWorkPeriod'][number],
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): RuralOrHybridRetirementRejectionWorkPeriodEntity {
    return new RuralOrHybridRetirementRejectionWorkPeriodEntity({
      id: existingWorkPeriod.id,
      bondOrigin: existingWorkPeriod.bondOrigin,
      startDate: existingWorkPeriod.startDate,
      endDate: existingWorkPeriod.endDate,
      category: existingWorkPeriod.category,
      competenceBelowTheMinimum: existingWorkPeriod.competenceBelowTheMinimum,
      pendencyReason: existingWorkPeriod.pendencyReason,
      periodConsideration: existingWorkPeriod.periodConsideration,
      contributionAverage: existingWorkPeriod.contributionAverage,
      status: existingWorkPeriod.status,
      gracePeriod: existingWorkPeriod.gracePeriod,
      jobType: existingWorkPeriod.jobType,
      activityDescription: existingWorkPeriod.activityDescription,
      ruralOrHybridRetirementRejectionId,
      deletedAt: new Date(),
    });
  }

  private buildWorkPeriodEntity(
    workPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    workPeriodDto: RuralOrHybridRetirementRejectionWorkPeriodItemRequestDto,
  ): RuralOrHybridRetirementRejectionWorkPeriodEntity {
    return new RuralOrHybridRetirementRejectionWorkPeriodEntity({
      id: workPeriodId,
      bondOrigin: workPeriodDto.bondOrigin ?? null,
      startDate: workPeriodDto.startDate ?? null,
      endDate: workPeriodDto.endDate ?? null,
      category: workPeriodDto.category ?? null,
      competenceBelowTheMinimum:
        workPeriodDto.competenceBelowTheMinimum ?? null,
      pendencyReason: workPeriodDto.pendencyReason ?? null,
      periodConsideration: workPeriodDto.periodConsideration ?? null,
      contributionAverage: workPeriodDto.contributionAverage ?? null,
      status: workPeriodDto.status ?? null,
      gracePeriod: workPeriodDto.gracePeriod ?? null,
      jobType: workPeriodDto.jobType ?? null,
      activityDescription: workPeriodDto.activityDescription ?? null,
      ruralOrHybridRetirementRejectionId,
    });
  }
}
