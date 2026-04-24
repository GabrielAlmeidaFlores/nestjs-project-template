import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-result.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: TemporaryIncapacityBenefitRejectionTypeormEntity,
    ): TemporaryIncapacityBenefitRejectionEntity => {
      const resultId =
        source.temporaryIncapacityBenefitRejectionResult !== null &&
        source.temporaryIncapacityBenefitRejectionResult !== undefined
          ? new TemporaryIncapacityBenefitRejectionResultId(
              source.temporaryIncapacityBenefitRejectionResult.id,
            )
          : null;

      return new TemporaryIncapacityBenefitRejectionEntity({
        id: new TemporaryIncapacityBenefitRejectionId(source.id),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        denialReason: source.denialReason,
        denialReasonDescription: source.denialReasonDescription,
        condition: source.condition,
        conditionDescription: source.conditionDescription,
        temporaryIncapacityBenefitRejectionResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryIncapacityBenefitRejectionTypeormEntity,
      TemporaryIncapacityBenefitRejectionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: TemporaryIncapacityBenefitRejectionEntity,
    ): TemporaryIncapacityBenefitRejectionTypeormEntity => {
      const result =
        source.temporaryIncapacityBenefitRejectionResultId !== null
          ? TemporaryIncapacityBenefitRejectionResultTypeormEntity.build({
              id: source.temporaryIncapacityBenefitRejectionResultId.toString(),
            } as TemporaryIncapacityBenefitRejectionResultTypeormEntity)
          : null;

      return TemporaryIncapacityBenefitRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        denialDate: source.denialDate,
        requestedBenefitType: source.requestedBenefitType,
        category: source.category,
        denialReason: source.denialReason,
        denialReasonDescription: source.denialReasonDescription,
        condition: source.condition,
        conditionDescription: source.conditionDescription,
        temporaryIncapacityBenefitRejectionResult: result,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryIncapacityBenefitRejectionEntity,
      TemporaryIncapacityBenefitRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
