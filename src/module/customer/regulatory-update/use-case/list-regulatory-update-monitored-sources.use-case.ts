import { Inject, Injectable } from '@nestjs/common';

import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { RegulatoryUpdateMonitoredSourceResponseDto } from '@module/customer/regulatory-update/dto/response/regulatory-update-monitored-source.response.dto';

@Injectable()
export class ListRegulatoryUpdateMonitoredSourcesUseCase {
  protected readonly _type = ListRegulatoryUpdateMonitoredSourcesUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateMonitoredSourceQueryRepositoryGateway)
    private readonly monitoredSourceQueryRepository: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<
    RegulatoryUpdateMonitoredSourceResponseDto[]
  > {
    const sources =
      await this.monitoredSourceQueryRepository.listAllMonitoredSources();

    return sources.map((source) =>
      RegulatoryUpdateMonitoredSourceResponseDto.build({
        regulatoryUpdateMonitoredSourceId: source.id,
        name: source.name,
        url: source.url,
        active: source.active,
      }),
    );
  }
}
