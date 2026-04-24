import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityDenialInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-inss-benefit/command/bpc-disability-denial-inss-benefit.command.repository.gateway';
import { BpcDisabilityDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/bpc-disability-denial-inss-benefit.entity';
import { BpcDisabilityDenialInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-inss-benefit/value-object/bpc-disability-denial-inss-benefit-id/bpc-disability-denial-inss-benefit-id.value-object';

@Injectable()
export class BpcDisabilityDenialInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityDenialInssBenefitTypeormEntity>
  implements BpcDisabilityDenialInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityDenialInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityDenialInssBenefitTypeormEntity)
    repository: Repository<BpcDisabilityDenialInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityDenialInssBenefit(
    props: BpcDisabilityDenialInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityDenialInssBenefitEntity,
      BpcDisabilityDenialInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcDisabilityDenialInssBenefit(
    id: BpcDisabilityDenialInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
