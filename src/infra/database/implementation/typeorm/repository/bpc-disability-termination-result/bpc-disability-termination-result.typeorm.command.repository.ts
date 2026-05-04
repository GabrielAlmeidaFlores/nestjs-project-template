import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-result.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-result/command/bpc-disability-termination-result.command.repository.gateway';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';
import { BpcDisabilityTerminationResultId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/value-object/bpc-disability-termination-result-id/bpc-disability-termination-result-id.value-object';

@Injectable()
export class BpcDisabilityTerminationResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationResultTypeormEntity>
  implements BpcDisabilityTerminationResultCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationResultTypeormEntity)
    repository: Repository<BpcDisabilityTerminationResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationResult(
    props: BpcDisabilityTerminationResultEntity,
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationResultEntity,
      BpcDisabilityTerminationResultTypeormEntity,
    );

    mappedData.bpcDisabilityTermination = {
      id: bpcDisabilityTerminationId.toString(),
    } as BpcDisabilityTerminationTypeormEntity;

    return this.create(mappedData);
  }

  public updateBpcDisabilityTerminationResult(
    id: BpcDisabilityTerminationResultId,
    props: BpcDisabilityTerminationResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationResultEntity,
      BpcDisabilityTerminationResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
