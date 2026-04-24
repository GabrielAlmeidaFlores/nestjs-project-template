import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-document/command/accident-benefit-rejection-document.command.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity';

@Injectable()
export class AccidentBenefitRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionDocumentTypeormEntity>
  implements AccidentBenefitRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionDocumentTypeormEntity)
    repository: Repository<AccidentBenefitRejectionDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionDocument(
    props: AccidentBenefitRejectionDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionDocumentEntity,
      AccidentBenefitRejectionDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentBenefitRejectionDocumentByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentBenefitRejectionDocumentTypeormEntity)
        .softDelete({
          accidentBenefitRejection: { id: id.toString() },
        });
    };
  }
}
