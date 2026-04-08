import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Constructor } from 'type-fest';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/query/death-benefit-period.query.repository.gateway';
import { GetDeathBenefitPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/query/result/get-death-benefit-period.query.result';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

@Injectable()
export class DeathBenefitPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitPeriodTypeormEntity>
  implements DeathBenefitPeriodQueryRepositoryGateway
{
  protected readonly _type = DeathBenefitPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitPeriodTypeormEntity)
    repository: Repository<DeathBenefitPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitPeriodIdOrFail(
    id: DeathBenefitPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitPeriodQueryResult> {
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
      DeathBenefitPeriodTypeormEntity,
      GetDeathBenefitPeriodQueryResult,
    );
  }
}
