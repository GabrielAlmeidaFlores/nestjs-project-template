import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant-document/command/accident-assistance-grant-document.command.repository.gateway';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity';
import { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';

@Injectable()
export class AccidentAssistanceGrantDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceGrantDocumentTypeormEntity>
  implements AccidentAssistanceGrantDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceGrantDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceGrantDocumentTypeormEntity)
    repository: Repository<AccidentAssistanceGrantDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceGrantDocument(
    props: AccidentAssistanceGrantDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceGrantDocumentEntity,
      AccidentAssistanceGrantDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentAssistanceGrantDocumentByAccidentAssistanceGrantId(
    id: AccidentAssistanceGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceGrantDocumentTypeormEntity)
        .softDelete({
          accidentAssistanceGrant: { id: id.toString() },
        });
    };
  }

  public deleteAccidentAssistanceGrantDocumentByAccidentAssistanceGrantIdAndType(
    id: AccidentAssistanceGrantId,
    type: AccidentAssistanceGrantDocumentTypeEnum,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceGrantDocumentTypeormEntity)
        .softDelete({
          accidentAssistanceGrant: { id: id.toString() },
          type,
        });
    };
  }
}
