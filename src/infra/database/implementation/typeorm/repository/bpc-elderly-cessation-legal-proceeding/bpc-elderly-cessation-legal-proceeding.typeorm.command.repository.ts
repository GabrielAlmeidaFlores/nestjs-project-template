import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyCessationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyCessationLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-legal-proceeding/command/bpc-elderly-cessation-legal-proceeding.command.repository.gateway';
import { BpcElderlyCessationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity';
import { BpcElderlyCessationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/value-object/bpc-elderly-cessation-legal-proceeding-id/bpc-elderly-cessation-legal-proceeding-id.value-object';

@Injectable()
export class BpcElderlyCessationLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyCessationLegalProceedingTypeormEntity>
  implements BpcElderlyCessationLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyCessationLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationLegalProceedingTypeormEntity)
    repository: Repository<BpcElderlyCessationLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyCessationLegalProceeding(
    props: BpcElderlyCessationLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationLegalProceedingEntity,
      BpcElderlyCessationLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcElderlyCessationLegalProceeding(
    id: BpcElderlyCessationLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
