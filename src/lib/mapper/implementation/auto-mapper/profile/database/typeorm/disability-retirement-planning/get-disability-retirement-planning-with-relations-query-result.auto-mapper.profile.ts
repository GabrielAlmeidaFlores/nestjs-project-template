import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-document.typeorm.entity';
import { DisabilityRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { DisabilityRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-remuneration.typeorm.entity';
import { DisabilityRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-result.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import {
  GetDisabilityRetirementPlanningDocumentQueryResult,
  GetDisabilityRetirementPlanningInssBenefitQueryResult,
  GetDisabilityRetirementPlanningLegalProceedingQueryResult,
  GetDisabilityRetirementPlanningPeriodQueryResult,
  GetDisabilityRetirementPlanningRemunerationQueryResult,
  GetDisabilityRetirementPlanningResultQueryResult,
  GetDisabilityRetirementPlanningWithRelationsQueryResult,
} from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: DisabilityRetirementPlanningTypeormEntity,
    ): GetDisabilityRetirementPlanningWithRelationsQueryResult => {
      const result = source.disabilityRetirementPlanningResult
        ? this.mapper.map(
            source.disabilityRetirementPlanningResult,
            DisabilityRetirementPlanningResultTypeormEntity,
            GetDisabilityRetirementPlanningResultQueryResult,
          )
        : null;

      const periods = source.disabilityRetirementPlanningPeriod
        ? this.mapper.mapArray(
            source.disabilityRetirementPlanningPeriod,
            DisabilityRetirementPlanningPeriodTypeormEntity,
            GetDisabilityRetirementPlanningPeriodQueryResult,
          )
        : [];

      const documents = source.disabilityRetirementPlanningDocument
        ? this.mapper.mapArray(
            source.disabilityRetirementPlanningDocument,
            DisabilityRetirementPlanningDocumentTypeormEntity,
            GetDisabilityRetirementPlanningDocumentQueryResult,
          )
        : [];

      const inssBenefits = source.disabilityRetirementPlanningInssBenefit
        ? this.mapper.mapArray(
            source.disabilityRetirementPlanningInssBenefit,
            DisabilityRetirementPlanningInssBenefitTypeormEntity,
            GetDisabilityRetirementPlanningInssBenefitQueryResult,
          )
        : [];

      const legalProceedings =
        source.disabilityRetirementPlanningLegalProceeding
          ? this.mapper.mapArray(
              source.disabilityRetirementPlanningLegalProceeding,
              DisabilityRetirementPlanningLegalProceedingTypeormEntity,
              GetDisabilityRetirementPlanningLegalProceedingQueryResult,
            )
          : [];

      const remunerations = source.disabilityRetirementPlanningRemuneration
        ? this.mapper.mapArray(
            source.disabilityRetirementPlanningRemuneration,
            DisabilityRetirementPlanningRemunerationTypeormEntity,
            GetDisabilityRetirementPlanningRemunerationQueryResult,
          )
        : [];

      return GetDisabilityRetirementPlanningWithRelationsQueryResult.build({
        id: new DisabilityRetirementPlanningId(source.id),
        currentPosition: source.currentPosition,
        federativeEntity: source.federativeEntity,
        state: source.state,
        municipality: source.municipality,
        publicServiceStartDate: source.publicServiceStartDate,
        careerStartDate: source.careerStartDate,
        analysisName: source.analysisName,
        longTimeDisability: source.longTimeDisability,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        result,
        periods,
        documents,
        inssBenefits,
        legalProceedings,
        remunerations,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningTypeormEntity,
      GetDisabilityRetirementPlanningWithRelationsQueryResult,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetDisabilityRetirementPlanningWithRelationsQueryResult,
    ): DisabilityRetirementPlanningTypeormEntity => {
      const result = source.result
        ? this.mapper.map(
            source.result,
            GetDisabilityRetirementPlanningResultQueryResult,
            DisabilityRetirementPlanningResultTypeormEntity,
          )
        : undefined;

      const periods = this.mapper.mapArray(
        source.periods,
        GetDisabilityRetirementPlanningPeriodQueryResult,
        DisabilityRetirementPlanningPeriodTypeormEntity,
      );

      const documents = this.mapper.mapArray(
        source.documents,
        GetDisabilityRetirementPlanningDocumentQueryResult,
        DisabilityRetirementPlanningDocumentTypeormEntity,
      );

      const inssBenefits = this.mapper.mapArray(
        source.inssBenefits,
        GetDisabilityRetirementPlanningInssBenefitQueryResult,
        DisabilityRetirementPlanningInssBenefitTypeormEntity,
      );

      const legalProceedings = this.mapper.mapArray(
        source.legalProceedings,
        GetDisabilityRetirementPlanningLegalProceedingQueryResult,
        DisabilityRetirementPlanningLegalProceedingTypeormEntity,
      );

      const remunerations = this.mapper.mapArray(
        source.remunerations,
        GetDisabilityRetirementPlanningRemunerationQueryResult,
        DisabilityRetirementPlanningRemunerationTypeormEntity,
      );

      return DisabilityRetirementPlanningTypeormEntity.build({
        id: source.id.toString(),
        currentPosition: source.currentPosition,
        federativeEntity: source.federativeEntity,
        state: source.state,
        municipality: source.municipality,
        publicServiceStartDate: source.publicServiceStartDate,
        careerStartDate: source.careerStartDate,
        analysisName: source.analysisName,
        longTimeDisability: source.longTimeDisability,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
        ...(result !== undefined && {
          disabilityRetirementPlanningResult: result,
        }),
        disabilityRetirementPlanningPeriod: periods,
        disabilityRetirementPlanningDocument: documents,
        disabilityRetirementPlanningInssBenefit: inssBenefits,
        disabilityRetirementPlanningLegalProceeding: legalProceedings,
        disabilityRetirementPlanningRemuneration: remunerations,
      });
    };

    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningWithRelationsQueryResult,
      DisabilityRetirementPlanningTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
