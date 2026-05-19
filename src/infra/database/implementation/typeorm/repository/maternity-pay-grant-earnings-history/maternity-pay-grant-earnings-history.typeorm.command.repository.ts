import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-earnings-history/command/maternity-pay-grant-earnings-history.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

@Injectable()
export class MaternityPayGrantEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantEarningsHistoryTypeormEntity>
  implements MaternityPayGrantEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayGrantEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantEarningsHistoryTypeormEntity)
    repository: Repository<MaternityPayGrantEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrantEarningsHistory(
    props: MaternityPayGrantEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantEarningsHistoryEntity,
      MaternityPayGrantEarningsHistoryTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayGrantEarningsHistoryTypeormEntity)
        .softDelete({
          maternityPayGrant: { id: maternityPayGrantId.toString() },
        });
    };
  }

  public deleteAllByMaternityPayGrantPeriodId(
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayGrantEarningsHistoryTypeormEntity)
        .softDelete({
          maternityPayGrantPeriod: {
            id: maternityPayGrantPeriodId.toString(),
          },
        });
    };
  }
}
