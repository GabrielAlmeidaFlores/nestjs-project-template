import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/result/get-temporary-disability-benefits-terminated-with-relations.query.result';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-period-document/command/temporary-disability-benefits-terminated-work-period-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-periods/command/temporary-disability-benefits-terminated-work-periods.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-periods-earnings-history/command/temporary-disability-benefits-terminated-work-periods-earnings-history.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/enum/temporary-disability-benefits-terminated-work-period-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/temporary-disability-benefits-terminated-work-period-document.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/value-object/temporary-disability-benefits-terminated-work-period-document-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/value-object/temporary-disability-benefits-terminated-work-periods-earnings-history-id.value-object';
import { SaveTemporaryDisabilityBenefitsTerminatedPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/save-temporary-disability-benefits-terminated-periods.request.dto';
import { SaveTemporaryDisabilityBenefitsTerminatedPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/save-temporary-disability-benefits-terminated-periods.response.dto';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase {
  protected readonly _type =
    SaveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    dto: SaveTemporaryDisabilityBenefitsTerminatedPeriodsRequestDto,
  ): Promise<SaveTemporaryDisabilityBenefitsTerminatedPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const temporaryDisabilityBenefitsTerminated =
      await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
        temporaryDisabilityBenefitsTerminatedId,
        TemporaryDisabilityBenefitsTerminatedNotFoundError,
      );

    const transactions: TransactionType[] = [
      ...this.buildCleanupTransactions(temporaryDisabilityBenefitsTerminated),
      this.temporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedId(
        temporaryDisabilityBenefitsTerminatedId,
      ),
    ];

    for (const periodDto of dto.periods) {
      const workPeriodsId =
        new TemporaryDisabilityBenefitsTerminatedWorkPeriodsId();

      transactions.push(
        this.temporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedWorkPeriods(
          new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity({
            id: workPeriodsId,
            bondOrigin: periodDto.bondOrigin ?? null,
            startDate: this.parseDateString(periodDto.startDate),
            endDate:
              periodDto.endDate !== undefined
                ? this.parseDateString(periodDto.endDate)
                : null,
            category: periodDto.category ?? null,
            activityDescription: periodDto.activityDescription ?? null,
            competenceBelowTheMinimum: periodDto.competenceBelowTheMinimum,
            pendencyReason: periodDto.pendencyReason ?? null,
            periodConsideration: periodDto.periodConsideration ?? null,
            contributionAverage: periodDto.contributionAverage ?? null,
            impactMonths: periodDto.impactMonths ?? null,
            gracePeriod: periodDto.graceMonths ?? null,
            isPendency: periodDto.isPendency,
            wantsToComplementViaMeuINSS:
              periodDto.wantsToComplementViaMeuINSS ?? null,
            status: periodDto.status,
            isManualPeriod: periodDto.isManualPeriod ?? false,
            temporaryDisabilityBenefitsTerminatedId,
          }),
        ),
      );

      if (periodDto.documents && periodDto.documents.length > 0) {
        const documentTransactions = await Promise.all(
          periodDto.documents.map(async (documentDto) => {
            const fileName = await this.uploadBase64File(documentDto.file);

            return this.temporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedWorkPeriodDocument(
              new TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity(
                {
                  id: new TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId(),
                  document: fileName,
                  type: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeEnum.SUPPORTING,
                  temporaryDisabilityBenefitsTerminatedWorkPeriodsId:
                    workPeriodsId,
                },
              ),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        for (const item of periodDto.earningsHistory) {
          transactions.push(
            this.temporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistory(
              new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity(
                {
                  id: new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId(),
                  temporaryDisabilityBenefitsTerminatedWorkPeriodsId:
                    workPeriodsId,
                  ...(item.competence !== undefined && {
                    competence: this.parseDateString(item.competence),
                  }),
                  ...(item.value !== undefined && {
                    remuneration: item.value,
                  }),
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

    return SaveTemporaryDisabilityBenefitsTerminatedPeriodsResponseDto.build({
      temporaryDisabilityBenefitsTerminatedId,
    });
  }

  private parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('/');

    return new Date(`${year}-${month}-${day}T00:00:00`);
  }

  private buildCleanupTransactions(
    temporaryDisabilityBenefitsTerminated: GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
  ): TransactionType[] {
    return temporaryDisabilityBenefitsTerminated.workPeriods.flatMap(
      (period) => {
        const workPeriodsId =
          new TemporaryDisabilityBenefitsTerminatedWorkPeriodsId(period.id);

        return [
          this.temporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
            workPeriodsId,
          ),
          this.temporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway.deleteAllTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentByTemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
            workPeriodsId,
          ),
        ];
      },
    );
  }

  private async uploadBase64File(file: {
    base64: { decodeToBuffer(): Buffer };
    originalFileName: string;
  }): Promise<string> {
    const buffer = file.base64.decodeToBuffer();

    const fileModel = FileModel.build({
      buffer,
      originalName: file.originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });

    return this.fileProcessorGateway.uploadFile(fileModel);
  }
}
