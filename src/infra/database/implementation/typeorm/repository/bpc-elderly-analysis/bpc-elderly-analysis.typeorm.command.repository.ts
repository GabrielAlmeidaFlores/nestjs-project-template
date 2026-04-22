import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { BpcElderlyAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/command/bpc-elderly-analysis.command.repository.gateway';
import { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

@Injectable()
export class BpcElderlyAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyAnalysisTypeormEntity>
  implements BpcElderlyAnalysisCommandRepositoryGateway
{
  protected readonly _type = BpcElderlyAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisTypeormEntity)
    repository: Repository<BpcElderlyAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyAnalysis(
    props: BpcElderlyAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisEntity,
      BpcElderlyAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBpcElderlyAnalysis(
    id: BpcElderlyAnalysisId,
    props: BpcElderlyAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisEntity,
      BpcElderlyAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteBpcElderlyAnalysis(
    id: BpcElderlyAnalysisId,
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
