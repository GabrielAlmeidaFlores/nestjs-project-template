import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CnisFastAnalysisClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-inss-benefit.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';
import { CnisFastAnalysisClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

@Injectable()
export class CnisFastAnalysisClientInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    CnisFastAnalysisClientInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisClientInssBenefitTypeormEntity,
    ): CnisFastAnalysisClientInssBenefitEntity => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisTypeormEntity,
        CnisFastAnalysisEntity,
      );

      return new CnisFastAnalysisClientInssBenefitEntity({
        ...source,
        id: new CnisFastAnalysisClientInssBenefitId(source.id),
        cnisFastAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisClientInssBenefitTypeormEntity,
      CnisFastAnalysisClientInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CnisFastAnalysisClientInssBenefitEntity,
    ): CnisFastAnalysisClientInssBenefitTypeormEntity => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisEntity,
        CnisFastAnalysisTypeormEntity,
      );

      return CnisFastAnalysisClientInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisClientInssBenefitEntity,
      CnisFastAnalysisClientInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
