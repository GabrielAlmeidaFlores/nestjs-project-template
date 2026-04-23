import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-work-period/command/accident-benefit-rejection-work-period.command.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity';

@Injectable()
export class AccidentBenefitRejectionWorkPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionWorkPeriodTypeormEntity>
  implements AccidentBenefitRejectionWorkPeriodCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionWorkPeriodTypeormEntity)
    repository: Repository<AccidentBenefitRejectionWorkPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionWorkPeriod(
    props: AccidentBenefitRejectionWorkPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionWorkPeriodEntity,
      AccidentBenefitRejectionWorkPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentBenefitRejectionWorkPeriodByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentBenefitRejectionWorkPeriodTypeormEntity)
        .softDelete({
          accidentBenefitRejection: { id: id.toString() },
        });
    };
  }
}
