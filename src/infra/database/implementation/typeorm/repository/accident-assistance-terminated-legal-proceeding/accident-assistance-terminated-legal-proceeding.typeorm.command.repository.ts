import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-legal-proceeding.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-legal-proceeding/command/accident-assistance-terminated-legal-proceeding.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedLegalProceedingEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity';

@Injectable()
export class AccidentAssistanceTerminatedLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedLegalProceedingTypeormEntity>
  implements AccidentAssistanceTerminatedLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedLegalProceedingTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminatedLegalProceeding(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedLegalProceedingEntity,
      AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
    );

    mappedData.accidentAssistanceTerminated = {
      id: accidentAssistanceTerminatedId.toString(),
    } as AccidentAssistanceTerminatedTypeormEntity;

    return this.create(mappedData);
  }

  public deleteAccidentAssistanceTerminatedLegalProceedingByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceTerminatedLegalProceedingTypeormEntity)
        .softDelete({
          accidentAssistanceTerminated: {
            id: accidentAssistanceTerminatedId.toString(),
          },
        });
    };
  }
}
