import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CnisFastAnalysisClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-inss-benefit.typeorm.entity';
import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';
import { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import { CnisFastAnalysisClientInssBenefitEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity';
import { CnisFastAnalysisClientInssBenefitId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

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
      const cnisFastAnalysisClient = this.mapper.map(
        source.cnisFastAnalysisClient,
        CnisFastAnalysisClientTypeormEntity,
        CnisFastAnalysisClientEntity,
      );

      return new CnisFastAnalysisClientInssBenefitEntity({
        ...source,
        id: new CnisFastAnalysisClientInssBenefitId(source.id),
        cnisFastAnalysisClient,
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
      const cnisFastAnalysisClient = this.mapper.map(
        source.cnisFastAnalysisClient,
        CnisFastAnalysisClientEntity,
        CnisFastAnalysisClientTypeormEntity,
      );

      return CnisFastAnalysisClientInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysisClient,
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
