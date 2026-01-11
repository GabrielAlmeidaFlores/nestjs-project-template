import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPlanningRgpsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-query.result';
import { GetRetirementPlanningRgpsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-with-relations-query.result';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';

@Injectable()
export class RetirementPlanningRgpsTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsTypeormEntity>
  implements RetirementPlanningRgpsQueryRepositoryGateway
{
  protected readonly _type = RetirementPlanningRgpsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsTypeormEntity)
    repository: Repository<RetirementPlanningRgpsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOneByRetirementPlanningRgpsIdOrFailWithRelations(
    id: RetirementPlanningRgpsId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
        relations: {
          retirementPlanningRgpsBenefit: true,
          retirementPlanningRgpsResult: true,
          retirementPlanningRgpsLegalProceeding: true,
          retirementPlanningRgpsPeriod: true,
        },
      },
      err,
    );
    const mappedData = this.mapperGateway.map(
      data,
      RetirementPlanningRgpsTypeormEntity,
      GetRetirementPlanningRgpsWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByRetirementPlanningRgpsIdOrFail(
    id: RetirementPlanningRgpsId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsQueryResult> {
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
      RetirementPlanningRgpsTypeormEntity,
      GetRetirementPlanningRgpsQueryResult,
    );

    return mappedData;
  }
}
