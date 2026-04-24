import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionEventDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionEventDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-event-document/command/accident-benefit-rejection-event-document.command.repository.gateway';
import { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';
import { AccidentBenefitRejectionEventDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity';

@Injectable()
export class AccidentBenefitRejectionEventDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionEventDocumentTypeormEntity>
  implements AccidentBenefitRejectionEventDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionEventDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionEventDocumentTypeormEntity)
    repository: Repository<AccidentBenefitRejectionEventDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionEventDocument(
    props: AccidentBenefitRejectionEventDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionEventDocumentEntity,
      AccidentBenefitRejectionEventDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentBenefitRejectionEventDocumentByAccidentBenefitRejectionEventId(
    id: AccidentBenefitRejectionEventId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentBenefitRejectionEventDocumentTypeormEntity)
        .softDelete({
          accidentBenefitRejectionEvent: { id: id.toString() },
        });
    };
  }
}
