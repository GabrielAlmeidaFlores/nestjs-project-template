import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-result.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

@Injectable()
export class DeathBenefitRejectionEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: DeathBenefitRejectionTypeormEntity,
    ): DeathBenefitRejectionEntity => {
      const deathBenefitRejectionResultId =
        source.deathBenefitRejectionResult !== null &&
        source.deathBenefitRejectionResult !== undefined
          ? new DeathBenefitRejectionResultId(
              source.deathBenefitRejectionResult.id,
            )
          : null;

      return new DeathBenefitRejectionEntity({
        id: new DeathBenefitRejectionId(source.id),
        analysisName: source.analysisName,
        category: source.category,
        deathBenefitRejectionResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DeathBenefitRejectionTypeormEntity,
      DeathBenefitRejectionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: DeathBenefitRejectionEntity,
    ): DeathBenefitRejectionTypeormEntity => {
      const deathBenefitRejectionResult =
        source.deathBenefitRejectionResultId !== null
          ? DeathBenefitRejectionResultTypeormEntity.build({
              id: source.deathBenefitRejectionResultId.toString(),
            } as DeathBenefitRejectionResultTypeormEntity)
          : undefined;

      return DeathBenefitRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category: source.category,
        deathBenefitRejectionResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DeathBenefitRejectionEntity,
      DeathBenefitRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
