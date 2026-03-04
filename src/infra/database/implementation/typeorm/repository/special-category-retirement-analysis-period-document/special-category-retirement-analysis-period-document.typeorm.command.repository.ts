import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.entity';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity>
  implements SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type = SpecialCategoryRetirementAnalysisPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialCategoryRetirementAnalysisPeriodDocument(
    props: SpecialCategoryRetirementAnalysisPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisPeriodDocumentEntity,
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteSpecialCategoryRetirementAnalysisPeriodDocument(
    id: SpecialCategoryRetirementAnalysisPeriodDocumentId,
  ): TransactionType {
    return this.update(id.toString(), { deletedAt: new Date() });
  }

  public deleteAllByWorkPeriodId(
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): TransactionType {
    return async (manager: any) => {
      await manager.update(
        SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
        {
          workPeriod: { id: workPeriodId.toString() },
          deletedAt: IsNull(),
        },
        { deletedAt: new Date() },
      );
    };
  }
}
