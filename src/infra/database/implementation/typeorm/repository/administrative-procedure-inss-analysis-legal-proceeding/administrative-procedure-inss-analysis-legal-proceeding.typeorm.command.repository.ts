import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-legal-proceeding/command/administrative-procedure-inss-analysis-legal-proceeding.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-legal-proceeding/value-object/administrative-procedure-inss-analysis-legal-proceeding-id/administrative-procedure-inss-analysis-legal-proceeding-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity>
  implements
    AdministrativeProcedureInssAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    AdministrativeProcedureInssAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
    )
    repository: Repository<AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteAdministrativeProcedureInssAnalysisLegalProceeding(
    id: AdministrativeProcedureInssAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createAdministrativeProcedureInssAnalysisLegalProceeding(
    props: AdministrativeProcedureInssAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeProcedureInssAnalysisLegalProceedingEntity,
      AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
