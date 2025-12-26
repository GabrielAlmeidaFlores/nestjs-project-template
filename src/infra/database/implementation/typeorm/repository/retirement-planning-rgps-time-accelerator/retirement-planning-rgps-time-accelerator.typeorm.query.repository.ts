import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPlanningRgpsTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/result/get-retirement-planning-rgps-time-accelerator.query.result';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class RetirementPlanningRgpsTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsTimeAcceleratorTypeormEntity>
  implements RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsTimeAcceleratorTypeormEntity)
    repository: Repository<RetirementPlanningRgpsTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningRgpsTimeAcceleratorIdOrFail(
    id: RetirementPlanningRgpsTimeAcceleratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
      },
      err,
    );

    const mapped = this.mapperGateway.map(
      data,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
      GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
    );

    return mapped;
  }

  public async findByRetirementPlanningRgpsId(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult[]> {
    const data = await this.find({
      where: {
        retirementPlanningRgps: {
          id: retirementPlanningRgpsId.toString(),
        },
      },
    });

    const mapped = this.mapperGateway.mapArray(
      data,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
      GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
    );

    return mapped;
  }
}
