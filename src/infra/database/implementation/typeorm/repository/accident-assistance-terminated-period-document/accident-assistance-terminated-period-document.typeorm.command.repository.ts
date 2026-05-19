import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentAssistanceTerminatedPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period-document/command/accident-assistance-terminated-period-document.command.repository.gateway';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import { AccidentAssistanceTerminatedPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/accident-assistance-terminated-period-document.entity';

@Injectable()
export class AccidentAssistanceTerminatedPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentAssistanceTerminatedPeriodDocumentTypeormEntity>
  implements AccidentAssistanceTerminatedPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AccidentAssistanceTerminatedPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentAssistanceTerminatedPeriodDocumentTypeormEntity)
    repository: Repository<AccidentAssistanceTerminatedPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentAssistanceTerminatedPeriodDocument(
    props: AccidentAssistanceTerminatedPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentAssistanceTerminatedPeriodDocumentEntity,
      AccidentAssistanceTerminatedPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentAssistanceTerminatedPeriodDocumentsByAccidentAssistanceTerminatedPeriodId(
    accidentAssistanceTerminatedPeriodId: AccidentAssistanceTerminatedPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentAssistanceTerminatedPeriodDocumentTypeormEntity)
        .softDelete({
          accidentAssistanceTerminatedPeriod: {
            id: accidentAssistanceTerminatedPeriodId.toString(),
          },
        });
    };
  }
}
