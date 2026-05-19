import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-result.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/command/accident-benefit-rejection.command.repository.gateway';
import { AccidentBenefitRejectionEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/accident-benefit-rejection.entity';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

@Injectable()
export class AccidentBenefitRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionTypeormEntity>
  implements AccidentBenefitRejectionCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionTypeormEntity)
    repository: Repository<AccidentBenefitRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejection(
    props: AccidentBenefitRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionEntity,
      AccidentBenefitRejectionTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAccidentBenefitRejection(
    id: AccidentBenefitRejectionId,
    props: AccidentBenefitRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionEntity,
      AccidentBenefitRejectionTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateAccidentBenefitRejectionResultId(
    id: AccidentBenefitRejectionId,
    resultId: AccidentBenefitRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      accidentBenefitRejectionResult:
        AccidentBenefitRejectionResultTypeormEntity.build({
          id: resultId.toString(),
        } as AccidentBenefitRejectionResultTypeormEntity),
    });
  }
}
