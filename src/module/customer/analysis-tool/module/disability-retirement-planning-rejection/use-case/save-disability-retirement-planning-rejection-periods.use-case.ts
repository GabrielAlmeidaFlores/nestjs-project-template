import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/query/disability-retirement-planning-rejection.query.repository.gateway';
import { DisabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/command/disability-retirement-planning-rejection-period.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period-document/command/disability-retirement-planning-rejection-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period-earnings-history/command/disability-retirement-planning-rejection-period-earnings-history.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.entity';
import { DisabilityRetirementPlanningRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/value-object/disability-retirement-planning-rejection-period-document-id/disability-retirement-planning-rejection-period-document-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity';
import { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/value-object/disability-retirement-planning-rejection-period-earnings-history-id/disability-retirement-planning-rejection-period-earnings-history-id.value-object';
import { SaveDisabilityRetirementPlanningRejectionPeriodsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/save-disability-retirement-planning-rejection-periods.request.dto';
import { SaveDisabilityRetirementPlanningRejectionPeriodsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/save-disability-retirement-planning-rejection-periods.response.dto';
import { DisabilityRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/error/disability-retirement-planning-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveDisabilityRetirementPlanningRejectionPeriodsUseCase {
  protected readonly _type =
    SaveDisabilityRetirementPlanningRejectionPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionQueryRepositoryGateway: DisabilityRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway: DisabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway: DisabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway,
    @Inject(
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly disabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    dto: SaveDisabilityRetirementPlanningRejectionPeriodsRequestDto,
  ): Promise<SaveDisabilityRetirementPlanningRejectionPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingDenial =
      await this.disabilityRetirementPlanningRejectionQueryRepositoryGateway.findOneByDisabilityRetirementPlanningRejectionIdOrFailWithRelations(
        disabilityRetirementPlanningRejectionId,
        DisabilityRetirementPlanningRejectionNotFoundError,
      );

    const existingPeriods =
      existingDenial.disabilityRetirementPlanningRejectionPeriod ?? [];

    const transactions: TransactionType[] = [];

    for (const existingPeriod of existingPeriods) {
      transactions.push(
        this.disabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningRejectionPeriodId(
          existingPeriod.id,
        ),
        this.disabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway.deleteAllByDisabilityRetirementPlanningRejectionPeriodId(
          existingPeriod.id,
        ),
        this.disabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway.deleteDisabilityRetirementPlanningRejectionPeriod(
          existingPeriod.id,
        ),
      );
    }

    for (const periodDto of dto.periods) {
      const periodId = new DisabilityRetirementPlanningRejectionPeriodId();

      transactions.push(
        this.disabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionPeriod(
          new DisabilityRetirementPlanningRejectionPeriodEntity({
            id: periodId,
            bondOrigin: periodDto.bondOrigin ?? null,
            category: periodDto.category ?? null,
            activityDescription: periodDto.activityDescription ?? null,
            startDate: periodDto.startDate,
            endDate: periodDto.endDate ?? null,
            workType: periodDto.workType,
            impactMonths: periodDto.impactMonths ?? null,
            graceMonths: periodDto.graceMonths ?? null,
            isPendency: periodDto.isPendency,
            competenceBelowTheMinimum: periodDto.competenceBelowTheMinimum,
            contributionAverage: periodDto.contributionAverage ?? null,
            pendencyReason: periodDto.pendencyReason ?? null,
            periodConsideration: periodDto.periodConsideration ?? null,
            wantsToComplementViaMeuINSS:
              periodDto.wantsToComplementViaMeuINSS ?? null,
            status: periodDto.status,
            pcdStatus: periodDto.pcdStatus ?? null,
            local: periodDto.local ?? null,
            disabilityRetirementPlanningRejectionId,
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

            return this.disabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionPeriodDocument(
              new DisabilityRetirementPlanningRejectionPeriodDocumentEntity({
                id: new DisabilityRetirementPlanningRejectionPeriodDocumentId(),
                document: documentUrl,
                disabilityRetirementPlanningRejectionPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        for (const item of periodDto.earningsHistory) {
          transactions.push(
            this.disabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway.createDisabilityRetirementPlanningRejectionPeriodEarningsHistory(
              new DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity(
                {
                  id: new DisabilityRetirementPlanningRejectionPeriodEarningsHistoryId(),
                  disabilityRetirementPlanningRejectionPeriodId: periodId,
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

    return SaveDisabilityRetirementPlanningRejectionPeriodsResponseDto.build({
      disabilityRetirementPlanningRejectionId,
    });
  }
}
