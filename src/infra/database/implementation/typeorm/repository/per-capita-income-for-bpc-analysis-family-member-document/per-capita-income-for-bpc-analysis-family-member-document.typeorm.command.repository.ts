import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-family-member-document/command/per-capita-income-for-bpc-analysis-family-member-document.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/per-capita-income-for-bpc-analysis-family-member-document.entity';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity>
  implements
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
    )
    repository: Repository<PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPerCapitaIncomeForBpcAnalysisFamilyMemberDocument(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity,
      PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyPerCapitaIncomeForBpcAnalysisFamilyMemberDocument(
    props: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createPerCapitaIncomeForBpcAnalysisFamilyMemberDocument(item),
    );
  }
}
