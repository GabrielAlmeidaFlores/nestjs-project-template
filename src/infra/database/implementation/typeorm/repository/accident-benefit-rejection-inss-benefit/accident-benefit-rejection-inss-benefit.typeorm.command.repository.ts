import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-inss-benefit/command/accident-benefit-rejection-inss-benefit.command.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity';

@Injectable()
export class AccidentBenefitRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionInssBenefitTypeormEntity>
  implements AccidentBenefitRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionInssBenefitTypeormEntity)
    repository: Repository<AccidentBenefitRejectionInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionInssBenefit(
    props: AccidentBenefitRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionInssBenefitEntity,
      AccidentBenefitRejectionInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentBenefitRejectionInssBenefitByAccidentBenefitRejectionId(
    id: AccidentBenefitRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentBenefitRejectionInssBenefitTypeormEntity)
        .softDelete({
          accidentBenefitRejection: { id: id.toString() },
        });
    };
  }
}
