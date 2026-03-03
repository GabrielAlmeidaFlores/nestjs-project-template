import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { JudicialCaseAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/command/judicial-case-analysis.command.repository.gateway';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';

@Injectable()
export class JudicialCaseAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<JudicialCaseAnalysisTypeormEntity>
  implements JudicialCaseAnalysisCommandRepositoryGateway
{
  protected readonly _type = JudicialCaseAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(JudicialCaseAnalysisTypeormEntity)
    repository: Repository<JudicialCaseAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createJudicialCaseAnalysis(
    props: JudicialCaseAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JudicialCaseAnalysisEntity,
      JudicialCaseAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateJudicialCaseAnalysis(
    id: JudicialCaseAnalysisId,
    props: JudicialCaseAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JudicialCaseAnalysisEntity,
      JudicialCaseAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteJudicialCaseAnalysis(
    id: JudicialCaseAnalysisId,
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
