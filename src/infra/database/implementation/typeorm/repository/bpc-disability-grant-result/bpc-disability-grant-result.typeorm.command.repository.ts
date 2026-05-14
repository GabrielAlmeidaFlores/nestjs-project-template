import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-result.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-result/command/bpc-disability-grant-result.command.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';
import { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';

@Injectable()
export class BpcDisabilityGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantResultTypeormEntity>
  implements BpcDisabilityGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantResultTypeormEntity)
    repository: Repository<BpcDisabilityGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrantResult(
    props: BpcDisabilityGrantResultEntity,
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantResultEntity,
      BpcDisabilityGrantResultTypeormEntity,
    );

    mappedData.BpcDisabilityGrant = {
      id: bpcDisabilityGrantId.toString(),
    } as BpcDisabilityGrantTypeormEntity;

    return this.create(mappedData);
  }

  public updateBpcDisabilityGrantResult(
    id: BpcDisabilityGrantResultId,
    props: BpcDisabilityGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantResultEntity,
      BpcDisabilityGrantResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
