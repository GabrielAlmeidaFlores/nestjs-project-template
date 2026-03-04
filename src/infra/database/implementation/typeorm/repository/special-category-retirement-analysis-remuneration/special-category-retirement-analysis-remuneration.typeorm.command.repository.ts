import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialCategoryRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.entity';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisRemunerationTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialCategoryRetirementAnalysisRemunerationTypeormEntity>
  implements SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway
{
  protected readonly _type = SpecialCategoryRetirementAnalysisRemunerationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisRemunerationTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialCategoryRetirementAnalysisRemuneration(
    props: SpecialCategoryRetirementAnalysisRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisRemunerationEntity,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateSpecialCategoryRetirementAnalysisRemuneration(
    id: SpecialCategoryRetirementAnalysisRemunerationId,
    props: SpecialCategoryRetirementAnalysisRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialCategoryRetirementAnalysisRemunerationEntity,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public deleteSpecialCategoryRetirementAnalysisRemuneration(
    id: SpecialCategoryRetirementAnalysisRemunerationId,
  ): TransactionType {
    return this.update(id.toString(), { remunerationGrossAmount: null });
  }
}
