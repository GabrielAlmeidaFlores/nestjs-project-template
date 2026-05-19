import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/query/death-benefit-grant-period.query.repository.gateway';
import { GetDeathBenefitGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/query/result/get-death-benefit-grant-period.query.result';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

@Injectable()
export class DeathBenefitGrantPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitGrantPeriodTypeormEntity>
  implements DeathBenefitGrantPeriodQueryRepositoryGateway
{
  protected readonly _type = DeathBenefitGrantPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantPeriodTypeormEntity)
    repository: Repository<DeathBenefitGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitGrantPeriodIdOrFail(
    id: DeathBenefitGrantPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitGrantPeriodQueryResult> {
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
      DeathBenefitGrantPeriodTypeormEntity,
      GetDeathBenefitGrantPeriodQueryResult,
    );
  }
}
