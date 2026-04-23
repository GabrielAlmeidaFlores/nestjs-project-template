import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-member.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member/command/rural-or-hybrid-retirement-rejection-period-member.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/rural-or-hybrid-retirement-rejection-period-member.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/value-object/rural-or-hybrid-retirement-rejection-period-member-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionPeriodMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity>
  implements
    RuralOrHybridRetirementRejectionPeriodMemberCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionPeriodMember(
    props: RuralOrHybridRetirementRejectionPeriodMemberEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejectionPeriodMember(
    id: RuralOrHybridRetirementRejectionPeriodMemberId,
    props: RuralOrHybridRetirementRejectionPeriodMemberEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionPeriodMember(
    id: RuralOrHybridRetirementRejectionPeriodMemberId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionPeriodMemberEntity,
  ): RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity {
    return RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity.build({
      id: props.id.toString(),
      name: props.name,
      federalDocument: props.federalDocument,
      kinship: props.kinship,
      hasReceivedRuralBenefit: props.hasReceivedRuralBenefit,
      benefitNumber: props.benefitNumber,
      ruralOrHybridRetirementRejectionPeriod:
        RuralOrHybridRetirementRejectionPeriodTypeormEntity.build({
          id: props.ruralOrHybridRetirementRejectionPeriodId.toString(),
        } as RuralOrHybridRetirementRejectionPeriodTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity);
  }
}
