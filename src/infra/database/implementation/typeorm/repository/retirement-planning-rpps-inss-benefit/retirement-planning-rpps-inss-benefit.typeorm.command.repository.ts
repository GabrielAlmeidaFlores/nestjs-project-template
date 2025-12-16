import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-inss-benefit/command/retirement-planning-rpps-inss-benefit.command.repository.gateway';
import { RetirementPlanningRppsInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.entity';
import { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';

@Injectable()
export class RetirementPlanningRppsInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsInssBenefitTypeormEntity>
  implements RetirementPlanningRppsInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsInssBenefitTypeormEntity)
    repository: Repository<RetirementPlanningRppsInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteRetirementPlanningRppsInssBenefit(
    id: RetirementPlanningRppsInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createRetirementPlanningRppsInssBenefit(
    props: RetirementPlanningRppsInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsInssBenefitEntity,
      RetirementPlanningRppsInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
