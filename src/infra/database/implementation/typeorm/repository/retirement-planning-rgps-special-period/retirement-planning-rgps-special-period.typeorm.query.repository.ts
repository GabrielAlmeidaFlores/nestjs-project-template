import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-special-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPlanningRgpsSpecialPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/query/result/get-retirement-planning-rgps-special-period.query.result';
import { RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/query/retirement-planning-rgps-special-period.query.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class RetirementPlanningRgpsSpecialPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsSpecialPeriodTypeormEntity>
  implements RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsSpecialPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsSpecialPeriodTypeormEntity)
    repository: Repository<RetirementPlanningRgpsSpecialPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningRgpsSpecialPeriodIdOrFail(
    id: RetirementPlanningRgpsSpecialPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsSpecialPeriodQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString(), deletedAt: IsNull() } },
      err,
    );

    const mapped = this.mapperGateway.map(
      data,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
      GetRetirementPlanningRgpsSpecialPeriodQueryResult,
    );

    return mapped;
  }

  public async findByRetirementPlanningRgpsId(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsSpecialPeriodQueryResult[]> {
    const data = await this.find({
      where: {
        retirementPlanningRgps: {
          id: retirementPlanningRgpsId.toString(),
        },
      },
    });

    const mapped = this.mapperGateway.mapArray(
      data,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
      GetRetirementPlanningRgpsSpecialPeriodQueryResult,
    );

    return mapped;
  }
}
