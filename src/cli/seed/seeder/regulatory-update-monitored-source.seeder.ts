import { Inject } from '@nestjs/common';

import { RegulatoryUpdateMonitoredSourceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/command/regulatory-update-monitored-source.command.repository.gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { RegulatoryUpdateMonitoredSourceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/regulatory-update-monitored-source.entity';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

const MONITORED_SOURCES: Array<{ name: string; url: string }> = [
  {
    name: 'IEPrev — Notícias Previdenciárias',
    url: 'https://www.ieprev.com.br/noticias',
  },
  {
    name: 'Ministério da Previdência Social — Notícias',
    url: 'https://www.gov.br/previdencia/pt-br/noticias',
  },
];

export class RegulatoryUpdateMonitoredSourceSeeder implements SeederInterface {
  protected readonly _type = RegulatoryUpdateMonitoredSourceSeeder.name;

  public constructor(
    @Inject(RegulatoryUpdateMonitoredSourceQueryRepositoryGateway)
    private readonly monitoredSourceQueryRepository: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
    @Inject(RegulatoryUpdateMonitoredSourceCommandRepositoryGateway)
    private readonly monitoredSourceCommandRepository: RegulatoryUpdateMonitoredSourceCommandRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const existing =
      await this.monitoredSourceQueryRepository.listAllMonitoredSources();
    const existingUrls = new Set(existing.map((s) => s.url));

    const transactions: Array<TransactionType> = [];

    for (const source of MONITORED_SOURCES) {
      if (existingUrls.has(source.url)) {
        continue;
      }

      const entity = new RegulatoryUpdateMonitoredSourceEntity({
        name: source.name,
        url: source.url,
        active: true,
      });

      transactions.push(
        this.monitoredSourceCommandRepository.createMonitoredSource(entity),
      );
    }

    return transactions;
  }
}
