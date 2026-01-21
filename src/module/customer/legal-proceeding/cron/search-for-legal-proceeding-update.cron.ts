import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { UpdateLegalProceedingDataUseCase } from '@module/customer/legal-proceeding/use-case/update-legal-proceeding-data.use-case';

@Injectable()
export class SearchForLegalProceedingUpdateCron {
  protected readonly _type = SearchForLegalProceedingUpdateCron.name;
  private readonly logger: Logger;

  public constructor(
    private readonly updateLegalProceedingDataUseCase: UpdateLegalProceedingDataUseCase,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {
    this.logger = new Logger(SearchForLegalProceedingUpdateCron.name);
  }

  @Cron(CronExpression.EVERY_5_HOURS)
  public async execute(): Promise<void> {
    const limit = 10;
    let page = 1;
    let hasNextPage: boolean;

    do {
      try {
        const dto = new ListDataInputModel({
          page,
          limit,
        });

        const proceedingsPage =
          await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listAnalysisToolClientLegalProceeding(
            dto,
          );

        const items = proceedingsPage.resource;

        for (const proceeding of items) {
          try {
            await this.updateLegalProceedingDataUseCase.execute(proceeding.id);
          } catch (error) {
            if (error instanceof Error) {
              this.logger.error(
                `Error processing proceeding ID ${proceeding.id.toString()}: ${error.message}`,
                error.stack,
              );
            }
          }
        }

        hasNextPage = items.length === limit;
        page++;
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(
            `Error processing page ${page}: ${error.message}`,
            error.stack,
          );
        }
        hasNextPage = false;
      }
    } while (hasNextPage);
  }
}
