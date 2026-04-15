import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-result.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { GeneralUrbanRetirementDenialEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/general-urban-retirement-denial.entity';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: GeneralUrbanRetirementDenialTypeormEntity,
    ): GeneralUrbanRetirementDenialEntity => {
      const resultId =
        source.generalUrbanRetirementDenialResult !== null &&
        source.generalUrbanRetirementDenialResult !== undefined
          ? new GeneralUrbanRetirementDenialResultId(
              source.generalUrbanRetirementDenialResult.id,
            )
          : null;

      return new GeneralUrbanRetirementDenialEntity({
        id: new GeneralUrbanRetirementDenialId(source.id),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        generalUrbanRetirementDenialResultId: resultId,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GeneralUrbanRetirementDenialTypeormEntity,
      GeneralUrbanRetirementDenialEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: GeneralUrbanRetirementDenialEntity,
    ): GeneralUrbanRetirementDenialTypeormEntity => {
      const generalUrbanRetirementDenialResult =
        source.generalUrbanRetirementDenialResultId !== null
          ? GeneralUrbanRetirementDenialResultTypeormEntity.build({
              id: source.generalUrbanRetirementDenialResultId.toString(),
            } as GeneralUrbanRetirementDenialResultTypeormEntity)
          : undefined;

      return GeneralUrbanRetirementDenialTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        generalUrbanRetirementDenialResult:
          generalUrbanRetirementDenialResult ?? null,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      GeneralUrbanRetirementDenialEntity,
      GeneralUrbanRetirementDenialTypeormEntity,
      constructUsing(convert),
    );
  }
}
