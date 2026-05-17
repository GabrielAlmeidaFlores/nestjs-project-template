import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AnalysisToolClientCadastralFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-cadastral-form.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientCadastralFormCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/command/analysis-tool-client-cadastral-form.command.repository.gateway';
import { AnalysisToolClientCadastralFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/analysis-tool-client-cadastral-form.entity';
import { AnalysisToolClientCadastralFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/value-object/analysis-tool-client-cadastral-form-id/analysis-tool-client-cadastral-form-id.value-object';

@Injectable()
export class AnalysisToolClientCadastralFormTypeormCommandRepository
  extends BaseTypeormCommandRepository<AnalysisToolClientCadastralFormTypeormEntity>
  implements AnalysisToolClientCadastralFormCommandRepositoryGateway
{
  protected readonly _type = AnalysisToolClientCadastralFormTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientCadastralFormTypeormEntity)
    repository: Repository<AnalysisToolClientCadastralFormTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAnalysisToolClientCadastralForm(
    props: AnalysisToolClientCadastralFormEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientCadastralFormEntity,
      AnalysisToolClientCadastralFormTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateAnalysisToolClientCadastralForm(
    id: AnalysisToolClientCadastralFormId,
    props: AnalysisToolClientCadastralFormEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientCadastralFormEntity,
      AnalysisToolClientCadastralFormTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
