import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AdminTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/admin.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdminCommandRepositoryGateway } from '@module/admin/account/domain/repository/admin/command/admin.command.repository.gateway';
import { AdminEntity } from '@module/admin/account/domain/schema/entity/admin/admin.entity';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';

@Injectable()
export class AdminTypeormCommandRepository
  extends BaseTypeormCommandRepository<AdminTypeormEntity>
  implements AdminCommandRepositoryGateway
{
  protected readonly _type = AdminTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AdminTypeormEntity)
    repository: Repository<AdminTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateAdmin(adminId: AdminId, props: AdminEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdminEntity,
      AdminTypeormEntity,
    );

    return this.update(adminId.toString(), mappedData);
  }

  public createAdmin(props: AdminEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdminEntity,
      AdminTypeormEntity,
    );

    return this.create(mappedData);
  }
}
