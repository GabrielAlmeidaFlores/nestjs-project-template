import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AnalysisToolClientInterviewFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-interview-form.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientInterviewFormCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/command/analysis-tool-client-interview-form.command.repository.gateway';
import { AnalysisToolClientInterviewFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/analysis-tool-client-interview-form.entity';
import { AnalysisToolClientInterviewFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/value-object/analysis-tool-client-interview-form-id/analysis-tool-client-interview-form-id.value-object';

@Injectable()
export class AnalysisToolClientInterviewFormTypeormCommandRepository
  extends BaseTypeormCommandRepository<AnalysisToolClientInterviewFormTypeormEntity>
  implements AnalysisToolClientInterviewFormCommandRepositoryGateway
{
  protected readonly _type = AnalysisToolClientInterviewFormTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientInterviewFormTypeormEntity)
    repository: Repository<AnalysisToolClientInterviewFormTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAnalysisToolClientInterviewForm(
    props: AnalysisToolClientInterviewFormEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientInterviewFormEntity,
      AnalysisToolClientInterviewFormTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateAnalysisToolClientInterviewForm(
    id: AnalysisToolClientInterviewFormId,
    props: AnalysisToolClientInterviewFormEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientInterviewFormEntity,
      AnalysisToolClientInterviewFormTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
