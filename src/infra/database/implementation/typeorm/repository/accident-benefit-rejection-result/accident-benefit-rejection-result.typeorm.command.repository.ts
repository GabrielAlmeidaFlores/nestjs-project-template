import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-result/command/accident-benefit-rejection-result.command.repository.gateway';
import { AccidentBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity';

@Injectable()
export class AccidentBenefitRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionResultTypeormEntity>
  implements AccidentBenefitRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionResultTypeormEntity)
    repository: Repository<AccidentBenefitRejectionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionResult(
    props: AccidentBenefitRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionResultEntity,
      AccidentBenefitRejectionResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAccidentBenefitRejectionResult(
    props: AccidentBenefitRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionResultEntity,
      AccidentBenefitRejectionResultTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }
}
