import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/command/per-capita-income-for-bpc-analysis.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<PerCapitaIncomeForBpcAnalysisTypeormEntity>
  implements PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPerCapitaIncomeForBpcAnalysis(
    props: PerCapitaIncomeForBpcAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisEntity,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updatePerCapitaIncomeForBpcAnalysis(
    id: PerCapitaIncomeForBpcAnalysisId,
    props: PerCapitaIncomeForBpcAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisEntity,
      PerCapitaIncomeForBpcAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deletePerCapitaIncomeForBpcAnalysis(
    id: PerCapitaIncomeForBpcAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
