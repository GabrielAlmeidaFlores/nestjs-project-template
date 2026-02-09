import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/result/get-per-capita-income-for-bpc-analysis-family-member.query.result';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member/query/per-capita-income-for-bpc-analysis-family-member.query.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormQueryRepository
  extends BaseTypeormQueryRepository<PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity>
  implements PerCapitaIncomeForBpcAnalysisFamilyMemberQueryRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findByPerCapitaIncomeForBpcAnalysisId(
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult[]> {
    const data = await this.repository.find({
      where: {
        perCapitaIncomeForBpcAnalysis: {
          id: perCapitaIncomeForBpcAnalysisId.toString(),
        },
      },
      relations: {
        perCapitaIncomeForBpcAnalysis: true,
        perCapitaIncomeForBpcAnalysisFamilyMemberDocument: true,
      },
    });

    return this.mapperGateway.mapArray(
      data,
      PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
      GetPerCapitaIncomeForBpcAnalysisFamilyMemberQueryResult,
    );
  }
}
