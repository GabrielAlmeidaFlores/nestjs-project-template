import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberCollaboratorQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-collaborator.query.result';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

@Injectable()
export class GetOrganizationMemberCollaboratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetOrganizationMemberCollaboratorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: OrganizationMemberTypeormEntity,
    ): GetOrganizationMemberCollaboratorQueryResult => {
      if (!source.customer?.authIdentity) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetOrganizationMemberCollaboratorQueryResult.name,
          sourceClass: OrganizationMemberTypeormEntity.name,
        });
      }

      return GetOrganizationMemberCollaboratorQueryResult.build({
        organizationMemberId: new OrganizationMemberId(source.id),
        name: source.customer.name,
        email: new Email(source.customer.authIdentity.email),
        federalDocument: new FederalDocument(
          source.customer.authIdentity.federalDocument,
        ),
        registrationDate: source.createdAt,
        isActive: Boolean(source.isActive),
      });
    };

    createMap(
      this.mapper,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberCollaboratorQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
