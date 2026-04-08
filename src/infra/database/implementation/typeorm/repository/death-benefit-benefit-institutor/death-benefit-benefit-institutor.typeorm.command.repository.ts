import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitBenefitInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-benefit-institutor.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitBenefitInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-benefit-institutor/command/death-benefit-benefit-institutor.command.repository.gateway';
import { DeathBenefitBenefitInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/death-benefit-benefit-institutor.entity';
import { DeathBenefitBenefitInstitorId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/value-object/death-benefit-benefit-institutor-id.value-object';

@Injectable()
export class DeathBenefitBenefitInstitorTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitBenefitInstitorTypeormEntity>
  implements DeathBenefitBenefitInstitorCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitBenefitInstitorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitBenefitInstitorTypeormEntity)
    repository: Repository<DeathBenefitBenefitInstitorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitBenefitInstitutor(props: DeathBenefitBenefitInstitorEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitBenefitInstitorEntity,
      DeathBenefitBenefitInstitorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitBenefitInstitutor(
    id: DeathBenefitBenefitInstitorId,
    props: DeathBenefitBenefitInstitorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitBenefitInstitorEntity,
      DeathBenefitBenefitInstitorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
