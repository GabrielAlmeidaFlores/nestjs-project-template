import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

import { CnisFastAnalysisClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';
import { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import { CnisFastAnalysisClientLegalProceedingEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity';
import { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

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
      const cnisFastAnalysisClient = this.mapper.map(
        source.cnisFastAnalysisClient,
        CnisFastAnalysisClientTypeormEntity,
        CnisFastAnalysisClientEntity,
      );

      return new CnisFastAnalysisClientLegalProceedingEntity({
        ...source,
        id: new CnisFastAnalysisClientLegalProceedingId(source.id),
        cnisFastAnalysisClient,
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
      const cnisFastAnalysisClient = this.mapper.map(
        source.cnisFastAnalysisClient,
        CnisFastAnalysisClientEntity,
        CnisFastAnalysisClientTypeormEntity,
      );

      return CnisFastAnalysisClientLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysisClient,
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
