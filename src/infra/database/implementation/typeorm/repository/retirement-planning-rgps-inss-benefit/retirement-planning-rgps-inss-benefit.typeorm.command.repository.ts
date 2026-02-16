import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-inss-benefit/command/retirement-planning-rgps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRgpsInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-benefit/retirement-planning-rgps-inss-benefit.entity';

@Injectable()
export class RetirementPlanningRgpsInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsInssBenefitTypeormEntity>
  implements RetirementPlanningRgpsInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsInssBenefitTypeormEntity)
    repository: Repository<RetirementPlanningRgpsInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPlanningRgpsInssBenefit(
    props: RetirementPlanningRgpsInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsInssBenefitEntity,
      RetirementPlanningRgpsInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
