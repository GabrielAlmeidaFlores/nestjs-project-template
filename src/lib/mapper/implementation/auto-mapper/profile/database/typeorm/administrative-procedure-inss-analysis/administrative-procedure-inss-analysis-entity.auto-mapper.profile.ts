import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AdministrativeProcedureInssAnalysisEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/administrative-procedure-inss-analysis.entity';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { AdministrativeProcedureInssAnalysisResultEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/administrative-procedure-inss-analysis-result.entity';

@Injectable()
export class AdministrativeProcedureInssAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    AdministrativeProcedureInssAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AdministrativeProcedureInssAnalysisTypeormEntity,
    ): AdministrativeProcedureInssAnalysisEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AdministrativeProcedureInssAnalysisEntity.name,
          sourceClass: AdministrativeProcedureInssAnalysisTypeormEntity.name,
        });
      }

      const administrativeProcedureInssAnalysisResult =
        source.administrativeProcedureInssAnalysisResult !== undefined
          ? this.mapper.map(
              source.administrativeProcedureInssAnalysisResult,
              AdministrativeProcedureInssAnalysisResultTypeormEntity,
              AdministrativeProcedureInssAnalysisResultEntity,
            )
          : null;

      return new AdministrativeProcedureInssAnalysisEntity({
        ...source,
        id: new AdministrativeProcedureInssAnalysisId(source.id),
        administrativeProcedureInssAnalysisResult,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      AdministrativeProcedureInssAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AdministrativeProcedureInssAnalysisEntity,
    ): AdministrativeProcedureInssAnalysisTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const administrativeProcedureInssAnalysisResult =
        source.administrativeProcedureInssAnalysisResult !== null
          ? this.mapper.map(
              source.administrativeProcedureInssAnalysisResult,
              AdministrativeProcedureInssAnalysisResultEntity,
              AdministrativeProcedureInssAnalysisResultTypeormEntity,
            )
          : undefined;

      return AdministrativeProcedureInssAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        administrativeProcedureInssAnalysisResult,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AdministrativeProcedureInssAnalysisEntity,
      AdministrativeProcedureInssAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
