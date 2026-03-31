import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { SupportAttendantEntity } from '@module/support/account/domain/schema/entity/support-attendant/support-attendant.entity';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

@Injectable()
export class SupportAttendantEntityAutoMapperProfile {
  protected readonly _type = SupportAttendantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SupportAttendantTypeormEntity,
    ): SupportAttendantEntity =>
      new SupportAttendantEntity({
        ...source,
        id: new SupportAttendantId(source.id),
        authIdentityId: source.authIdentity
          ? new AuthIdentityId(source.authIdentity.id)
          : null,
      });

    createMap(
      this.mapper,
      SupportAttendantTypeormEntity,
      SupportAttendantEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SupportAttendantEntity,
    ): SupportAttendantTypeormEntity => {
      const authIdentity = source.authIdentityId
        ? ({
            id: source.authIdentityId.toString(),
          } as AuthIdentityTypeormEntity)
        : undefined;

      return SupportAttendantTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        authIdentity,
      });
    };

    createMap(
      this.mapper,
      SupportAttendantEntity,
      SupportAttendantTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
