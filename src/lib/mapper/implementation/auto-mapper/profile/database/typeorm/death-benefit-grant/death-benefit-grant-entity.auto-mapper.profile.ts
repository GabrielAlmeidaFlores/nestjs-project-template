import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-result.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

@Injectable()
export class DeathBenefitGrantEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: DeathBenefitGrantTypeormEntity,
    ): DeathBenefitGrantEntity => {
      const deathBenefitGrantResultId =
        source.deathBenefitGrantResult !== null &&
        source.deathBenefitGrantResult !== undefined
          ? new DeathBenefitGrantResultId(source.deathBenefitGrantResult.id)
          : null;

      return new DeathBenefitGrantEntity({
        id: new DeathBenefitGrantId(source.id),
        analysisName: source.analysisName,
        deathBenefitGrantResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DeathBenefitGrantTypeormEntity,
      DeathBenefitGrantEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: DeathBenefitGrantEntity,
    ): DeathBenefitGrantTypeormEntity => {
      const deathBenefitGrantResult =
        source.deathBenefitGrantResultId !== null
          ? DeathBenefitGrantResultTypeormEntity.build({
              id: source.deathBenefitGrantResultId.toString(),
            } as DeathBenefitGrantResultTypeormEntity)
          : undefined;

      return DeathBenefitGrantTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        deathBenefitGrantResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DeathBenefitGrantEntity,
      DeathBenefitGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
