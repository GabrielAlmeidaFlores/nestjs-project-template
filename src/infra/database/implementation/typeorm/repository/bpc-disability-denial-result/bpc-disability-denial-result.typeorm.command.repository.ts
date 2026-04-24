import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-result.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityDenialResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-result/command/bpc-disability-denial-result.command.repository.gateway';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';

@Injectable()
export class BpcDisabilityDenialResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityDenialResultTypeormEntity>
  implements BpcDisabilityDenialResultCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityDenialResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialResultTypeormEntity)
    repository: Repository<BpcDisabilityDenialResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityDenialResult(
    props: BpcDisabilityDenialResultEntity,
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialResultEntity,
      BpcDisabilityDenialResultTypeormEntity,
    );

    mappedData.bpcDisabilityDenial = {
      id: bpcDisabilityDenialId.toString(),
    } as BpcDisabilityDenialTypeormEntity;

    return this.create(mappedData);
  }

  public updateBpcDisabilityDenialResult(
    id: BpcDisabilityDenialResultId,
    props: BpcDisabilityDenialResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialResultEntity,
      BpcDisabilityDenialResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
