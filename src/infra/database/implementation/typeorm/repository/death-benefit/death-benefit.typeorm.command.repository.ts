import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-result.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/command/death-benefit.command.repository.gateway';
import { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';
import { DeathBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/death-benefit.entity';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

@Injectable()
export class DeathBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitTypeormEntity>
  implements DeathBenefitCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitTypeormEntity)
    repository: Repository<DeathBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefit(props: DeathBenefitEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitEntity,
      DeathBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefit(
    id: DeathBenefitId,
    props: DeathBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitEntity,
      DeathBenefitTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateDeathBenefitResultId(
    id: DeathBenefitId,
    resultId: DeathBenefitResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      deathBenefitResult: DeathBenefitResultTypeormEntity.build({
        id: resultId.toString(),
      } as DeathBenefitResultTypeormEntity),
    });
  }
}
