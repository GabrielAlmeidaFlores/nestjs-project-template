import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/query/death-benefit.query.repository.gateway';
import { DeathBenefitPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/command/death-benefit-period.command.repository.gateway';
import { DeathBenefitPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period-document/command/death-benefit-period-document.command.repository.gateway';
import { DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period-earnings-history/command/death-benefit-period-earnings-history.command.repository.gateway';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/death-benefit-period.entity';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { DeathBenefitPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/death-benefit-period-document.entity';
import { DeathBenefitPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/value-object/death-benefit-period-document-id.value-object';
import { DeathBenefitPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/death-benefit-period-earnings-history.entity';
import { DeathBenefitPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/value-object/death-benefit-period-earnings-history-id.value-object';
import { CreateDeathBenefitPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit-period.request.dto';
import { CreateDeathBenefitPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit-period.response.dto';
import { DeathBenefitNotFoundError } from '@module/customer/analysis-tool/module/death-benefit/error/death-benefit-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDeathBenefitPeriodUseCase {
  protected readonly _type = CreateDeathBenefitPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitQueryRepositoryGateway)
    private readonly deathBenefitQueryRepositoryGateway: DeathBenefitQueryRepositoryGateway,
    @Inject(DeathBenefitPeriodCommandRepositoryGateway)
    private readonly deathBenefitPeriodCommandRepositoryGateway: DeathBenefitPeriodCommandRepositoryGateway,
    @Inject(DeathBenefitPeriodDocumentCommandRepositoryGateway)
    private readonly deathBenefitPeriodDocumentCommandRepositoryGateway: DeathBenefitPeriodDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway)
    private readonly deathBenefitPeriodEarningsHistoryCommandRepositoryGateway: DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitId: DeathBenefitId,
    dto: CreateDeathBenefitPeriodRequestDto,
  ): Promise<CreateDeathBenefitPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.deathBenefitQueryRepositoryGateway.findOneByDeathBenefitIdOrFailWithRelations(
      deathBenefitId,
      DeathBenefitNotFoundError,
    );

    const transactions: TransactionType[] = [];
    let lastPeriodId = new DeathBenefitPeriodId();

    for (const periodDto of dto.periods) {
      const periodId = new DeathBenefitPeriodId();
      lastPeriodId = periodId;

      transactions.push(
        this.deathBenefitPeriodCommandRepositoryGateway.createDeathBenefitPeriod(
          new DeathBenefitPeriodEntity({
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
            deathBenefitId,
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

            return this.deathBenefitPeriodDocumentCommandRepositoryGateway.createDeathBenefitPeriodDocument(
              new DeathBenefitPeriodDocumentEntity({
                id: new DeathBenefitPeriodDocumentId(),
                document: documentUrl,
                deathBenefitPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        const earningsHistoryTransactions = periodDto.earningsHistory.map(
          (item) =>
            this.deathBenefitPeriodEarningsHistoryCommandRepositoryGateway.createDeathBenefitPeriodEarningsHistory(
              new DeathBenefitPeriodEarningsHistoryEntity({
                id: new DeathBenefitPeriodEarningsHistoryId(),
                competence: item.competence ?? null,
                remuneration: item.remuneration ?? null,
                indicators: item.indicators ?? null,
                paymentDate: item.paymentDate ?? null,
                contribution: item.contribution ?? null,
                contributionSalary: item.contributionSalary ?? null,
                analysis: item.analysis ?? null,
                competenceBelowTheMinimum:
                  item.competenceBelowTheMinimum ?? null,
                deathBenefitPeriodId: periodId,
              }),
            ),
        );

        transactions.push(...earningsHistoryTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateDeathBenefitPeriodResponseDto.build({
      deathBenefitPeriodId: lastPeriodId,
    });
  }
}
