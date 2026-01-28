import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelinePeriodFamilyGroupMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-family-group-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelinePeriodFamilyGroupMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-period-family-group-member/command/rural-timeline-period-family-group-member.command.repository.gateway';
import { RuralTimelinePeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/rural-timeline-period-family-group-member.entity';
import { RuralTimelinePeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-family-group-member/value-object/rural-timeline-period-family-group-member-id/rural-timeline-period-family-group-member-id.value-object';

@Injectable()
export class RuralTimelinePeriodFamilyGroupMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelinePeriodFamilyGroupMemberTypeormEntity>
  implements RuralTimelinePeriodFamilyGroupMemberCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelinePeriodFamilyGroupMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelinePeriodFamilyGroupMemberTypeormEntity)
    repository: Repository<RuralTimelinePeriodFamilyGroupMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelinePeriodFamilyGroupMember(
    props: RuralTimelinePeriodFamilyGroupMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelinePeriodFamilyGroupMemberEntity,
      RuralTimelinePeriodFamilyGroupMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelinePeriodFamilyGroupMember(
    id: RuralTimelinePeriodFamilyGroupMemberId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
