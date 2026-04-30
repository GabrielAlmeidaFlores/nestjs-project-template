import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-result/command/temporary-incapacity-benefit-termination-result.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationResultTypeormEntity>
  implements TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryIncapacityBenefitTerminationResultTypeormEntity)
    repository: Repository<TemporaryIncapacityBenefitTerminationResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationResult(
    props: TemporaryIncapacityBenefitTerminationResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationResultEntity,
      TemporaryIncapacityBenefitTerminationResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryIncapacityBenefitTerminationResult(
    props: TemporaryIncapacityBenefitTerminationResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationResultEntity,
      TemporaryIncapacityBenefitTerminationResultTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }
}
