import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/command/accident-assistance-terminated-period.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedPeriodEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedPeriodTypeormEntity>
  implements AccidentAssistanceTerminatedPeriodCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedPeriodTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminatedPeriod(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedPeriodEntity,
      AccidentAssistanceTerminatedPeriodTypeormEntity,
    );

    mappedData.accidentAssistanceTerminated = {
      id: accidentAssistanceTerminatedId.toString(),
    } as AccidentAssistanceTerminatedTypeormEntity;

    return this.create(mappedData);
  }

  public updateAccidentAssistanceTerminatedPeriod(
    id: AccidentAssistanceTerminatedPeriodId,
    props: AccidentAssistanceTerminatedPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedPeriodEntity,
      AccidentAssistanceTerminatedPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAccidentAssistanceTerminatedPeriod(
    id: AccidentAssistanceTerminatedPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAccidentAssistanceTerminatedPeriodsByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceTerminatedPeriodTypeormEntity)
        .softDelete({
          accidentAssistanceTerminated: {
            id: accidentAssistanceTerminatedId.toString(),
          },
        });
    };
  }
}
