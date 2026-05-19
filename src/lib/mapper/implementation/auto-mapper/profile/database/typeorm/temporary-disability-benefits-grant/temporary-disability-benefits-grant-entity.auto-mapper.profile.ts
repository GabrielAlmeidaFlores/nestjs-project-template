import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: TemporaryDisabilityBenefitsGrantTypeormEntity,
    ): TemporaryDisabilityBenefitsGrantEntity => {
      const resultId =
        source.temporaryDisabilityBenefitsGrantResult !== null &&
        source.temporaryDisabilityBenefitsGrantResult !== undefined
          ? new TemporaryDisabilityBenefitsGrantResultId(
              source.temporaryDisabilityBenefitsGrantResult.id,
            )
          : null;

      return new TemporaryDisabilityBenefitsGrantEntity({
        id: new TemporaryDisabilityBenefitsGrantId(source.id),
        category: source.category,
        analysisName: source.analysisName,
        temporaryDisabilityBenefitsGrantResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsGrantTypeormEntity,
      TemporaryDisabilityBenefitsGrantEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: TemporaryDisabilityBenefitsGrantEntity,
    ): TemporaryDisabilityBenefitsGrantTypeormEntity => {
      const temporaryDisabilityBenefitsGrantResult =
        source.temporaryDisabilityBenefitsGrantResultId !== null
          ? TemporaryDisabilityBenefitsGrantResultTypeormEntity.build({
              id: source.temporaryDisabilityBenefitsGrantResultId.toString(),
            } as TemporaryDisabilityBenefitsGrantResultTypeormEntity)
          : undefined;

      return TemporaryDisabilityBenefitsGrantTypeormEntity.build({
        id: source.id.toString(),
        category: source.category,
        analysisName: source.analysisName,
        temporaryDisabilityBenefitsGrantResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsGrantEntity,
      TemporaryDisabilityBenefitsGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
