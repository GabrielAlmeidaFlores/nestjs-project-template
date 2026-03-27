import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { FetchAndSaveRegulatoryUpdatesUseCase } from '@module/customer/regulatory-update/use-case/fetch-and-save-regulatory-updates.use-case';
import { SendRegulatoryUpdateEmailsUseCase } from '@module/customer/regulatory-update/use-case/send-regulatory-update-emails.use-case';

@Injectable()
export class FetchRegulatoryUpdatesCron {
  protected readonly _type = FetchRegulatoryUpdatesCron.name;
  private readonly logger: Logger;

  public constructor(
    private readonly fetchAndSaveRegulatoryUpdatesUseCase: FetchAndSaveRegulatoryUpdatesUseCase,
    private readonly sendRegulatoryUpdateEmailsUseCase: SendRegulatoryUpdateEmailsUseCase,
  ) {
    this.logger = new Logger(FetchRegulatoryUpdatesCron.name);

    void this.execute();
  }

  @Cron(CronExpression.EVERY_WEEK)
  public async execute(): Promise<void> {
    try {
      await this.fetchAndSaveRegulatoryUpdatesUseCase.execute();
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Erro ao buscar atualizações normativas: ${error.message}`,
          error.stack,
        );
      }
    }

    try {
      await this.sendRegulatoryUpdateEmailsUseCase.execute();
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Erro ao enviar e-mails de atualizações normativas: ${error.message}`,
          error.stack,
        );
      }
    }
  }
}
