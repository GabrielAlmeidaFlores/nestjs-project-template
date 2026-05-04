import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-inss-benefit/command/bpc-disability-termination-inss-benefit.command.repository.gateway';
import { BpcDisabilityTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/bpc-disability-termination-inss-benefit.entity';
import { BpcDisabilityTerminationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/value-object/bpc-disability-termination-inss-benefit-id/bpc-disability-termination-inss-benefit-id.value-object';

@Injectable()
export class BpcDisabilityTerminationInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationInssBenefitTypeormEntity>
  implements BpcDisabilityTerminationInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationInssBenefitTypeormEntity)
    repository: Repository<BpcDisabilityTerminationInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationInssBenefit(
    props: BpcDisabilityTerminationInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationInssBenefitEntity,
      BpcDisabilityTerminationInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcDisabilityTerminationInssBenefit(
    id: BpcDisabilityTerminationInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
