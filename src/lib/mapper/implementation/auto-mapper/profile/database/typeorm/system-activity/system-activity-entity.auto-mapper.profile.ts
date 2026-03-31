import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SystemActivitiesTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-activities.typeorm.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { SystemActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/system-activity/system-activity.entity';
import { SystemActivityId } from '@module/customer/analysis-tool/domain/schema/entity/system-activity/value-object/system-activity-id/system-activity-id.value-object';

@Injectable()
export class SystemActivityEntityAutoMapperProfile {
  protected readonly _type = SystemActivityEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToDomainEntity();
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SystemActivityEntity,
    ): SystemActivitiesTypeormEntity => {
      const organizationMember = source.organizationMemberId
        ? ({
            id: source.organizationMemberId.toString(),
          } as OrganizationMemberTypeormEntity)
        : null;

      const analysisToolClient = source.analysisToolClientId
        ? ({
            id: source.analysisToolClientId.toString(),
          } as AnalysisToolClientTypeormEntity)
        : null;

      const analysisToolRecord = source.analysisToolRecordId
        ? ({
            id: source.analysisToolRecordId.toString(),
          } as AnalysisToolRecordTypeormEntity)
        : null;

      return SystemActivitiesTypeormEntity.build({
        id: source.id.toString(),
        title: source.title,
        description: source.description,
        organizationMember,
        analysisToolClient,
        analysisToolRecord,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SystemActivityEntity,
      SystemActivitiesTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SystemActivitiesTypeormEntity,
    ): SystemActivityEntity =>
      new SystemActivityEntity({
        ...source,
        id: new SystemActivityId(source.id),
        organizationMemberId: source.organizationMember
          ? new OrganizationMemberId(source.organizationMember.id)
          : null,
        analysisToolClientId: source.analysisToolClient
          ? new AnalysisToolClientId(source.analysisToolClient.id)
          : null,
        analysisToolRecordId: source.analysisToolRecord
          ? new AnalysisToolRecordId(source.analysisToolRecord.id)
          : null,
      });

    createMap(
      this.mapper,
      SystemActivitiesTypeormEntity,
      SystemActivityEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }
}
