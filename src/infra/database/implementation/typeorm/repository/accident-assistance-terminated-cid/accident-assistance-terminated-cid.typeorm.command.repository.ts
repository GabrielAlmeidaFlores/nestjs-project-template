import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-cid.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-cid/command/accident-assistance-terminated-cid.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedCidEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-cid/accident-assistance-terminated-cid.entity';

@Injectable()
export class AccidentAssistanceTerminatedCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedCidTypeormEntity>
  implements AccidentAssistanceTerminatedCidCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedCidTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedCidTypeormEntity>,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminatedCid(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedCidEntity,
  ): TransactionType {
    const entity = AccidentAssistanceTerminatedCidTypeormEntity.build({
      id: props.id.toString(),
      name: props.name,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    entity.accidentAssistanceTerminated = {
      id: accidentAssistanceTerminatedId.toString(),
    } as AccidentAssistanceTerminatedTypeormEntity;

    return this.create(entity);
  }

  public deleteAccidentAssistanceTerminatedCidByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceTerminatedCidTypeormEntity)
        .softDelete({
          accidentAssistanceTerminated: {
            id: accidentAssistanceTerminatedId.toString(),
          },
        });
    };
  }
}
