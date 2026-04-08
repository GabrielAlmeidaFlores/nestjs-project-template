import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-result/command/death-benefit-result.command.repository.gateway';
import { DeathBenefitResultEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/death-benefit-result.entity';
import { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

@Injectable()
export class DeathBenefitResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitResultTypeormEntity>
  implements DeathBenefitResultCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitResultTypeormEntity)
    repository: Repository<DeathBenefitResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitResult(props: DeathBenefitResultEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitResultEntity,
      DeathBenefitResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitResult(
    id: DeathBenefitResultId,
    props: DeathBenefitResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitResultEntity,
      DeathBenefitResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
