import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPlanningRgpsResultQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-result/query/result/get-retirement-planning-rgps-result.query.result';
import { RetirementPlanningRgpsResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-result/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';

@Injectable()
export class RetirementPlanningRgpsResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsResultTypeormEntity>
  implements RetirementPlanningRgpsResultQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsResultTypeormEntity)
    repository: Repository<RetirementPlanningRgpsResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningRgpsResultIdOrFail(
    id: RetirementPlanningRgpsResultId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsResultQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      RetirementPlanningRgpsResultTypeormEntity,
      GetRetirementPlanningRgpsResultQueryResult,
    );

    return mappedData;
  }
}
