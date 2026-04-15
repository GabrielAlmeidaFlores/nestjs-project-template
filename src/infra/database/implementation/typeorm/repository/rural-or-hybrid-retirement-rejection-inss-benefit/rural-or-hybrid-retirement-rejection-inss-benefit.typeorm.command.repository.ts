import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-inss-benefit/command/rural-or-hybrid-retirement-rejection-inss-benefit.command.repository.gateway';
import { RuralOrHybridRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/rural-or-hybrid-retirement-rejection-inss-benefit.entity';
import { RuralOrHybridRetirementRejectionInssBenefitId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/value-object/rural-or-hybrid-retirement-rejection-inss-benefit-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionInssBenefitTypeormEntity>
  implements RuralOrHybridRetirementRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionInssBenefitTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionInssBenefitTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionInssBenefit(
    props: RuralOrHybridRetirementRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = RuralOrHybridRetirementRejectionInssBenefitTypeormEntity.build(
      {
        id: props.id.toString(),
        inssBenefit: props.inssBenefit,
        ruralOrHybridRetirementRejection:
          RuralOrHybridRetirementRejectionTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionId.toString(),
          } as RuralOrHybridRetirementRejectionTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionInssBenefit(
    id: RuralOrHybridRetirementRejectionInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
