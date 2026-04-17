import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-work-period-earnings-history/command/accident-benefit-rejection-work-period-earnings-history.command.repository.gateway';
import { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';

@Injectable()
export class AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity>
  implements AccidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
    )
    repository: Repository<AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionWorkPeriodEarningsHistory(
    props: AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity,
      AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentBenefitRejectionWorkPeriodEarningsHistoryByAccidentBenefitRejectionWorkPeriodId(
    id: AccidentBenefitRejectionWorkPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          AccidentBenefitRejectionWorkPeriodEarningsHistoryTypeormEntity,
        )
        .softDelete({
          accidentBenefitRejectionWorkPeriod: { id: id.toString() },
        });
    };
  }
}
