import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/death-benefit-grant.query.repository.gateway';
import { DeathBenefitGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/command/death-benefit-grant-period.command.repository.gateway';
import { DeathBenefitGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-document/command/death-benefit-grant-period-document.command.repository.gateway';
import { DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-earnings-history/command/death-benefit-grant-period-earnings-history.command.repository.gateway';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { DeathBenefitGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/death-benefit-grant-period-document.entity';
import { DeathBenefitGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/value-object/death-benefit-grant-period-document-id.value-object';
import { DeathBenefitGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.entity';
import { DeathBenefitGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/value-object/death-benefit-grant-period-earnings-history-id.value-object';
import { CreateDeathBenefitGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant-period.request.dto';
import { CreateDeathBenefitGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant-period.response.dto';
import { DeathBenefitGrantNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-grant/error/death-benefit-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDeathBenefitGrantPeriodUseCase {
  protected readonly _type = CreateDeathBenefitGrantPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DeathBenefitGrantQueryRepositoryGateway)
    private readonly deathBenefitGrantQueryRepositoryGateway: DeathBenefitGrantQueryRepositoryGateway,
    @Inject(DeathBenefitGrantPeriodCommandRepositoryGateway)
    private readonly deathBenefitGrantPeriodCommandRepositoryGateway: DeathBenefitGrantPeriodCommandRepositoryGateway,
    @Inject(DeathBenefitGrantPeriodDocumentCommandRepositoryGateway)
    private readonly deathBenefitGrantPeriodDocumentCommandRepositoryGateway: DeathBenefitGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway)
    private readonly deathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway: DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitGrantId: DeathBenefitGrantId,
    dto: CreateDeathBenefitGrantPeriodRequestDto,
  ): Promise<CreateDeathBenefitGrantPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.deathBenefitGrantQueryRepositoryGateway.findOneByDeathBenefitGrantIdOrFailWithRelations(
      deathBenefitGrantId,
      DeathBenefitGrantNotFoundError,
    );

    const transactions: TransactionType[] = [];
    let lastPeriodId = new DeathBenefitGrantPeriodId();

    for (const periodDto of dto.periods) {
      const periodId = new DeathBenefitGrantPeriodId();
      lastPeriodId = periodId;

      transactions.push(
        this.deathBenefitGrantPeriodCommandRepositoryGateway.createDeathBenefitGrantPeriod(
          new DeathBenefitGrantPeriodEntity({
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
            deathBenefitGrantId,
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

            return this.deathBenefitGrantPeriodDocumentCommandRepositoryGateway.createDeathBenefitGrantPeriodDocument(
              new DeathBenefitGrantPeriodDocumentEntity({
                id: new DeathBenefitGrantPeriodDocumentId(),
                document: documentUrl,
                deathBenefitGrantPeriodId: periodId,
              }),
            );
          }),
        );

        transactions.push(...documentTransactions);
      }

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        const earningsHistoryTransactions = periodDto.earningsHistory.map(
          (item) =>
            this.deathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway.createDeathBenefitGrantPeriodEarningsHistory(
              new DeathBenefitGrantPeriodEarningsHistoryEntity({
                id: new DeathBenefitGrantPeriodEarningsHistoryId(),
                competence: item.competence ?? null,
                remuneration: item.remuneration ?? null,
                indicators: item.indicators ?? null,
                paymentDate: item.paymentDate ?? null,
                contribution: item.contribution ?? null,
                contributionSalary: item.contributionSalary ?? null,
                analysis: item.analysis ?? null,
                competenceBelowTheMinimum:
                  item.competenceBelowTheMinimum ?? null,
                deathBenefitGrantPeriodId: periodId,
              }),
            ),
        );

        transactions.push(...earningsHistoryTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return CreateDeathBenefitGrantPeriodResponseDto.build({
      deathBenefitGrantPeriodId: lastPeriodId,
    });
  }
}
