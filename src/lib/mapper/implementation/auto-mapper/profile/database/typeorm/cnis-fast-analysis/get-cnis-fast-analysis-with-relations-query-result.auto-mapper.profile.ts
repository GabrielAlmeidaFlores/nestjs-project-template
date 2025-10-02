import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CnisFastAnalysisClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { GetCnisFastAnalysisClientWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-client/query/result/get-cnis-fast-analysis-client-with-relations.query.result';
import { GetCnisFastAnalysisResultQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/query/result/get-cnis-fast-analysis-result.query.result';
import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

@Injectable()
export class GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetCnisFastAnalysisWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisTypeormEntity,
    ): GetCnisFastAnalysisWithRelationsQueryResult => {
      const cnisFastAnalysisClient = this.mapper.map(
        source.cnisFastAnalysisClient,
        CnisFastAnalysisClientTypeormEntity,
        GetCnisFastAnalysisClientWithRelationsQueryResult,
      );

      const cnisFastAnalysisResult = this.mapper.map(
        source.cnisFastAnalysisResult,
        CnisFastAnalysisResultTypeormEntity,
        GetCnisFastAnalysisResultQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      return GetCnisFastAnalysisWithRelationsQueryResult.build({
        ...source,
        id: new CnisFastAnalysisId(source.id),
        cnisFastAnalysisClient,
        cnisFastAnalysisResult,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisTypeormEntity,
      GetCnisFastAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetCnisFastAnalysisWithRelationsQueryResult,
    ): CnisFastAnalysisTypeormEntity => {
      const cnisFastAnalysisClient = this.mapper.map(
        source.cnisFastAnalysisClient,
        GetCnisFastAnalysisClientWithRelationsQueryResult,
        CnisFastAnalysisClientTypeormEntity,
      );

      const cnisFastAnalysisResult = this.mapper.map(
        source.cnisFastAnalysisResult,
        GetCnisFastAnalysisResultQueryResult,
        CnisFastAnalysisResultTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      return CnisFastAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cnisFastAnalysisClient,
        cnisFastAnalysisResult,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetCnisFastAnalysisWithRelationsQueryResult,
      CnisFastAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
