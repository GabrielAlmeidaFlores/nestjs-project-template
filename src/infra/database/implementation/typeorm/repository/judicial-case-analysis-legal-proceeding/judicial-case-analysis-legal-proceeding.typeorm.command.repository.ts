import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { JudicialCaseAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-legal-proceeding/command/judicial-case-analysis-legal-proceeding.command.repository.gateway';
import { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';

@Injectable()
export class JudicialCaseAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<JudicialCaseAnalysisLegalProceedingTypeormEntity>
  implements JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    JudicialCaseAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(JudicialCaseAnalysisLegalProceedingTypeormEntity)
    repository: Repository<JudicialCaseAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteJudicialCaseAnalysisLegalProceeding(
    id: JudicialCaseAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createJudicialCaseAnalysisLegalProceeding(
    props: JudicialCaseAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JudicialCaseAnalysisLegalProceedingEntity,
      JudicialCaseAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
