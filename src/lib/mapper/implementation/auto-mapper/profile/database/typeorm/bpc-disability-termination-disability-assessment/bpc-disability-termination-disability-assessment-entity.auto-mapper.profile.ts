import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment-document.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity';

@Injectable()
export class BpcDisabilityTerminationDisabilityAssessmentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
    ): BpcDisabilityTerminationDisabilityAssessmentEntity => {
      const bpcDisabilityTerminationDisabilityAssessmentDocument =
        source.bpcDisabilityTerminationDisabilityAssessmentDocument !==
        undefined
          ? this.mapper.mapArray(
              source.bpcDisabilityTerminationDisabilityAssessmentDocument,
              BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
              BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
            )
          : [];

      return new BpcDisabilityTerminationDisabilityAssessmentEntity({
        id: new BpcDisabilityTerminationDisabilityAssessmentId(source.id),
        estimatedDisabilityStartDate:
          source.estimatedDisabilityStartDate ?? null,
        attendsSchoolOrTechnicalCourse:
          source.attendsSchoolOrTechnicalCourse ?? null,
        performsLaborActivity: source.performsLaborActivity ?? null,
        needsThirdPartyHelp: source.needsThirdPartyHelp ?? null,
        hasAccessToBasicServices: source.hasAccessToBasicServices ?? null,
        otherBarriersDescription: source.otherBarriersDescription ?? null,
        bpcDisabilityTerminationDisabilityAssessmentDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
      BpcDisabilityTerminationDisabilityAssessmentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationDisabilityAssessmentEntity,
    ): BpcDisabilityTerminationDisabilityAssessmentTypeormEntity => {
      const bpcDisabilityTerminationDisabilityAssessmentDocument =
        this.mapper.mapArray(
          source.bpcDisabilityTerminationDisabilityAssessmentDocument,
          BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
          BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
        );

      return BpcDisabilityTerminationDisabilityAssessmentTypeormEntity.build({
        id: source.id.toString(),
        estimatedDisabilityStartDate: source.estimatedDisabilityStartDate,
        attendsSchoolOrTechnicalCourse: source.attendsSchoolOrTechnicalCourse,
        performsLaborActivity: source.performsLaborActivity,
        needsThirdPartyHelp: source.needsThirdPartyHelp,
        hasAccessToBasicServices: source.hasAccessToBasicServices,
        otherBarriersDescription: source.otherBarriersDescription,
        bpcDisabilityTerminationDisabilityAssessmentDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDisabilityAssessmentEntity,
      BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
