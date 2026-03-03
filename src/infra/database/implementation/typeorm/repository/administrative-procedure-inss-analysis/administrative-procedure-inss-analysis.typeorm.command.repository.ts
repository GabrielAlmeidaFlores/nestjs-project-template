import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AdministrativeProcedureInssAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/command/administrative-procedure-inss-analysis.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<AdministrativeProcedureInssAnalysisTypeormEntity>
  implements AdministrativeProcedureInssAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    AdministrativeProcedureInssAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AdministrativeProcedureInssAnalysisTypeormEntity)
    repository: Repository<AdministrativeProcedureInssAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAdministrativeProcedureInssAnalysis(
    props: AdministrativeProcedureInssAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeProcedureInssAnalysisEntity,
      AdministrativeProcedureInssAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAdministrativeProcedureInssAnalysis(
    id: AdministrativeProcedureInssAnalysisId,
    props: AdministrativeProcedureInssAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeProcedureInssAnalysisEntity,
      AdministrativeProcedureInssAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteAdministrativeProcedureInssAnalysis(
    id: AdministrativeProcedureInssAnalysisId,
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
