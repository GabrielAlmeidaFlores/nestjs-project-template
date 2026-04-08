import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-result.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { DeathBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/death-benefit.entity';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

@Injectable()
export class DeathBenefitEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: DeathBenefitTypeormEntity,
    ): DeathBenefitEntity => {
      const deathBenefitResultId =
        source.deathBenefitResult !== null &&
        source.deathBenefitResult !== undefined
          ? new DeathBenefitResultId(source.deathBenefitResult.id)
          : null;

      return new DeathBenefitEntity({
        id: new DeathBenefitId(source.id),
        analysisName: source.analysisName,
        deathBenefitResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DeathBenefitTypeormEntity,
      DeathBenefitEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (source: DeathBenefitEntity): DeathBenefitTypeormEntity => {
      const deathBenefitResult =
        source.deathBenefitResultId !== null
          ? DeathBenefitResultTypeormEntity.build({
              id: source.deathBenefitResultId.toString(),
            } as DeathBenefitResultTypeormEntity)
          : undefined;

      return DeathBenefitTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        deathBenefitResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DeathBenefitEntity,
      DeathBenefitTypeormEntity,
      constructUsing(convert),
    );
  }
}
