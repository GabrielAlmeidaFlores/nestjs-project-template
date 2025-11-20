import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/cnis-fast-analysis-inss-benefit.entity';
import { CnisFastAnalysisInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-inss-benefit/value-object/cnis-fast-analysis-inss-benefit-id/cnis-fast-analysis-inss-benefit-id.value-object';

@Injectable()
export class CnisFastAnalysisInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    CnisFastAnalysisInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisInssBenefitTypeormEntity,
    ): CnisFastAnalysisInssBenefitEntity => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisTypeormEntity,
        CnisFastAnalysisEntity,
      );

      return new CnisFastAnalysisInssBenefitEntity({
        ...source,
        id: new CnisFastAnalysisInssBenefitId(source.id),
        cnisFastAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisInssBenefitTypeormEntity,
      CnisFastAnalysisInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CnisFastAnalysisInssBenefitEntity,
    ): CnisFastAnalysisInssBenefitTypeormEntity => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisEntity,
        CnisFastAnalysisTypeormEntity,
      );

      return CnisFastAnalysisInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisInssBenefitEntity,
      CnisFastAnalysisInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
