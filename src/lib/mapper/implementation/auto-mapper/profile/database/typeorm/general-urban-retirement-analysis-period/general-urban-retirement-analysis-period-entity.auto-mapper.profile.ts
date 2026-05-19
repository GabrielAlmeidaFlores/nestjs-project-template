import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period.typeorm.entity';
import { GeneralUrbanRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';

@Injectable()
export class GeneralUrbanRetirementAnalysisPeriodEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementAnalysisPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapDomainEntityToOrmEntity();
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementAnalysisPeriodEntity,
    ): GeneralUrbanRetirementAnalysisPeriodTypeormEntity => {
      const generalUrbanRetirementAnalysis = {
        id: source.generalUrbanRetirementAnalysis.id.toString(),
      } as GeneralUrbanRetirementAnalysisTypeormEntity;

      return {
        id: source.id.toString(),
        startDate: source.startDate,
        endDate: source.endDate,
        jobPosition: source.jobPosition,
        career: source.career,
        serviceType: source.serviceType,
        department: source.department,
        generalUrbanRetirementAnalysis,
      } as GeneralUrbanRetirementAnalysisPeriodTypeormEntity;
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementAnalysisPeriodEntity,
      GeneralUrbanRetirementAnalysisPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
