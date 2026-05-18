import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/command/maternity-pay-grant-period.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

@Injectable()
export class MaternityPayGrantPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantPeriodTypeormEntity>
  implements MaternityPayGrantPeriodCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayGrantPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantPeriodTypeormEntity)
    repository: Repository<MaternityPayGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrantPeriod(
    props: MaternityPayGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantPeriodEntity,
      MaternityPayGrantPeriodTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateMaternityPayGrantPeriod(
    id: MaternityPayGrantPeriodId,
    props: MaternityPayGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantPeriodEntity,
      MaternityPayGrantPeriodTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public deleteMaternityPayGrantPeriod(
    id: MaternityPayGrantPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayGrantPeriodTypeormEntity)
        .softDelete({
          maternityPayGrant: { id: maternityPayGrantId.toString() },
        });
    };
  }
}
