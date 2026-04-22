import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/command/death-benefit-rejection-period.command.repository.gateway';
import { DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period-document/command/death-benefit-rejection-period-document.command.repository.gateway';
import { DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period-earnings-history/command/death-benefit-rejection-period-earnings-history.command.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/death-benefit-rejection-period.entity';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeathBenefitRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/death-benefit-rejection-period-document.entity';
import { DeathBenefitRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/value-object/death-benefit-rejection-period-document-id.value-object';
import { DeathBenefitRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.entity';
import { DeathBenefitRejectionPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/value-object/death-benefit-rejection-period-earnings-history-id.value-object';
import { CreateDeathBenefitRejectionPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/create-death-benefit-rejection-period.request.dto';
import { CreateDeathBenefitRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-period.response.dto';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDeathBenefitRejectionPeriodUseCase {
  protected readonly _type = CreateDeathBenefitRejectionPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionPeriodCommandRepositoryGateway)
    private readonly deathBenefitRejectionPeriodCommandRepositoryGateway: DeathBenefitRejectionPeriodCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway)
    private readonly deathBenefitRejectionPeriodDocumentCommandRepositoryGateway: DeathBenefitRejectionPeriodDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway)
    private readonly deathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway: DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
    dto: CreateDeathBenefitRejectionPeriodRequestDto,
  ): Promise<CreateDeathBenefitRejectionPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
      deathBenefitRejectionId,
      DeathBenefitRejectionNotFoundError,
    );

    const transactions: TransactionType[] = [];
    let lastPeriodId = new DeathBenefitRejectionPeriodId();

    for (const periodDto of dto.periods) {
      const periodId = new DeathBenefitRejectionPeriodId();
      lastPeriodId = periodId;

      transactions.push(
        this.deathBenefitRejectionPeriodCommandRepositoryGateway.createDeathBenefitRejectionPeriod(
          new DeathBenefitRejectionPeriodEntity({
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
            deathBenefitRejectionId,
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

            return this.deathBenefitRejectionPeriodDocumentCommandRepositoryGateway.createDeathBenefitRejectionPeriodDocument(
              new DeathBenefitRejectionPeriodDocumentEntity({
                id: new DeathBenefitRejectionPeriodDocumentId(),
                document: documentUrl,
                deathBenefitRejectionPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        const earningsHistoryTransactions = periodDto.earningsHistory.map(
          (item) =>
            this.deathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway.createDeathBenefitRejectionPeriodEarningsHistory(
              new DeathBenefitRejectionPeriodEarningsHistoryEntity({
                id: new DeathBenefitRejectionPeriodEarningsHistoryId(),
                competence: item.competence ?? null,
                remuneration: item.remuneration ?? null,
                indicators: item.indicators ?? null,
                paymentDate: item.paymentDate ?? null,
                contribution: item.contribution ?? null,
                contributionSalary: item.contributionSalary ?? null,
                analysis: item.analysis ?? null,
                competenceBelowTheMinimum:
                  item.competenceBelowTheMinimum ?? null,
                deathBenefitRejectionPeriodId: periodId,
              }),
            ),
        );

        transactions.push(...earningsHistoryTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateDeathBenefitRejectionPeriodResponseDto.build({
      deathBenefitRejectionPeriodId: lastPeriodId,
    });
  }
}
