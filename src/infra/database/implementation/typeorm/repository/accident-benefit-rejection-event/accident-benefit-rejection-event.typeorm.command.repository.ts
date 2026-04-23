import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionEventCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-event/command/accident-benefit-rejection-event.command.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionEventEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity';

@Injectable()
export class AccidentBenefitRejectionEventTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionEventTypeormEntity>
  implements AccidentBenefitRejectionEventCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionEventTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionEventTypeormEntity)
    repository: Repository<AccidentBenefitRejectionEventTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionEvent(
    props: AccidentBenefitRejectionEventEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionEventEntity,
      AccidentBenefitRejectionEventTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentBenefitRejectionEventByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentBenefitRejectionEventTypeormEntity)
        .softDelete({
          accidentBenefitRejection: { id: id.toString() },
        });
    };
  }
}
