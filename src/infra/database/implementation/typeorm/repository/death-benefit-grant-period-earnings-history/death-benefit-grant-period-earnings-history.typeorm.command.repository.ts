import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period-earnings-history/command/death-benefit-grant-period-earnings-history.command.repository.gateway';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { DeathBenefitGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.entity';

@Injectable()
export class DeathBenefitGrantPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantPeriodEarningsHistoryTypeormEntity>
  implements DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantPeriodEarningsHistoryTypeormEntity)
    repository: Repository<DeathBenefitGrantPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantPeriodEarningsHistory(
    props: DeathBenefitGrantPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantPeriodEarningsHistoryEntity,
      DeathBenefitGrantPeriodEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitGrantPeriodId(
    deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitGrantPeriodEarningsHistoryTypeormEntity)
        .softDelete({
          deathBenefitGrantPeriod: { id: deathBenefitGrantPeriodId.toString() },
        });
    };
  }
}
