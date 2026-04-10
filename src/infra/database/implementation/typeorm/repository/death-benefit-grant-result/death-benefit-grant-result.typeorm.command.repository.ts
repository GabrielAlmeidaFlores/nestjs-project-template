import { DeathBenefitGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-result.typeorm.entity';
import { DeathBenefitGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-result/command/death-benefit-grant-result.command.repository.gateway';
import { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';
import { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MapperGateway } from '@lib/mapper/mapper.gateway';

@Injectable()
export class DeathBenefitGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantResultTypeormEntity>
  implements DeathBenefitGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantResultTypeormEntity)
    repository: Repository<DeathBenefitGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantResult(
    props: DeathBenefitGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantResultEntity,
      DeathBenefitGrantResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitGrantResult(
    id: DeathBenefitGrantResultId,
    props: DeathBenefitGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantResultEntity,
      DeathBenefitGrantResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
