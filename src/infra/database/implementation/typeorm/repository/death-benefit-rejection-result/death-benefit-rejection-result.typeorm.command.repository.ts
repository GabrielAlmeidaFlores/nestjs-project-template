import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-result/command/death-benefit-rejection-result.command.repository.gateway';
import { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

@Injectable()
export class DeathBenefitRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionResultTypeormEntity>
  implements DeathBenefitRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionResultTypeormEntity)
    repository: Repository<DeathBenefitRejectionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionResult(
    props: DeathBenefitRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionResultEntity,
      DeathBenefitRejectionResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitRejectionResult(
    id: DeathBenefitRejectionResultId,
    props: DeathBenefitRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionResultEntity,
      DeathBenefitRejectionResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
