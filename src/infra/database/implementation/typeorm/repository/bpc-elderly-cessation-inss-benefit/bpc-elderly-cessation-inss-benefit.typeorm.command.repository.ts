import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyCessationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyCessationInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-inss-benefit/command/bpc-elderly-cessation-inss-benefit.command.repository.gateway';
import { BpcElderlyCessationInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/bpc-elderly-cessation-inss-benefit.entity';
import { BpcElderlyCessationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/value-object/bpc-elderly-cessation-inss-benefit-id/bpc-elderly-cessation-inss-benefit-id.value-object';

@Injectable()
export class BpcElderlyCessationInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyCessationInssBenefitTypeormEntity>
  implements BpcElderlyCessationInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyCessationInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyCessationInssBenefitTypeormEntity)
    repository: Repository<BpcElderlyCessationInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyCessationInssBenefit(
    props: BpcElderlyCessationInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyCessationInssBenefitEntity,
      BpcElderlyCessationInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcElderlyCessationInssBenefit(
    id: BpcElderlyCessationInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
