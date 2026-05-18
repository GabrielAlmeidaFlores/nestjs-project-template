import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-result.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { AccidentBenefitRejectionEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/accident-benefit-rejection.entity';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

@Injectable()
export class AccidentBenefitRejectionEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionTypeormEntity,
    ): AccidentBenefitRejectionEntity => {
      const resultId =
        source.accidentBenefitRejectionResult !== null &&
        source.accidentBenefitRejectionResult !== undefined
          ? new AccidentBenefitRejectionResultId(
              source.accidentBenefitRejectionResult.id,
            )
          : null;

      return new AccidentBenefitRejectionEntity({
        id: new AccidentBenefitRejectionId(source.id),
        analysisName: source.analysisName,
        requirementStartDate: source.requirementStartDate,
        rejectionDate: source.rejectionDate,
        category: source.category,
        mainAccidentBenefitRejectionReason:
          source.mainAccidentBenefitRejectionReason,
        otherAccidentBenefitRejectionReason:
          source.otherAccidentBenefitRejectionReason,
        hasPreviousGrantRelated: source.hasPreviousGrantRelated,
        previousGrantBenefitNumber: source.previousGrantBenefitNumber,
        previousGrantStartDate: source.previousGrantStartDate,
        previousGrantTerminationDate: source.previousGrantTerminationDate,
        requestToExtendTemporaryDisabilityBenefit:
          source.requestToExtendTemporaryDisabilityBenefit,
        accidentBenefitRejectionResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionTypeormEntity,
      AccidentBenefitRejectionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionEntity,
    ): AccidentBenefitRejectionTypeormEntity => {
      const accidentBenefitRejectionResult =
        source.accidentBenefitRejectionResultId !== null
          ? AccidentBenefitRejectionResultTypeormEntity.build({
              id: source.accidentBenefitRejectionResultId.toString(),
            } as AccidentBenefitRejectionResultTypeormEntity)
          : undefined;

      return AccidentBenefitRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requirementStartDate: source.requirementStartDate,
        rejectionDate: source.rejectionDate,
        category: source.category,
        mainAccidentBenefitRejectionReason:
          source.mainAccidentBenefitRejectionReason,
        otherAccidentBenefitRejectionReason:
          source.otherAccidentBenefitRejectionReason,
        hasPreviousGrantRelated: source.hasPreviousGrantRelated,
        previousGrantBenefitNumber: source.previousGrantBenefitNumber,
        previousGrantStartDate: source.previousGrantStartDate,
        previousGrantTerminationDate: source.previousGrantTerminationDate,
        requestToExtendTemporaryDisabilityBenefit:
          source.requestToExtendTemporaryDisabilityBenefit,
        accidentBenefitRejectionResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionEntity,
      AccidentBenefitRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
