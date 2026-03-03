import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-family-group-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/command/rural-timeline-analysis-period-family-group-member.command.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';

@Injectable()
export class RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity>
  implements
    RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity)
    repository: Repository<RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineAnalysisPeriodFamilyGroupMember(
    props: RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineAnalysisPeriodFamilyGroupMember(
    props: RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisPeriodFamilyGroupMemberEntity,
      RuralTimelineAnalysisPeriodFamilyGroupMemberTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineAnalysisPeriodFamilyGroupMember(
    id: RuralTimelineAnalysisPeriodFamilyGroupMemberId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
