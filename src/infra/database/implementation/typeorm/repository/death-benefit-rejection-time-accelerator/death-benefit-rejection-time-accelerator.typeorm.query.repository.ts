import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/query/death-benefit-rejection-time-accelerator.query.repository.gateway';
import { GetDeathBenefitRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/query/result/get-death-benefit-rejection-time-accelerator.query.result';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

@Injectable()
export class DeathBenefitRejectionTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitRejectionTimeAcceleratorTypeormEntity>
  implements DeathBenefitRejectionTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionTimeAcceleratorTypeormEntity)
    repository: Repository<DeathBenefitRejectionTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitRejectionTimeAcceleratorIdOrFail(
    id: DeathBenefitRejectionTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitRejectionTimeAcceleratorQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          deletedAt: IsNull(),
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      DeathBenefitRejectionTimeAcceleratorTypeormEntity,
      GetDeathBenefitRejectionTimeAcceleratorQueryResult,
    );
  }
}
