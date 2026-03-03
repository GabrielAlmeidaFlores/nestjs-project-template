import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineCnisContributionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/command/rural-timeline-cnis-contribution-period-document.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineCnisContributionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.entity';
import { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';

@Injectable()
export class RuralTimelineCnisContributionPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineCnisContributionPeriodDocumentTypeormEntity>
  implements RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelineCnisContributionPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineCnisContributionPeriodDocumentTypeormEntity)
    repository: Repository<RuralTimelineCnisContributionPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelineCnisContributionPeriodDocument(
    props: RuralTimelineCnisContributionPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineCnisContributionPeriodDocumentEntity,
      RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRuralTimelineCnisContributionPeriodDocument(
    props: RuralTimelineCnisContributionPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineCnisContributionPeriodDocumentEntity,
      RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }

  public deleteRuralTimelineCnisContributionPeriodDocument(
    id: RuralTimelineCnisContributionPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repo =
        manager.getRepository<RuralTimelineCnisContributionPeriodDocumentTypeormEntity>(
          RuralTimelineCnisContributionPeriodDocumentTypeormEntity,
        );

      await repo.delete({
        ruralTimelineCnisContributionPeriod: {
          id: contributionPeriodId.toString(),
        },
      });
    };
  }
}
