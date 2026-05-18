import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/result/get-retirement-permanent-disability-revision-concession-letter-breakdown.query.result';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/retirement-permanent-disability-revision-concession-letter-breakdown.entity';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
    ): RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity => {
      if (!source.retirementPermanentDisabilityRevision) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity.name,
        });
      }

      return new RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity(
        {
          id: new RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId(
            source.id,
          ),
          competence: source.competence,
          amount: new DecimalValue(source.amount),
          reasonNotConsidered: source.reasonNotConsidered,
          action: source.action,
          retirementPermanentDisabilityRevisionId:
            new RetirementPermanentDisabilityRevisionId(
              source.retirementPermanentDisabilityRevision.id,
            ),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
    ): RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity => {
      return RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity.build(
        {
          id: source.id.toString(),
          competence: source.competence,
          amount: source.amount.toString(),
          reasonNotConsidered: source.reasonNotConsidered,
          action: source.action,
          retirementPermanentDisabilityRevision:
            RetirementPermanentDisabilityRevisionTypeormEntity.build({
              id: source.retirementPermanentDisabilityRevisionId.toString(),
            } as RetirementPermanentDisabilityRevisionTypeormEntity),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
    ): GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult => {
      if (!source.retirementPermanentDisabilityRevision) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult.name,
          sourceClass:
            RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity.name,
        });
      }

      return GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult.build(
        {
          id: new RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId(
            source.id,
          ),
          competence: source.competence,
          amount: new DecimalValue(source.amount),
          reasonNotConsidered: source.reasonNotConsidered,
          action: source.action,
          retirementPermanentDisabilityRevisionId:
            new RetirementPermanentDisabilityRevisionId(
              source.retirementPermanentDisabilityRevision.id,
            ),
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          ...(source.deletedAt !== null && { deletedAt: source.deletedAt }),
        },
      );
    };

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
      GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
