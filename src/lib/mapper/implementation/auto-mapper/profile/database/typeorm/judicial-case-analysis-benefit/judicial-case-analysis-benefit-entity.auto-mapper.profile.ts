import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-benefit.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';

@Injectable()
export class JudicialCaseAnalysisBenefitEntityAutoMapperProfile {
  protected readonly _type =
    JudicialCaseAnalysisBenefitEntityAutoMapperProfile.name;

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
    ): JudicialCaseAnalysisBenefitEntity => {
      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisTypeormEntity,
        JudicialCaseAnalysisEntity,
      );

      return new JudicialCaseAnalysisBenefitEntity({
        ...source,
        id: new JudicialCaseAnalysisBenefitId(source.id),
        judicialCaseAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisBenefitTypeormEntity,
      JudicialCaseAnalysisBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: JudicialCaseAnalysisBenefitEntity,
    ): JudicialCaseAnalysisBenefitTypeormEntity => {
      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisEntity,
        JudicialCaseAnalysisTypeormEntity,
      );

      return JudicialCaseAnalysisBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisBenefitEntity,
      JudicialCaseAnalysisBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
