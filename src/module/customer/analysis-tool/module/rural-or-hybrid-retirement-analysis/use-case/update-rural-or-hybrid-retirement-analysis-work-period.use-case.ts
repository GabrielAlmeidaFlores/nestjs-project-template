import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period/command/rural-or-hybrid-retirement-analysis-work-period.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period-document/command/rural-or-hybrid-retirement-analysis-work-period-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period-document-analysis/command/rural-or-hybrid-retirement-analysis-work-period-document-analysis.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-work-period-earnings-history/command/rural-or-hybrid-retirement-analysis-work-period-earnings-history.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/rural-or-hybrid-retirement-analysis-work-period.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/rural-or-hybrid-retirement-analysis-work-period-document.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/value-object/rural-or-hybrid-retirement-analysis-work-period-document-id.value-object';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/rural-or-hybrid-retirement-analysis-work-period-document-analysis.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/value-object/rural-or-hybrid-retirement-analysis-work-period-document-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/rural-or-hybrid-retirement-analysis-work-period-earnings-history.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/value-object/rural-or-hybrid-retirement-analysis-work-period-earnings-history-id.value-object';
import {
  RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemRequestDto,
  RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryItemRequestDto,
  RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-work-period.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis-work-period.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis-work-period.response.dto';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateRuralOrHybridRetirementAnalysisWorkPeriodUseCase {
  protected readonly _type =
    UpdateRuralOrHybridRetirementAnalysisWorkPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway: RuralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway: RuralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    dto: UpdateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingAnalysis =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const existingWorkPeriods =
      existingAnalysis.ruralOrHybridRetirementAnalysisWorkPeriod ?? [];
    const existingWorkPeriodDocuments =
      existingAnalysis.ruralOrHybridRetirementAnalysisWorkPeriodDocument ?? [];
    const existingWorkPeriodDocumentAnalyses =
      existingAnalysis.ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis ??
      [];
    const existingWorkPeriodEarningsHistory =
      existingAnalysis.ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory ??
      [];
    const transactions: TransactionType[] = [];

    for (const existingWorkPeriod of existingWorkPeriods) {
      const workPeriodDocuments = existingWorkPeriodDocuments.filter(
        (document) =>
          document.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
          existingWorkPeriod.id.toString(),
      );
      const workPeriodDocumentAnalyses =
        existingWorkPeriodDocumentAnalyses.filter(
          (analysis) =>
            analysis.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
            existingWorkPeriod.id.toString(),
        );
      const workPeriodEarningsHistory =
        existingWorkPeriodEarningsHistory.filter(
          (item) =>
            item.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
            existingWorkPeriod.id.toString(),
        );

      for (const workPeriodDocument of workPeriodDocuments) {
        transactions.push(
          this.ruralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisWorkPeriodDocument(
            workPeriodDocument.id,
          ),
        );
      }

      for (const workPeriodDocumentAnalysis of workPeriodDocumentAnalyses) {
        transactions.push(
          this.ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
            workPeriodDocumentAnalysis.id,
          ),
        );
      }

      for (const earningsHistory of workPeriodEarningsHistory) {
        transactions.push(
          this.ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistory(
            earningsHistory.id,
          ),
        );
      }

      transactions.push(
        this.ruralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisWorkPeriod(
          existingWorkPeriod.id,
          this.buildDeletedWorkPeriodEntity(
            existingWorkPeriod,
            ruralOrHybridRetirementAnalysisId,
          ),
        ),
      );
    }

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodId = new RuralOrHybridRetirementAnalysisWorkPeriodId();

      transactions.push(
        this.ruralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisWorkPeriod(
          this.buildWorkPeriodEntity(
            workPeriodId,
            ruralOrHybridRetirementAnalysisId,
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

            return this.ruralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisWorkPeriodDocument(
              new RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity({
                id: new RuralOrHybridRetirementAnalysisWorkPeriodDocumentId(),
                document,
                type: documentDto.type,
                ruralOrHybridRetirementAnalysisWorkPeriodId: workPeriodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (
        workPeriodDto.documentAnalyses &&
        workPeriodDto.documentAnalyses.length > 0
      ) {
        const documentAnalysisTransactions = workPeriodDto.documentAnalyses.map(
          (documentAnalysisDto) =>
            this.ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
              this.buildDocumentAnalysisEntity(
                new RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId(),
                workPeriodId,
                documentAnalysisDto,
              ),
            ),
        );

        transactions.push(...documentAnalysisTransactions);
      }

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (earningsHistoryDto) =>
            this.ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway.createRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistory(
              this.buildEarningsHistoryEntity(
                new RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId(),
                workPeriodId,
                earningsHistoryDto,
              ),
            ),
        );

        transactions.push(...earningsHistoryTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto.build({
      ruralOrHybridRetirementAnalysisId,
    });
  }

  private buildDeletedWorkPeriodEntity(
    existingWorkPeriod: RuralOrHybridRetirementAnalysisWorkPeriodEntity,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): RuralOrHybridRetirementAnalysisWorkPeriodEntity {
    return new RuralOrHybridRetirementAnalysisWorkPeriodEntity({
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
      ruralOrHybridRetirementAnalysisId,
      deletedAt: new Date(),
    });
  }

  private buildDocumentAnalysisEntity(
    id: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId,
    ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId,
    dto: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemRequestDto,
  ): RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity {
    return new RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity({
      id,
      documentType: dto.documentType ?? null,
      ownName: dto.ownName ?? null,
      documentYear: dto.documentYear ?? null,
      technicalNote: dto.technicalNote ?? null,
      ruralOrHybridRetirementAnalysisWorkPeriodId,
    });
  }

  private buildEarningsHistoryEntity(
    id: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId,
    ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId,
    dto: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryItemRequestDto,
  ): RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity {
    return new RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity({
      id,
      competence: dto.competence?.toISOString() ?? null,
      remuneration: dto.remuneration ?? null,
      indicators: dto.indicators ?? null,
      paymentDate: dto.paymentDate ?? null,
      contribution: dto.contribution ?? null,
      contributionSalary: dto.contributionSalary ?? null,
      competenceBelowMinimum: dto.competenceBelowMinimum ?? null,
      ruralOrHybridRetirementAnalysisWorkPeriodId,
    });
  }

  private buildWorkPeriodEntity(
    workPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    workPeriodDto: RuralOrHybridRetirementAnalysisWorkPeriodItemRequestDto,
  ): RuralOrHybridRetirementAnalysisWorkPeriodEntity {
    return new RuralOrHybridRetirementAnalysisWorkPeriodEntity({
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
      ruralOrHybridRetirementAnalysisId,
    });
  }
}
