import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { JudicialCaseAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-result/command/judicial-case-analysis-result.command.repository.gateway';
import { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';
import { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';

@Injectable()
export class JudicialCaseAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<JudicialCaseAnalysisResultTypeormEntity>
  implements JudicialCaseAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    JudicialCaseAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(JudicialCaseAnalysisResultTypeormEntity)
    repository: Repository<JudicialCaseAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateJudicialCaseAnalysisResult(
    id: JudicialCaseAnalysisResultId,
    props: JudicialCaseAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JudicialCaseAnalysisResultEntity,
      JudicialCaseAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createJudicialCaseAnalysisResult(
    props: JudicialCaseAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JudicialCaseAnalysisResultEntity,
      JudicialCaseAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
