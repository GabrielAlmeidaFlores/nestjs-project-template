import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyAnalysisFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-family-member/command/bpc-elderly-analysis-family-member.command.repository.gateway';
import { BpcElderlyAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/bpc-elderly-analysis-family-member.entity';
import { BpcElderlyAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/value-object/bpc-elderly-analysis-family-member-id/bpc-elderly-analysis-family-member-id.value-object';

@Injectable()
export class BpcElderlyAnalysisFamilyMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyAnalysisFamilyMemberTypeormEntity>
  implements BpcElderlyAnalysisFamilyMemberCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyAnalysisFamilyMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisFamilyMemberTypeormEntity)
    repository: Repository<BpcElderlyAnalysisFamilyMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyAnalysisFamilyMember(
    props: BpcElderlyAnalysisFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisFamilyMemberEntity,
      BpcElderlyAnalysisFamilyMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcElderlyAnalysisFamilyMember(
    bpcElderlyAnalysisFamilyMemberId: BpcElderlyAnalysisFamilyMemberId,
    props: BpcElderlyAnalysisFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisFamilyMemberEntity,
      BpcElderlyAnalysisFamilyMemberTypeormEntity,
    );

    return this.update(
      bpcElderlyAnalysisFamilyMemberId.toString(),
      mappedData,
    );
  }

  public deleteBpcElderlyAnalysisFamilyMember(
    bpcElderlyAnalysisFamilyMemberId: BpcElderlyAnalysisFamilyMemberId,
  ): TransactionType {
    return this.delete(
      bpcElderlyAnalysisFamilyMemberId.toString(),
    );
  }
}
