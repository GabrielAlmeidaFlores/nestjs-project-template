import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period-earnings-history/command/death-benefit-rejection-period-earnings-history.command.repository.gateway';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeathBenefitRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.entity';

@Injectable()
export class DeathBenefitRejectionPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity>
  implements DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity)
    repository: Repository<DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionPeriodEarningsHistory(
    props: DeathBenefitRejectionPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionPeriodEarningsHistoryEntity,
      DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDeathBenefitRejectionPeriodId(
    deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity)
        .softDelete({
          deathBenefitRejectionPeriod: {
            id: deathBenefitRejectionPeriodId.toString(),
          },
        });
    };
  }
}
