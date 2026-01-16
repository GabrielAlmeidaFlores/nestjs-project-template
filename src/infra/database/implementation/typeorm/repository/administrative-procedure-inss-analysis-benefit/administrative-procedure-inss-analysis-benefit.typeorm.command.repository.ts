import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-benefit.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-benefit/command/administrative-procedure-inss-analysis-benefit.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisBenefitId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-benefit/value-object/administrative-procedure-inss-analysis-benefit-id/administrative-procedure-inss-analysis-benefit-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<AdministrativeProcedureInssAnalysisBenefitTypeormEntity>
  implements AdministrativeProcedureInssAnalysisBenefitCommandRepositoryGateway
{
  protected readonly _type =
    AdministrativeProcedureInssAnalysisBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AdministrativeProcedureInssAnalysisBenefitTypeormEntity)
    repository: Repository<AdministrativeProcedureInssAnalysisBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteAdministrativeProcedureInssAnalysisBenefit(
    id: AdministrativeProcedureInssAnalysisBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createAdministrativeProcedureInssAnalysisBenefit(
    props: AdministrativeProcedureInssAnalysisBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeProcedureInssAnalysisBenefitEntity,
      AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
