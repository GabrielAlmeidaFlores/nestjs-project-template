import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnalysisToolClientCadastralFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-cadastral-form.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientCadastralFormQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/analysis-tool-client-cadastral-form.query.repository.gateway';
import { GetAnalysisToolClientCadastralFormQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/result/get-analysis-tool-client-cadastral-form.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class AnalysisToolClientCadastralFormTypeormQueryRepository
  implements AnalysisToolClientCadastralFormQueryRepositoryGateway
{
  protected readonly _type = AnalysisToolClientCadastralFormTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientCadastralFormTypeormEntity)
    private readonly repository: Repository<AnalysisToolClientCadastralFormTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findByAnalysisToolClientId(
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientCadastralFormQueryResult | null> {
    const entity = await this.repository.findOne({
      where: { analysisToolClient: { id: analysisToolClientId.toString() } },
    });

    if (entity === null) {
      return null;
    }

    return this.mapperGateway.map(
      entity,
      AnalysisToolClientCadastralFormTypeormEntity,
      GetAnalysisToolClientCadastralFormQueryResult,
    );
  }
}
