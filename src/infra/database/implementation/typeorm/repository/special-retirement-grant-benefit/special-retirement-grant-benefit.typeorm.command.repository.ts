import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialRetirementGrantBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-benefit/command/special-retirement-grant-benefit.command.repository.gateway';
import { SpecialRetirementGrantBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantBenefitId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/value-object/special-retirement-grant-benefit-id/special-retirement-grant-benefit-id.value-object';

@Injectable()
export class SpecialRetirementGrantBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantBenefitTypeormEntity>
  implements SpecialRetirementGrantBenefitCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantBenefitTypeormEntity)
    repository: Repository<SpecialRetirementGrantBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantBenefit(
    props: SpecialRetirementGrantBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantBenefitEntity,
      SpecialRetirementGrantBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSpecialRetirementGrantBenefit(
    id: SpecialRetirementGrantBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
