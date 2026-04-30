import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-result.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.entity';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: TemporaryIncapacityBenefitTerminationTypeormEntity,
    ): TemporaryIncapacityBenefitTerminationEntity => {
      const resultId =
        source.temporaryIncapacityBenefitTerminationResult !== null &&
        source.temporaryIncapacityBenefitTerminationResult !== undefined
          ? new TemporaryIncapacityBenefitTerminationResultId(
              source.temporaryIncapacityBenefitTerminationResult.id,
            )
          : null;

      return new TemporaryIncapacityBenefitTerminationEntity({
        id: new TemporaryIncapacityBenefitTerminationId(source.id),
        analysisName: source.analysisName,
        benefitTerminationDate: source.benefitTerminationDate,
        category: source.category,
        terminationReason: source.terminationReason,
        terminationReasonDescription: source.terminationReasonDescription,
        temporaryIncapacityBenefitTerminationResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryIncapacityBenefitTerminationTypeormEntity,
      TemporaryIncapacityBenefitTerminationEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: TemporaryIncapacityBenefitTerminationEntity,
    ): TemporaryIncapacityBenefitTerminationTypeormEntity => {
      const result =
        source.temporaryIncapacityBenefitTerminationResultId !== null
          ? TemporaryIncapacityBenefitTerminationResultTypeormEntity.build({
              id: source.temporaryIncapacityBenefitTerminationResultId.toString(),
            } as TemporaryIncapacityBenefitTerminationResultTypeormEntity)
          : null;

      return TemporaryIncapacityBenefitTerminationTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        benefitTerminationDate: source.benefitTerminationDate,
        category: source.category,
        terminationReason: source.terminationReason,
        terminationReasonDescription: source.terminationReasonDescription,
        temporaryIncapacityBenefitTerminationResult: result,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryIncapacityBenefitTerminationEntity,
      TemporaryIncapacityBenefitTerminationTypeormEntity,
      constructUsing(convert),
    );
  }
}
