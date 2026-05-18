import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-work-period-earnings-history/command/maternity-pay-rejection-work-period-earnings-history.command.repository.gateway';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import { MaternityPayRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity';

@Injectable()
export class MaternityPayRejectionWorkPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity>
  implements
    MaternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayRejectionWorkPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejectionWorkPeriodEarningsHistory(
    props: MaternityPayRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionWorkPeriodEarningsHistoryEntity,
      MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllMaternityPayRejectionWorkPeriodEarningsHistoryByMaternityPayRejectionWorkPeriodId(
    id: MaternityPayRejectionWorkPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity,
        )
        .softDelete({
          maternityPayRejectionWorkPeriod: { id: id.toString() },
        });
    };
  }
}
