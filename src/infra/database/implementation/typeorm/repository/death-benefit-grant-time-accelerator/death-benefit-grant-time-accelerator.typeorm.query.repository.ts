import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/query/death-benefit-grant-time-accelerator.query.repository.gateway';
import { GetDeathBenefitGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/query/result/get-death-benefit-grant-time-accelerator.query.result';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

@Injectable()
export class DeathBenefitGrantTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitGrantTimeAcceleratorTypeormEntity>
  implements DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantTimeAcceleratorTypeormEntity)
    repository: Repository<DeathBenefitGrantTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitGrantTimeAcceleratorIdOrFail(
    id: DeathBenefitGrantTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitGrantTimeAcceleratorQueryResult> {
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
      DeathBenefitGrantTimeAcceleratorTypeormEntity,
      GetDeathBenefitGrantTimeAcceleratorQueryResult,
    );
  }
}
