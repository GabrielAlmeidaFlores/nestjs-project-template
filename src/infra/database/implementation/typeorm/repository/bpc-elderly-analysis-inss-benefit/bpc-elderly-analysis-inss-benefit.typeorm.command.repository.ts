import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcElderlyAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcElderlyAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis-inss-benefit/command/bpc-elderly-analysis-inss-benefit.command.repository.gateway';
import { BpcElderlyAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity';
import { BpcElderlyAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/value-object/bpc-elderly-analysis-inss-benefit-id/bpc-elderly-analysis-inss-benefit-id.value-object';

@Injectable()
export class BpcElderlyAnalysisInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcElderlyAnalysisInssBenefitTypeormEntity>
  implements BpcElderlyAnalysisInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    BpcElderlyAnalysisInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcElderlyAnalysisInssBenefitTypeormEntity)
    repository: Repository<BpcElderlyAnalysisInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcElderlyAnalysisInssBenefit(
    props: BpcElderlyAnalysisInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcElderlyAnalysisInssBenefitEntity,
      BpcElderlyAnalysisInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteBpcElderlyAnalysisInssBenefit(
    id: BpcElderlyAnalysisInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
