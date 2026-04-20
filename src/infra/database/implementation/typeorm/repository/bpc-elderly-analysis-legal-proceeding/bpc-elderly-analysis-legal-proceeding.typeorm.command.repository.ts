import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-legal-proceeding/command/bpc-elderly-analysis-legal-proceeding.command.repository.gateway';
import { BpcElderlyAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity';
import { BpcElderlyAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/value-object/bpc-elderly-analysis-legal-proceeding-id/bpc-elderly-analysis-legal-proceeding-id.value-object';

@Injectable()
export class BpcElderlyAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyAnalysisLegalProceedingTypeormEntity>
  implements BpcElderlyAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisLegalProceedingTypeormEntity)
    repository: Repository<BpcElderlyAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyAnalysisLegalProceeding(
    props: BpcElderlyAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisLegalProceedingEntity,
      BpcElderlyAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcElderlyAnalysisLegalProceeding(
    id: BpcElderlyAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
