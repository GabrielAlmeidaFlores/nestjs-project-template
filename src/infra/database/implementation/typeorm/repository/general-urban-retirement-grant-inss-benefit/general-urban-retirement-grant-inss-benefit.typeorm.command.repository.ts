import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-inss-benefit/command/general-urban-retirement-grant-inss-benefit.command.repository.gateway';
import { GeneralUrbanRetirementGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity';

@Injectable()
export class GeneralUrbanRetirementGrantInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementGrantInssBenefitTypeormEntity>
  implements GeneralUrbanRetirementGrantInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantInssBenefitTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementGrantInssBenefit(
    props: GeneralUrbanRetirementGrantInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementGrantInssBenefitEntity,
      GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
