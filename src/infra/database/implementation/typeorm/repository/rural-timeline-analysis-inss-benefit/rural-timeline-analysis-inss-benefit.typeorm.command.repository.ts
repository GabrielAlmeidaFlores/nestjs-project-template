import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/command/rural-timeline-analysis-inss-benefit.command.repository.gateway';
import { RuralTimelineAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.entity';
import { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';

@Injectable()
export class RuralTimelineAnalysisInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineAnalysisInssBenefitTypeormEntity>
  implements RuralTimelineAnalysisInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineAnalysisInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineAnalysisInssBenefitTypeormEntity)
    repository: Repository<RuralTimelineAnalysisInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteRuralTimelineAnalysisInssBenefit(
    id: RuralTimelineAnalysisInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createRuralTimelineAnalysisInssBenefit(
    props: RuralTimelineAnalysisInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineAnalysisInssBenefitEntity,
      RuralTimelineAnalysisInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
