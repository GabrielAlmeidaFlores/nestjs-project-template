import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-legal-proceeding/command/bpc-disability-termination-legal-proceeding.command.repository.gateway';
import { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import { BpcDisabilityTerminationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/value-object/bpc-disability-termination-legal-proceeding-id/bpc-disability-termination-legal-proceeding-id.value-object';

@Injectable()
export class BpcDisabilityTerminationLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationLegalProceedingTypeormEntity>
  implements BpcDisabilityTerminationLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationLegalProceedingTypeormEntity)
    repository: Repository<BpcDisabilityTerminationLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationLegalProceeding(
    props: BpcDisabilityTerminationLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationLegalProceedingEntity,
      BpcDisabilityTerminationLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcDisabilityTerminationLegalProceeding(
    id: BpcDisabilityTerminationLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
