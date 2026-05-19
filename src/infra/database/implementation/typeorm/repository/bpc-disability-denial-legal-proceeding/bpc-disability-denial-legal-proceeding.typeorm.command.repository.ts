import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityDenialLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityDenialLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-legal-proceeding/command/bpc-disability-denial-legal-proceeding.command.repository.gateway';
import { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import { BpcDisabilityDenialLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/value-object/bpc-disability-denial-legal-proceeding-id/bpc-disability-denial-legal-proceeding-id.value-object';

@Injectable()
export class BpcDisabilityDenialLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityDenialLegalProceedingTypeormEntity>
  implements BpcDisabilityDenialLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityDenialLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialLegalProceedingTypeormEntity)
    repository: Repository<BpcDisabilityDenialLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityDenialLegalProceeding(
    props: BpcDisabilityDenialLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialLegalProceedingEntity,
      BpcDisabilityDenialLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcDisabilityDenialLegalProceeding(
    id: BpcDisabilityDenialLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
