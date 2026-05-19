import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-result/command/temporary-incapacity-benefit-rejection-result.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionResultTypeormEntity>
  implements TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryIncapacityBenefitRejectionResultTypeormEntity)
    repository: Repository<TemporaryIncapacityBenefitRejectionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionResult(
    props: TemporaryIncapacityBenefitRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionResultEntity,
      TemporaryIncapacityBenefitRejectionResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryIncapacityBenefitRejectionResult(
    props: TemporaryIncapacityBenefitRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionResultEntity,
      TemporaryIncapacityBenefitRejectionResultTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }
}
