import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-institutor.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-institutor/command/death-benefit-rejection-institutor.command.repository.gateway';
import { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

@Injectable()
export class DeathBenefitRejectionInstitorTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionInstitorTypeormEntity>
  implements DeathBenefitRejectionInstitorCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionInstitorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionInstitorTypeormEntity)
    repository: Repository<DeathBenefitRejectionInstitorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionBenefitInstitutor(
    props: DeathBenefitRejectionInstitorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionInstitorEntity,
      DeathBenefitRejectionInstitorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitRejectionBenefitInstitutor(
    id: DeathBenefitRejectionInstitorId,
    props: DeathBenefitRejectionInstitorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionInstitorEntity,
      DeathBenefitRejectionInstitorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteDeathBenefitRejectionBenefitInstitutor(
    id: DeathBenefitRejectionInstitorId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
