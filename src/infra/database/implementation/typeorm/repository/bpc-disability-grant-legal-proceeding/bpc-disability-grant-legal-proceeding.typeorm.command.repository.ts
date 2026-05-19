import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-legal-proceeding/command/bpc-disability-grant-legal-proceeding.command.repository.gateway';
import { BpcDisabilityGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity';
import { BpcDisabilityGrantLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/value-object/bpc-disability-grant-legal-proceeding-id/bpc-disability-grant-legal-proceeding-id.value-object';

@Injectable()
export class BpcDisabilityGrantLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantLegalProceedingTypeormEntity>
  implements BpcDisabilityGrantLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityGrantLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantLegalProceedingTypeormEntity)
    repository: Repository<BpcDisabilityGrantLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrantLegalProceeding(
    props: BpcDisabilityGrantLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantLegalProceedingEntity,
      BpcDisabilityGrantLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcDisabilityGrantLegalProceeding(
    id: BpcDisabilityGrantLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
