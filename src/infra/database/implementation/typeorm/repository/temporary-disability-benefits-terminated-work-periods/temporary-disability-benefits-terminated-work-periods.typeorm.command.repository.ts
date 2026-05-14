import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-periods/command/temporary-disability-benefits-terminated-work-periods.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedWorkPeriods(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryDisabilityBenefitsTerminatedId(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
        )
        .softDelete({
          temporaryDisabilityBenefitsTerminated: {
            id: temporaryDisabilityBenefitsTerminatedId.toString(),
          },
        });
    };
  }

  public updateEndDateAndClearPendency(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
    endDate: Date,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
        )
        .update(id.toString(), {
          endDate,
          isPendency: false,
          pendencyReason: null,
        });
    };
  }

  public softDeleteById(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
        )
        .softDelete(id.toString());
    };
  }
}
