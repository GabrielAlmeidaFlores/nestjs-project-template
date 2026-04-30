import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period-member/command/rural-or-hybrid-retirement-analysis-period-member.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/rural-or-hybrid-retirement-analysis-period-member.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/value-object/rural-or-hybrid-retirement-analysis-period-member-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisPeriodMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity>
  implements RuralOrHybridRetirementAnalysisPeriodMemberCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity)
    repository: Repository<RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisPeriodMember(
    props: RuralOrHybridRetirementAnalysisPeriodMemberEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisPeriodMember(
    id: RuralOrHybridRetirementAnalysisPeriodMemberId,
    props: RuralOrHybridRetirementAnalysisPeriodMemberEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisPeriodMember(
    id: RuralOrHybridRetirementAnalysisPeriodMemberId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisPeriodMemberEntity,
  ): RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity {
    return RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity.build({
      id: props.id.toString(),
      name: props.name,
      federalDocument: props.federalDocument,
      kinship: props.kinship,
      hasReceivedRuralBenefit: props.hasReceivedRuralBenefit,
      benefitNumber: props.benefitNumber,
      ruralOrHybridRetirementAnalysisPeriod:
        RuralOrHybridRetirementAnalysisPeriodTypeormEntity.build({
          id: props.ruralOrHybridRetirementAnalysisPeriodId.toString(),
        } as RuralOrHybridRetirementAnalysisPeriodTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity);
  }
}
