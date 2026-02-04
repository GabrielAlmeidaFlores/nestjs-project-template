import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member/command/per-capita-income-for-bpc-analysis-family-member.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/per-capita-income-for-bpc-analysis-family-member.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/value-object/per-capita-income-for-bpc-analysis-family-member-id/per-capita-income-for-bpc-analysis-family-member-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormCommandRepository
  extends BaseTypeormCommandRepository<PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity>
  implements PerCapitaIncomeForBpcAnalysisFamilyMemberCommandRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPerCapitaIncomeForBpcAnalysisFamilyMember(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisFamilyMemberEntity,
      PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyPerCapitaIncomeForBpcAnalysisFamilyMember(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createPerCapitaIncomeForBpcAnalysisFamilyMember(item),
    );
  }

  public deletePerCapitaIncomeForBpcAnalysisFamilyMember(
    id: PerCapitaIncomeForBpcAnalysisFamilyMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
    });
  }
}
