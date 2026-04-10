import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-institutor.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantInstitorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-institutor/command/death-benefit-grant-institutor.command.repository.gateway';
import { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

@Injectable()
export class DeathBenefitGrantInstitorTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantInstitorTypeormEntity>
  implements DeathBenefitGrantInstitorCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantInstitorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantInstitorTypeormEntity)
    repository: Repository<DeathBenefitGrantInstitorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantBenefitInstitutor(
    props: DeathBenefitGrantInstitorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantInstitorEntity,
      DeathBenefitGrantInstitorTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitGrantBenefitInstitutor(
    id: DeathBenefitGrantInstitorId,
    props: DeathBenefitGrantInstitorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantInstitorEntity,
      DeathBenefitGrantInstitorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteDeathBenefitGrantBenefitInstitutor(
    id: DeathBenefitGrantInstitorId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
