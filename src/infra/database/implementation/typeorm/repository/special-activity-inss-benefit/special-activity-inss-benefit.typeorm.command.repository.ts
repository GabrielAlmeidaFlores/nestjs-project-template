import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialActivityInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import { SpecialActivityInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/value-object/special-activity-inss-benefit-id.value-object';
import { SpecialActivityInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-inss-benefit/command/special-activity-inss-benefit.command.repository.gateway';

@Injectable()
export class SpecialActivityInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialActivityInssBenefitTypeormEntity>
  implements SpecialActivityInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    SpecialActivityInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialActivityInssBenefitTypeormEntity)
    repository: Repository<SpecialActivityInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteSpecialActivityInssBenefit(
    id: SpecialActivityInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createSpecialActivityInssBenefit(
    props: SpecialActivityInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialActivityInssBenefitEntity,
      SpecialActivityInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
