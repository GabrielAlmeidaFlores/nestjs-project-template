import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/command/general-urban-retirement-analysis-remuneration.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration.entity';
import { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisRemunerationTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisRemunerationTypeormEntity>
  implements GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisRemunerationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisRemunerationTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementAnalysisRemuneration(
    id: GeneralUrbanRetirementAnalysisRemunerationId,
    props: GeneralUrbanRetirementAnalysisRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementAnalysisRemunerationEntity,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementAnalysisRemuneration(
    props: GeneralUrbanRetirementAnalysisRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementAnalysisRemunerationEntity,
      GeneralUrbanRetirementAnalysisRemunerationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementAnalysisRemuneration(
    id: GeneralUrbanRetirementAnalysisRemunerationId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
