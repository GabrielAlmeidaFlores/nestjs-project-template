import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPlanningRgpsAnalysisResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/query/result/get-retirement-planning-rgps-analysis-result.query.result';
import { RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/query/retirement-planning-rgps-analysis-result.query.repository.gateway.ts';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';

@Injectable()
export class RetirementPlanningRgpsAnalysisResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsAnalysisResultTypeormEntity>
  implements RetirementPlanningRgpsAnalysisResultQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsAnalysisResultTypeormQueryRepository.name;
  public constructor(
    @InjectRepository(RetirementPlanningRgpsAnalysisResultTypeormEntity)
    repository: Repository<RetirementPlanningRgpsAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningRgpsAnalysisResultIdOrFail(
    id: RetirementPlanningRgpsAnalysisResultId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsAnalysisResultQueryResult> {
    const data = await this.findOneOrFail(
      {
        relations: { retirementPlanningRgps: true },
        where: {
          id: id.toString(),
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      RetirementPlanningRgpsAnalysisResultTypeormEntity,
      GetRetirementPlanningRgpsAnalysisResultQueryResult,
    );

    return mappedData;
  }
}
