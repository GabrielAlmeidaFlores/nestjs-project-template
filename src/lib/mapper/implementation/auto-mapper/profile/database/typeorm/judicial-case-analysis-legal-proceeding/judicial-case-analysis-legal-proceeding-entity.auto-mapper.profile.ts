import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-legal-proceeding.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';

@Injectable()
export class JudicialCaseAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    JudicialCaseAnalysisLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisLegalProceedingTypeormEntity,
    ): JudicialCaseAnalysisLegalProceedingEntity => {
      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisTypeormEntity,
        JudicialCaseAnalysisEntity,
      );

      return new JudicialCaseAnalysisLegalProceedingEntity({
        ...source,
        id: new JudicialCaseAnalysisLegalProceedingId(source.id),
        judicialCaseAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisLegalProceedingTypeormEntity,
      JudicialCaseAnalysisLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: JudicialCaseAnalysisLegalProceedingEntity,
    ): JudicialCaseAnalysisLegalProceedingTypeormEntity => {
      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisEntity,
        JudicialCaseAnalysisTypeormEntity,
      );

      return JudicialCaseAnalysisLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisLegalProceedingEntity,
      JudicialCaseAnalysisLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}

