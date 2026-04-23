import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-result/command/accident-assistance-terminated-result.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedResultTypeormEntity>
  implements AccidentAssistanceTerminatedResultCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedResultTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminatedResult(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedResultEntity,
      AccidentAssistanceTerminatedResultTypeormEntity,
    );

    mappedData.accidentAssistanceTerminated = {
      id: accidentAssistanceTerminatedId.toString(),
    } as AccidentAssistanceTerminatedTypeormEntity;

    return this.create(mappedData);
  }

  public updateAccidentAssistanceTerminatedResult(
    id: AccidentAssistanceTerminatedResultId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedResultEntity,
      AccidentAssistanceTerminatedResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateAccidentAssistanceTerminatedResultDecisionDetails(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedResultEntity,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = (executor as { manager: import('typeorm').EntityManager })
        .manager;
      await manager
        .getRepository(AccidentAssistanceTerminatedResultTypeormEntity)
        .update(
          {
            accidentAssistanceTerminated: {
              id: accidentAssistanceTerminatedId.toString(),
            },
          },
          { decisionDetails: props.decisionDetails },
        );
    };
  }
}
