import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-benefit.typeorm.entity';
import { GetJudicialCaseAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis-benefit.query.result';
import { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';

@Injectable()
export class GetJudicialCaseAnalysisBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetJudicialCaseAnalysisBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisBenefitTypeormEntity,
    ): GetJudicialCaseAnalysisBenefitQueryResult => {
      return GetJudicialCaseAnalysisBenefitQueryResult.build({
        ...source,
        id: new JudicialCaseAnalysisBenefitId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisBenefitTypeormEntity,
      GetJudicialCaseAnalysisBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetJudicialCaseAnalysisBenefitQueryResult,
    ): JudicialCaseAnalysisBenefitTypeormEntity => {
      return JudicialCaseAnalysisBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysis: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetJudicialCaseAnalysisBenefitQueryResult,
      JudicialCaseAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
