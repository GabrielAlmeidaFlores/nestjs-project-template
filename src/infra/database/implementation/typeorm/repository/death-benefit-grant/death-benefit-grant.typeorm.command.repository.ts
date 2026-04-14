import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-result.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/command/death-benefit-grant.command.repository.gateway';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

@Injectable()
export class DeathBenefitGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantTypeormEntity>
  implements DeathBenefitGrantCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantTypeormEntity)
    repository: Repository<DeathBenefitGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrant(
    props: DeathBenefitGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantEntity,
      DeathBenefitGrantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitGrant(
    id: DeathBenefitGrantId,
    props: DeathBenefitGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantEntity,
      DeathBenefitGrantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateDeathBenefitGrantResultId(
    id: DeathBenefitGrantId,
    resultId: DeathBenefitGrantResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      deathBenefitGrantResult: DeathBenefitGrantResultTypeormEntity.build({
        id: resultId.toString(),
      } as DeathBenefitGrantResultTypeormEntity),
    });
  }
}
