import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionDependentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-dependent/command/death-benefit-rejection-dependent.command.repository.gateway';
import { DeathBenefitRejectionDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/death-benefit-rejection-dependent.entity';
import { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';

@Injectable()
export class DeathBenefitRejectionDependentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionDependentTypeormEntity>
  implements DeathBenefitRejectionDependentCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionDependentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionDependentTypeormEntity)
    repository: Repository<DeathBenefitRejectionDependentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionDependent(
    props: DeathBenefitRejectionDependentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionDependentEntity,
      DeathBenefitRejectionDependentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteDeathBenefitRejectionDependent(
    id: DeathBenefitRejectionDependentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
