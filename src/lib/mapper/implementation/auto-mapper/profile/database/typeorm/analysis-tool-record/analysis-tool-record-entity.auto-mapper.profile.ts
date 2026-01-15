import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

@Injectable()
export class AnalysisToolRecordEntityAutoMapperProfile {
  protected readonly _type = AnalysisToolRecordEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: AnalysisToolRecordTypeormEntity,
    ): AnalysisToolRecordEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AnalysisToolRecordEntity.name,
          sourceClass: CnisFastAnalysisTypeormEntity.name,
        });
      }

      const cnisFastAnalysis = source.cnisFastAnalysis
        ? this.mapper.map(
            source.cnisFastAnalysis,
            CnisFastAnalysisTypeormEntity,
            CnisFastAnalysisEntity,
          )
        : null;

      const retirementPlanningRpps = source.retirementPlanningRpps
        ? this.mapper.map(
            source.retirementPlanningRpps,
            RetirementPlanningRppsTypeormEntity,
            RetirementPlanningRppsEntity,
          )
        : null;

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        AnalysisToolClientEntity,
      );

      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityTypeormEntity,
        SpecialActivityEntity,
      );

      return new AnalysisToolRecordEntity({
        ...source,
        id: new AnalysisToolRecordId(source.id),
        code: new AnalysisToolRecordCode(source.code),
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        specialActivity,
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
        analysisToolClient,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      AnalysisToolRecordTypeormEntity,
      AnalysisToolRecordEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: AnalysisToolRecordEntity,
    ): AnalysisToolRecordTypeormEntity => {
      const cnisFastAnalysis = source.cnisFastAnalysis
        ? this.mapper.map(
            source.cnisFastAnalysis,
            CnisFastAnalysisEntity,
            CnisFastAnalysisTypeormEntity,
          )
        : null;

      const retirementPlanningRpps = source.retirementPlanningRpps
        ? this.mapper.map(
            source.retirementPlanningRpps,
            RetirementPlanningRppsEntity,
            RetirementPlanningRppsTypeormEntity,
          )
        : null;

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsEntity,
        RetirementPlanningRgpsTypeormEntity,
      );

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityEntity,
        SpecialActivityTypeormEntity,
      );

      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      return AnalysisToolRecordTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        code: source.code.toString(),
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        specialActivity,
        analysisToolClient,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      AnalysisToolRecordEntity,
      AnalysisToolRecordTypeormEntity,
      mappingFunction,
    );
  }
}
