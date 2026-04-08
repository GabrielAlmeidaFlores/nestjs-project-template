import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitDependentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-dependent/command/death-benefit-dependent.command.repository.gateway';
import { DeathBenefitDependentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/death-benefit-dependent.entity';

@Injectable()
export class DeathBenefitDependentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitDependentTypeormEntity>
  implements DeathBenefitDependentCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitDependentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitDependentTypeormEntity)
    repository: Repository<DeathBenefitDependentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitDependent(props: DeathBenefitDependentEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitDependentEntity,
      DeathBenefitDependentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
