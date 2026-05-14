import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-inss-benefit/command/bpc-disability-grant-inss-benefit.command.repository.gateway';
import { BpcDisabilityGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/bpc-disability-grant-inss-benefit.entity';
import { BpcDisabilityGrantInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-inss-benefit/value-object/bpc-disability-grant-inss-benefit-id/bpc-disability-grant-inss-benefit-id.value-object';

@Injectable()
export class BpcDisabilityGrantInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantInssBenefitTypeormEntity>
  implements BpcDisabilityGrantInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityGrantInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantInssBenefitTypeormEntity)
    repository: Repository<BpcDisabilityGrantInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrantInssBenefit(
    props: BpcDisabilityGrantInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantInssBenefitEntity,
      BpcDisabilityGrantInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcDisabilityGrantInssBenefit(
    id: BpcDisabilityGrantInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
