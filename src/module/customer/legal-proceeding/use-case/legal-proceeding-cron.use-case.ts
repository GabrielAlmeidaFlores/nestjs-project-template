import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { GetAnalysisToolClientLegalProceedingWithRelationsResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding-with-relations.response.dto';
import { ListAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/list-analysis-tool-client-legal-proceeding.use-case-gateway';
import { LegalProceedingDetailCoomandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class LegalProceedingCronUseCase {
  protected readonly _type = LegalProceedingCronUseCase.name;

  public constructor(
    private readonly legalProceedingConsumerGateway: LegalProceedingConsumerGateway,

    @Inject(ListAnalysisToolClientLegalProceedingUseCaseGateway)
    private readonly listAnalysisToolClientLegalProceedingUseCaseGateway: ListAnalysisToolClientLegalProceedingUseCaseGateway,

    @Inject(LegalProceedingDetailCoomandRepositoryGateway)
    private readonly legalProceedingDetailCoomandRepositoryGateway: LegalProceedingDetailCoomandRepositoryGateway,

    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async execute(): Promise<void> {
    const limit = 50;
    let page = 1;

    const allProceedings: GetAnalysisToolClientLegalProceedingWithRelationsResponseDto[] =
      [];

    let hasNextPage: boolean;

    do {
      const dto = new ListDataRequestDto();
      dto.page = page;
      dto.limit = limit;

      const proceedingsPage =
        await this.listAnalysisToolClientLegalProceedingUseCaseGateway.findAnalysisToolClientLegalProceedingWithRelations(
          dto,
        );

      const items = proceedingsPage.resource;

      allProceedings.push(...items);

      hasNextPage = items.length === limit;
      page++;
    } while (hasNextPage);

    const transactions = [];

    for (const proceeding of allProceedings) {
      const processNumber = proceeding.legalProceedingNumber;

      const response =
        await this.legalProceedingConsumerGateway.consumeByProcessNumber(
          processNumber,
        );

      const safeDetail = JSON.stringify(response);

      const legalProceedingDetail = new LegalProceedingDetailEntity({
        detail: safeDetail,
        analysisToolClientLegalProceeding:
          new AnalysisToolClientLegalProceedingId(
            proceeding.analysisToolClientLegalProceedingId.toString(),
          ),
      });

      const tx =
        this.legalProceedingDetailCoomandRepositoryGateway.createLegalProceedingDetail(
          legalProceedingDetail,
        );

      transactions.push(tx);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await transaction.commit();
  }
}
