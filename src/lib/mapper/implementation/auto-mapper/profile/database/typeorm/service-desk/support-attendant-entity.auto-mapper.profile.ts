import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportAttendantEntity } from '@module/customer/service-desk/domain/schema/entity/support-attendant/support-attendant.entity';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

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
    const convert = (
      source: SupportAttendantTypeormEntity,
    ): SupportAttendantEntity => {
      return new SupportAttendantEntity({
        id: new SupportAttendantId(source.id),
        name: source.name,
        email: source.email,
        supportType: source.supportType,
        isActive: source.isActive,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportAttendantTypeormEntity,
      SupportAttendantEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: SupportAttendantEntity,
    ): SupportAttendantTypeormEntity => {
      return SupportAttendantTypeormEntity.build({
        id: source.id.toString(),
        name: source.name,
        email: source.email,
        supportType: source.supportType,
        isActive: source.isActive,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      SupportAttendantEntity,
      SupportAttendantTypeormEntity,
      constructUsing(convert),
    );
  }
}
