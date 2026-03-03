import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-result/command/administrative-procedure-inss-analysis-result.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisResultId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/value-object/administrative-procedure-inss-analysis-result-id/administrative-procedure-inss-analysis-result-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<AdministrativeProcedureInssAnalysisResultTypeormEntity>
  implements AdministrativeProcedureInssAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    AdministrativeProcedureInssAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AdministrativeProcedureInssAnalysisResultTypeormEntity)
    repository: Repository<AdministrativeProcedureInssAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateAdministrativeProcedureInssAnalysisResult(
    id: AdministrativeProcedureInssAnalysisResultId,
    props: AdministrativeProcedureInssAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeProcedureInssAnalysisResultEntity,
      AdministrativeProcedureInssAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createAdministrativeProcedureInssAnalysisResult(
    props: AdministrativeProcedureInssAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeProcedureInssAnalysisResultEntity,
      AdministrativeProcedureInssAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
