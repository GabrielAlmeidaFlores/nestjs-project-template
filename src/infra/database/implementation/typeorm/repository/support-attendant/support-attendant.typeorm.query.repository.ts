import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import type { FindOptionsWhere } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { GetSupportAttendantByAuthIdentityIdQueryResult } from '@module/support/account/domain/repository/support-attendant/query/result/get-support-attendant-by-auth-identity-id.query.result';
import { GetSupportAttendantQueryResult } from '@module/support/account/domain/repository/support-attendant/query/result/get-support-attendant.query.result';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

import type { ListSupportAttendantsQueryParam } from '@module/support/account/domain/repository/support-attendant/query/param/list-support-attendants.query.param';

@Injectable()
export class SupportAttendantTypeormQueryRepository
  extends BaseTypeormQueryRepository<SupportAttendantTypeormEntity>
  implements SupportAttendantQueryRepositoryGateway
{
  protected readonly _type = SupportAttendantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SupportAttendantTypeormEntity)
    repository: Repository<SupportAttendantTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByAuthIdentityId(
    authIdentityId: AuthIdentityId,
  ): Promise<GetSupportAttendantByAuthIdentityIdQueryResult | null> {
    const supportAttendant = await this.findOne({
      where: {
        authIdentity: {
          id: authIdentityId.toString(),
        },
      },
    });

    if (supportAttendant === null) {
      return null;
    }

    return GetSupportAttendantByAuthIdentityIdQueryResult.build({
      id: new SupportAttendantId(supportAttendant.id),
      name: supportAttendant.name,
      supportType: supportAttendant.supportType,
    });
  }

  public async findOneSupportAttendantById(
    id: SupportAttendantId,
  ): Promise<GetSupportAttendantQueryResult | null> {
    const attendant = await this.findOne({
      where: { id: id.toString() },
    });

    if (attendant === null) {
      return null;
    }

    return GetSupportAttendantQueryResult.build({
      id: new SupportAttendantId(attendant.id),
      name: attendant.name,
      email: new Email(attendant.email),
      supportType: attendant.supportType,
      isActive: attendant.isActive,
      createdAt: attendant.createdAt,
      updatedAt: attendant.updatedAt,
    });
  }

  public async listSupportAttendants(
    queryParam: ListSupportAttendantsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportAttendantQueryResult>> {
    const whereConditions = this.buildListWhere(queryParam.search, queryParam.supportType);

    const paginationParam = new ListDataInputModel({
      page: queryParam.page,
      limit: queryParam.limit,
      sortField: queryParam.sortField,
    });

    const data = await this.list(
      paginationParam,
      whereConditions !== null ? { where: whereConditions } : undefined,
    );

    const resource = data.resource.map((attendant) =>
      GetSupportAttendantQueryResult.build({
        id: new SupportAttendantId(attendant.id),
        name: attendant.name,
        email: new Email(attendant.email),
        supportType: attendant.supportType,
        isActive: attendant.isActive,
        createdAt: attendant.createdAt,
        updatedAt: attendant.updatedAt,
      }),
    );

    return new ListDataOutputModel<GetSupportAttendantQueryResult>({
      ...data,
      resource,
    });
  }

  private buildListWhere(
    search: string | null,
    supportType: SupportTypeEnum | null,
  ): FindOptionsWhere<SupportAttendantTypeormEntity>[] | FindOptionsWhere<SupportAttendantTypeormEntity> | null {
    const hasSearch = search !== null;
    const hasSupportType = supportType !== null;

    if (hasSearch && hasSupportType) {
      return [
        { name: Like(`%${search}%`), supportType },
        { email: Like(`%${search}%`), supportType },
      ];
    }

    if (hasSearch) {
      return [
        { name: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
      ];
    }

    if (hasSupportType) {
      return { supportType };
    }

    return null;
  }
}
