import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnalysisToolClientInterviewFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-interview-form.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientInterviewFormQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/query/analysis-tool-client-interview-form.query.repository.gateway';
import { GetAnalysisToolClientInterviewFormQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/query/result/get-analysis-tool-client-interview-form.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class AnalysisToolClientInterviewFormTypeormQueryRepository
  implements AnalysisToolClientInterviewFormQueryRepositoryGateway
{
  protected readonly _type = AnalysisToolClientInterviewFormTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientInterviewFormTypeormEntity)
    private readonly repository: Repository<AnalysisToolClientInterviewFormTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findByAnalysisToolClientId(
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientInterviewFormQueryResult | null> {
    const entity = await this.repository.findOne({
      where: { analysisToolClient: { id: analysisToolClientId.toString() } },
    });

    if (entity === null) {
      return null;
    }

    return this.mapperGateway.map(
      entity,
      AnalysisToolClientInterviewFormTypeormEntity,
      GetAnalysisToolClientInterviewFormQueryResult,
    );
  }
}
