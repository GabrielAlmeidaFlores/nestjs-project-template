import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyCessationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-result.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyCessationResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-result/command/bpc-elderly-cessation-result.command.repository.gateway';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';

@Injectable()
export class BpcElderlyCessationResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyCessationResultTypeormEntity>
  implements BpcElderlyCessationResultCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyCessationResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationResultTypeormEntity)
    repository: Repository<BpcElderlyCessationResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyCessationResult(
    props: BpcElderlyCessationResultEntity,
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationResultEntity,
      BpcElderlyCessationResultTypeormEntity,
    );

    mappedData.bpcElderlyCessation = {
      id: bpcElderlyCessationId.toString(),
    } as BpcElderlyCessationTypeormEntity;

    return this.create(mappedData);
  }

  public updateBpcElderlyCessationResult(
    id: BpcElderlyCessationResultId,
    props: BpcElderlyCessationResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationResultEntity,
      BpcElderlyCessationResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
