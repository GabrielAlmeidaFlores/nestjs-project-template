import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-result.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: PermanentIncapacityBenefitTerminatedTypeormEntity,
    ): PermanentIncapacityBenefitTerminatedEntity => {
      const resultId =
        source.permanentIncapacityBenefitTerminatedResult !== null &&
        source.permanentIncapacityBenefitTerminatedResult !== undefined
          ? new PermanentIncapacityBenefitTerminatedResultId(
              source.permanentIncapacityBenefitTerminatedResult.id,
            )
          : null;

      return new PermanentIncapacityBenefitTerminatedEntity({
        id: new PermanentIncapacityBenefitTerminatedId(source.id),
        analysisName: source.analysisName,
        benefitTerminationDate: source.benefitTerminationDate,
        category: source.category,
        terminationReason: source.terminationReason,
        terminationReasonDescription: source.terminationReasonDescription,
        permanentIncapacityBenefitTerminatedResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      PermanentIncapacityBenefitTerminatedTypeormEntity,
      PermanentIncapacityBenefitTerminatedEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: PermanentIncapacityBenefitTerminatedEntity,
    ): PermanentIncapacityBenefitTerminatedTypeormEntity => {
      const result =
        source.permanentIncapacityBenefitTerminatedResultId !== null
          ? PermanentIncapacityBenefitTerminatedResultTypeormEntity.build({
              id: source.permanentIncapacityBenefitTerminatedResultId.toString(),
            } as PermanentIncapacityBenefitTerminatedResultTypeormEntity)
          : null;

      return PermanentIncapacityBenefitTerminatedTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        benefitTerminationDate: source.benefitTerminationDate,
        category: source.category,
        terminationReason: source.terminationReason,
        terminationReasonDescription: source.terminationReasonDescription,
        permanentIncapacityBenefitTerminatedResult: result,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      PermanentIncapacityBenefitTerminatedEntity,
      PermanentIncapacityBenefitTerminatedTypeormEntity,
      constructUsing(convert),
    );
  }
}
