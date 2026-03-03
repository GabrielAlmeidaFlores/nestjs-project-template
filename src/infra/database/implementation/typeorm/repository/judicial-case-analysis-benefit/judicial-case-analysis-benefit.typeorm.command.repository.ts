import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { JudicialCaseAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { JudicialCaseAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-benefit/command/judicial-case-analysis-benefit.command.repository.gateway';
import { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';

@Injectable()
export class JudicialCaseAnalysisBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<JudicialCaseAnalysisBenefitTypeormEntity>
  implements JudicialCaseAnalysisBenefitCommandRepositoryGateway
{
  protected readonly _type =
    JudicialCaseAnalysisBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(JudicialCaseAnalysisBenefitTypeormEntity)
    repository: Repository<JudicialCaseAnalysisBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteJudicialCaseAnalysisBenefit(
    id: JudicialCaseAnalysisBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createJudicialCaseAnalysisBenefit(
    props: JudicialCaseAnalysisBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JudicialCaseAnalysisBenefitEntity,
      JudicialCaseAnalysisBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
