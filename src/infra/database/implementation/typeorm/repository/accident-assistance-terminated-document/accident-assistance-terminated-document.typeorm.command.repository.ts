import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-document/command/accident-assistance-terminated-document.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity';

@Injectable()
export class AccidentAssistanceTerminatedDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedDocumentTypeormEntity>
  implements AccidentAssistanceTerminatedDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedDocumentTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminatedDocument(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    props: AccidentAssistanceTerminatedDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedDocumentEntity,
      AccidentAssistanceTerminatedDocumentTypeormEntity,
    );

    mappedData.accidentAssistanceTerminated = {
      id: accidentAssistanceTerminatedId.toString(),
    } as AccidentAssistanceTerminatedTypeormEntity;

    return this.create(mappedData);
  }

  public deleteAccidentAssistanceTerminatedDocumentByAccidentAssistanceTerminatedId(
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceTerminatedDocumentTypeormEntity)
        .softDelete({
          accidentAssistanceTerminated: {
            id: accidentAssistanceTerminatedId.toString(),
          },
        });
    };
  }
}
