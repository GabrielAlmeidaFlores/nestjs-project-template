import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-period/command/retirement-permanent-disability-rejection-period.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-period-document/command/retirement-permanent-disability-rejection-period-document.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-period-earnings-history/command/retirement-permanent-disability-rejection-period-earnings-history.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity';
import { RetirementPermanentDisabilityRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/value-object/retirement-permanent-disability-rejection-period-document-id/retirement-permanent-disability-rejection-period-document-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/value-object/retirement-permanent-disability-rejection-period-earnings-history-id/retirement-permanent-disability-rejection-period-earnings-history-id.value-object';
import { SaveRetirementPermanentDisabilityRejectionPeriodsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/save-retirement-permanent-disability-rejection-periods.request.dto';
import { SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/save-retirement-permanent-disability-rejection-periods.response.dto';
import { RetirementPermanentDisabilityRejectionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/error/retirement-permanent-disability-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveRetirementPermanentDisabilityRejectionPeriodsUseCase {
  protected readonly _type =
    SaveRetirementPermanentDisabilityRejectionPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRejectionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRejectionQueryRepositoryGateway: RetirementPermanentDisabilityRejectionQueryRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway: RetirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway: RetirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    dto: SaveRetirementPermanentDisabilityRejectionPeriodsRequestDto,
  ): Promise<SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existing =
      await this.retirementPermanentDisabilityRejectionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
        retirementPermanentDisabilityRejectionId,
        RetirementPermanentDisabilityRejectionNotFoundError,
      );

    const existingPeriods =
      existing.retirementPermanentDisabilityRejectionPeriod ?? [];

    const transactions: TransactionType[] = [];

    for (const existingPeriod of existingPeriods) {
      transactions.push(
        this.retirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway.deleteAllRetirementPermanentDisabilityRejectionPeriodEarningsHistoryByPeriodId(
          existingPeriod.id,
        ),
        this.retirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway.deleteAllRetirementPermanentDisabilityRejectionPeriodDocumentsByPeriodId(
          existingPeriod.id,
        ),
        this.retirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway.deleteRetirementPermanentDisabilityRejectionPeriod(
          existingPeriod.id,
        ),
      );
    }

    for (const periodDto of dto.periods) {
      const periodId = new RetirementPermanentDisabilityRejectionPeriodId();

      transactions.push(
        this.retirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionPeriod(
          new RetirementPermanentDisabilityRejectionPeriodEntity({
            id: periodId,
            bondOrigin: periodDto.bondOrigin ?? null,
            category: periodDto.category ?? null,
            activityDescription: periodDto.activityDescription ?? null,
            startDate: periodDto.startDate,
            endDate: periodDto.endDate ?? null,
            workType: periodDto.workType,
            isPendency: periodDto.isPendency,
            competenceBelowTheMinimum: periodDto.competenceBelowTheMinimum,
            contributionAverage: periodDto.contributionAverage ?? null,
            pendencyReason: periodDto.pendencyReason ?? null,
            periodConsideration: periodDto.periodConsideration ?? null,
            wantsToComplementViaMeuINSS:
              periodDto.wantsToComplementViaMeuINSS ?? null,
            status: periodDto.status,
            local: periodDto.local ?? null,
            retirementPermanentDisabilityRejectionId,
          }),
        ),
      );

      if (periodDto.documents && periodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          periodDto.documents.map(async (documentDto) => {
            const buffer = documentDto.file.base64.decodeToBuffer();

            const fileModel = FileModel.build({
              buffer,
              originalName: documentDto.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });

            const documentUrl =
              await this.fileProcessorGateway.uploadFile(fileModel);

            return this.retirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionPeriodDocument(
              new RetirementPermanentDisabilityRejectionPeriodDocumentEntity({
                id: new RetirementPermanentDisabilityRejectionPeriodDocumentId(),
                document: documentUrl,
                retirementPermanentDisabilityRejectionPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        for (const item of periodDto.earningsHistory) {
          transactions.push(
            this.retirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway.createRetirementPermanentDisabilityRejectionPeriodEarningsHistory(
              new RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity(
                {
                  id: new RetirementPermanentDisabilityRejectionPeriodEarningsHistoryId(),
                  retirementPermanentDisabilityRejectionPeriodId: periodId,
                  ...(item.competence !== undefined && {
                    competence: item.competence,
                  }),
                  ...(item.value !== undefined && { value: item.value }),
                },
              ),
            ),
          );
        }
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto.build({
      retirementPermanentDisabilityRejectionId,
    });
  }
}
