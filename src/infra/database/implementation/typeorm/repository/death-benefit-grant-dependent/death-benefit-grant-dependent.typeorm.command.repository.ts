import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantDependentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-dependent/command/death-benefit-grant-dependent.command.repository.gateway';
import { DeathBenefitGrantDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/death-benefit-grant-dependent.entity';

@Injectable()
export class DeathBenefitGrantDependentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantDependentTypeormEntity>
  implements DeathBenefitGrantDependentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantDependentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantDependentTypeormEntity)
    repository: Repository<DeathBenefitGrantDependentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantDependent(
    props: DeathBenefitGrantDependentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantDependentEntity,
      DeathBenefitGrantDependentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
