import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment-document.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment.typeorm.entity';
import { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/value-object/bpc-disability-termination-disability-assessment-document-id/bpc-disability-termination-disability-assessment-document-id.value-object';

@Injectable()
export class BpcDisabilityTerminationDisabilityAssessmentDocumentEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
    ): BpcDisabilityTerminationDisabilityAssessmentDocumentEntity => {
      const bpcDisabilityTerminationDisabilityAssessment = this.mapper.map(
        source.bpcDisabilityTerminationDisabilityAssessment,
        BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
        BpcDisabilityTerminationDisabilityAssessmentEntity,
      );

      return new BpcDisabilityTerminationDisabilityAssessmentDocumentEntity({
        id: new BpcDisabilityTerminationDisabilityAssessmentDocumentId(
          source.id,
        ),
        document: source.document,
        bpcDisabilityTerminationDisabilityAssessment,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
      BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
    ): BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity => {
      const bpcDisabilityTerminationDisabilityAssessment = this.mapper.map(
        source.bpcDisabilityTerminationDisabilityAssessment,
        BpcDisabilityTerminationDisabilityAssessmentEntity,
        BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
      );

      return BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity.build(
        {
          id: source.id.toString(),
          document: source.document,
          bpcDisabilityTerminationDisabilityAssessment,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
      BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
