import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-result.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/command/death-benefit-rejection.command.repository.gateway';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

@Injectable()
export class DeathBenefitRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionTypeormEntity>
  implements DeathBenefitRejectionCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionTypeormEntity)
    repository: Repository<DeathBenefitRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejection(
    props: DeathBenefitRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionEntity,
      DeathBenefitRejectionTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitRejection(
    id: DeathBenefitRejectionId,
    props: DeathBenefitRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionEntity,
      DeathBenefitRejectionTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateDeathBenefitRejectionResultId(
    id: DeathBenefitRejectionId,
    resultId: DeathBenefitRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      deathBenefitRejectionResult:
        DeathBenefitRejectionResultTypeormEntity.build({
          id: resultId.toString(),
        } as DeathBenefitRejectionResultTypeormEntity),
    });
  }
}
