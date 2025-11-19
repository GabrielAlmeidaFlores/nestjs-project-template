import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdminQueryRepositoryGateway } from '@module/admin/account/domain/repository/admin/query/admin.query.repository.gateway';
import { GetAdminQueryResult } from '@module/admin/account/domain/repository/admin/query/result/get-admin.query.result';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class AdminTypeormQueryRepository
  extends BaseTypeormQueryRepository<AdminTypeormEntity>
  implements AdminQueryRepositoryGateway
{
  protected readonly _type = AdminTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AdminTypeormEntity)
    repository: Repository<AdminTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByAuthIdentityIdOrFail(
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAdminQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          authIdentity: {
            id: authIdentityId.toString(),
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AdminTypeormEntity,
      GetAdminQueryResult,
    );

    return mappedData;
  }

  public async findOneByAdminId(
    adminId: AdminId,
  ): Promise<GetAdminQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: adminId.toString(),
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      AdminTypeormEntity,
      GetAdminQueryResult,
    );

    return mappedData;
  }
}
