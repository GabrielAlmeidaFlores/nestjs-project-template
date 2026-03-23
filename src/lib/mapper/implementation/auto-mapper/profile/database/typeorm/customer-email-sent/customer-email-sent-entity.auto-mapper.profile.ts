import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationMemberId as OrganizationMemberIdValueObject } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CustomerEmailSentEntity } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/customer-email-sent.entity';
import { CustomerEmailSentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/value-object/customer-email-sent-id/customer-email-sent-id.value-object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

@Injectable()
export class CustomerEmailSentEntityAutoMapperProfile {
  protected readonly _type = CustomerEmailSentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerEmailSentTypeormEntity,
    ): CustomerEmailSentEntity => {
      const sentBy: OrganizationMemberId | null = source.sentBy
        ? new OrganizationMemberIdValueObject(source.sentBy.id)
        : null;

      return new CustomerEmailSentEntity({
        ...source,
        id: new CustomerEmailSentId(source.id),
        sentBy,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerEmailSentTypeormEntity,
      CustomerEmailSentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CustomerEmailSentEntity,
    ): CustomerEmailSentTypeormEntity => {
      const sentBy = source.sentBy
        ? ({ id: source.sentBy.toString() } as OrganizationMemberTypeormEntity)
        : undefined;

      return CustomerEmailSentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        sentBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CustomerEmailSentEntity,
      CustomerEmailSentTypeormEntity,
      mappingFunction,
    );
  }
}
