import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CnisFastAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis-inss-benefit/command/cnis-fast-analysis-inss-benefit.command.repository.gateway';
import { CnisFastAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.entity';
import { CnisFastAnalysisInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';

@Injectable()
export class CnisFastAnalysisInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<CnisFastAnalysisInssBenefitTypeormEntity>
  implements CnisFastAnalysisInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    CnisFastAnalysisInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisInssBenefitTypeormEntity)
    repository: Repository<CnisFastAnalysisInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteAnalysisToolClientInssBenefit(
    id: CnisFastAnalysisInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createAnalysisToolClientInssBenefit(
    props: CnisFastAnalysisInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      CnisFastAnalysisInssBenefitEntity,
      CnisFastAnalysisInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
