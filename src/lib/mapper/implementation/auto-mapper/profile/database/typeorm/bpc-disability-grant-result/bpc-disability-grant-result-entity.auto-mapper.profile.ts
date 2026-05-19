import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-result.typeorm.entity';
import { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';
import { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';

@Injectable()
export class BpcDisabilityGrantResultEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityGrantResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityGrantResultTypeormEntity,
    ): BpcDisabilityGrantResultEntity => {
      return new BpcDisabilityGrantResultEntity({
        id: new BpcDisabilityGrantResultId(source.id),
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantResultTypeormEntity,
      BpcDisabilityGrantResultEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityGrantResultEntity,
    ): BpcDisabilityGrantResultTypeormEntity => {
      return BpcDisabilityGrantResultTypeormEntity.build({
        id: source.id.toString(),
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityGrantResultEntity,
      BpcDisabilityGrantResultTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
