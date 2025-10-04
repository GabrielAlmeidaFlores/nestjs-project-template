import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { CnisFastAnalysisClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity';
import { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

export class CnisFastAnalysisClientLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    CnisFastAnalysisClientLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisClientLegalProceedingTypeormEntity,
    ): CnisFastAnalysisClientLegalProceedingEntity => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisTypeormEntity,
        CnisFastAnalysisEntity,
      );

      return new CnisFastAnalysisClientLegalProceedingEntity({
        ...source,
        id: new CnisFastAnalysisClientLegalProceedingId(source.id),
        cnisFastAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisClientLegalProceedingTypeormEntity,
      CnisFastAnalysisClientLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CnisFastAnalysisClientLegalProceedingEntity,
    ): CnisFastAnalysisClientLegalProceedingTypeormEntity => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisEntity,
        CnisFastAnalysisTypeormEntity,
      );

      return CnisFastAnalysisClientLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisClientLegalProceedingEntity,
      CnisFastAnalysisClientLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }
}
