import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-work-period/command/maternity-pay-rejection-work-period.command.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity';

@Injectable()
export class MaternityPayRejectionWorkPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionWorkPeriodTypeormEntity>
  implements MaternityPayRejectionWorkPeriodCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayRejectionWorkPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionWorkPeriodTypeormEntity)
    repository: Repository<MaternityPayRejectionWorkPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejectionWorkPeriod(
    props: MaternityPayRejectionWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionWorkPeriodEntity,
      MaternityPayRejectionWorkPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllMaternityPayRejectionWorkPeriodByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayRejectionWorkPeriodTypeormEntity)
        .softDelete({
          maternityPayRejection: { id: id.toString() },
        });
    };
  }
}
