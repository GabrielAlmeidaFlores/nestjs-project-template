import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-periods-earnings-history/command/temporary-disability-benefits-terminated-work-periods-earnings-history.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history.entity';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistory(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity,
        )
        .softDelete({
          temporaryDisabilityBenefitsTerminatedWorkPeriods: {
            id: id.toString(),
          },
        });
    };
  }
}
