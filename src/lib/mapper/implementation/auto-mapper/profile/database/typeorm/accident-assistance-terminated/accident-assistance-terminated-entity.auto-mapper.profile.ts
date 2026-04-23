import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AccidentAssistanceTerminatedEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/accident-assistance-terminated.entity';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';

@Injectable()
export class AccidentAssistanceTerminatedEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceTerminatedEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AccidentAssistanceTerminatedTypeormEntity,
    ): AccidentAssistanceTerminatedEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AccidentAssistanceTerminatedEntity.name,
          sourceClass: AccidentAssistanceTerminatedTypeormEntity.name,
        });
      }

      const accidentAssistanceTerminatedResult =
        source.accidentAssistanceTerminatedResult !== undefined
          ? this.mapper.map(
              source.accidentAssistanceTerminatedResult,
              AccidentAssistanceTerminatedResultTypeormEntity,
              AccidentAssistanceTerminatedResultEntity,
            )
          : null;

      return new AccidentAssistanceTerminatedEntity({
        id: new AccidentAssistanceTerminatedId(source.id),
        der: source.der,
        denialDate: source.denialDate,
        category: source.category,
        inssPassword: source.inssPassword,
        analysisName: source.analysisName,
        benefitCessationReason: source.benefitCessationReason,
        hadPreviousIncapacityBenefit: source.hadPreviousIncapacityBenefit,
        previousIncapacityBenefitNumber: source.previousIncapacityBenefitNumber,
        previousIncapacityBenefitStartDate:
          source.previousIncapacityBenefitStartDate,
        previousIncapacityBenefitEndDate:
          source.previousIncapacityBenefitEndDate,
        extensionRequestStatus: source.extensionRequestStatus,
        accidentAssistanceTerminatedResult,
        accidentAssistanceTerminatedBenefit: [],
        accidentAssistanceTerminatedLegalProceeding: [],
        accidentAssistanceTerminatedDocument: [],
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedTypeormEntity,
      AccidentAssistanceTerminatedEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AccidentAssistanceTerminatedEntity,
    ): AccidentAssistanceTerminatedTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const accidentAssistanceTerminatedResult =
        source.accidentAssistanceTerminatedResult !== null
          ? this.mapper.map(
              source.accidentAssistanceTerminatedResult,
              AccidentAssistanceTerminatedResultEntity,
              AccidentAssistanceTerminatedResultTypeormEntity,
            )
          : undefined;

      return AccidentAssistanceTerminatedTypeormEntity.build({
        id: source.id.toString(),
        der: source.der,
        denialDate: source.denialDate,
        category: source.category,
        inssPassword: source.inssPassword,
        analysisName: source.analysisName,
        benefitCessationReason: source.benefitCessationReason,
        hadPreviousIncapacityBenefit: source.hadPreviousIncapacityBenefit,
        previousIncapacityBenefitNumber: source.previousIncapacityBenefitNumber,
        previousIncapacityBenefitStartDate:
          source.previousIncapacityBenefitStartDate,
        previousIncapacityBenefitEndDate:
          source.previousIncapacityBenefitEndDate,
        extensionRequestStatus: source.extensionRequestStatus,
        accidentAssistanceTerminatedResult,
        accidentAssistanceTerminatedBenefit: undefined,
        accidentAssistanceTerminatedLegalProceeding: undefined,
        accidentAssistanceTerminatedDocument: undefined,
        analysisToolRecord: undefined,
        createdBy,
        updatedBy,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedEntity,
      AccidentAssistanceTerminatedTypeormEntity,
      mappingFunction,
    );
  }
}
