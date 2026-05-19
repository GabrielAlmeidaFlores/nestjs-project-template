import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/query/death-benefit-rejection-period.query.repository.gateway';
import { GetDeathBenefitRejectionPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/query/result/get-death-benefit-rejection-period.query.result';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

@Injectable()
export class DeathBenefitRejectionPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<DeathBenefitRejectionPeriodTypeormEntity>
  implements DeathBenefitRejectionPeriodQueryRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionPeriodTypeormEntity)
    repository: Repository<DeathBenefitRejectionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByDeathBenefitRejectionPeriodIdOrFail(
    id: DeathBenefitRejectionPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetDeathBenefitRejectionPeriodQueryResult> {
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
      DeathBenefitRejectionPeriodTypeormEntity,
      GetDeathBenefitRejectionPeriodQueryResult,
    );
  }
}
