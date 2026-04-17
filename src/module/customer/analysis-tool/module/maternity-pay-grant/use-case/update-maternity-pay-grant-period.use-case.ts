import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-earnings-history/command/maternity-pay-grant-earnings-history.command.repository.gateway';
import { MaternityPayGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/command/maternity-pay-grant-period.command.repository.gateway';
import { MaternityPayGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period-document/command/maternity-pay-grant-period-document.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity';
import { MaternityPayGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/value-object/maternity-pay-grant-earnings-history-id.value-object';
import { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { MaternityPayGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/maternity-pay-grant-period-document.entity';
import { MaternityPayGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/value-object/maternity-pay-grant-period-document-id.value-object';
import { UpdateMaternityPayGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/update-maternity-pay-grant-period.request.dto';
import { UpdateMaternityPayGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/update-maternity-pay-grant-period.response.dto';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateMaternityPayGrantPeriodUseCase {
  protected readonly _type = UpdateMaternityPayGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(MaternityPayGrantPeriodCommandRepositoryGateway)
    private readonly maternityPayGrantPeriodCommandRepositoryGateway: MaternityPayGrantPeriodCommandRepositoryGateway,
    @Inject(MaternityPayGrantPeriodDocumentCommandRepositoryGateway)
    private readonly maternityPayGrantPeriodDocumentCommandRepositoryGateway: MaternityPayGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(MaternityPayGrantEarningsHistoryCommandRepositoryGateway)
    private readonly maternityPayGrantEarningsHistoryCommandRepositoryGateway: MaternityPayGrantEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayGrantId: MaternityPayGrantId,
    dto: UpdateMaternityPayGrantPeriodRequestDto,
  ): Promise<UpdateMaternityPayGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingMaternityPayGrant =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const existingPeriods =
      existingMaternityPayGrant.maternityPayGrantPeriod ?? [];
    const transactions: TransactionType[] = [];

    for (const existingPeriod of existingPeriods) {
      transactions.push(
        this.maternityPayGrantPeriodDocumentCommandRepositoryGateway.deleteAllByMaternityPayGrantPeriodId(
          existingPeriod.id,
        ),
      );
      transactions.push(
        this.maternityPayGrantEarningsHistoryCommandRepositoryGateway.deleteAllByMaternityPayGrantPeriodId(
          existingPeriod.id,
        ),
      );
      transactions.push(
        this.maternityPayGrantPeriodCommandRepositoryGateway.deleteMaternityPayGrantPeriod(
          existingPeriod.id,
        ),
      );
    }

    for (const periodDto of dto.periods) {
      const periodId = new MaternityPayGrantPeriodId();

      transactions.push(
        this.maternityPayGrantPeriodCommandRepositoryGateway.createMaternityPayGrantPeriod(
          new MaternityPayGrantPeriodEntity({
            id: periodId,
            startDate: periodDto.startDate,
            endDate: periodDto.endDate ?? null,
            category: periodDto.category,
            isPendency: periodDto.isPendency,
            competenceBelowTheMinimum: periodDto.competenceBelowTheMinimum,
            pendencyReason: periodDto.pendencyReason ?? null,
            typeOfContribution: periodDto.typeOfContribution ?? null,
            status: periodDto.status,
            periodConsideration: periodDto.periodConsideration ?? null,
            contributionAverage: periodDto.contributionAverage ?? null,
            bondOrigin: periodDto.bondOrigin ?? null,
            impact: periodDto.impact ?? null,
            gracePeriod: periodDto.gracePeriod ?? null,
            complementViaMyInss: periodDto.complementViaMyInss ?? null,
            maternityPayGrantId,
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

            return this.maternityPayGrantPeriodDocumentCommandRepositoryGateway.createMaternityPayGrantPeriodDocument(
              new MaternityPayGrantPeriodDocumentEntity({
                id: new MaternityPayGrantPeriodDocumentId(),
                document: documentUrl,
                maternityPayGrantPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        const earningsHistoryTransactions = periodDto.earningsHistory.map(
          (item) =>
            this.maternityPayGrantEarningsHistoryCommandRepositoryGateway.createMaternityPayGrantEarningsHistory(
              new MaternityPayGrantEarningsHistoryEntity({
                id: new MaternityPayGrantEarningsHistoryId(),
                competence: item.competence ?? null,
                remuneration: item.remuneration ?? null,
                indicators: item.indicators ?? null,
                paymentDate: item.paymentDate ?? null,
                contribution: item.contribution ?? null,
                contributionSalary: item.contributionSalary ?? null,
                analysis: item.analysis ?? null,
                competenceBelowTheMinimum:
                  item.competenceBelowTheMinimum ?? null,
                maternityPayGrantId,
                maternityPayGrantPeriodId: periodId,
              }),
            ),
        );

        transactions.push(...earningsHistoryTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateMaternityPayGrantPeriodResponseDto.build({
      maternityPayGrantId,
    });
  }
}
