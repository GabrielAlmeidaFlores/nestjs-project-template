import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SupportAttendantCommandRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/command/support-attendant.command.repository.gateway';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportAttendantEntity } from '@module/customer/service-desk/domain/schema/entity/support-attendant/support-attendant.entity';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

@Injectable()
export class SupportAttendantTypeormCommandRepository
  extends BaseTypeormCommandRepository<SupportAttendantTypeormEntity>
  implements SupportAttendantCommandRepositoryGateway
{
  protected readonly _type = SupportAttendantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SupportAttendantTypeormEntity)
    repository: Repository<SupportAttendantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSupportAttendant(
    props: SupportAttendantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SupportAttendantEntity,
      SupportAttendantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSupportAttendant(
    supportAttendantId: SupportAttendantId,
    name: string,
    email: string,
    supportType: SupportTypeEnum,
  ): TransactionType {
    return this.update(supportAttendantId.toString(), {
      name,
      email,
      supportType,
    });
  }

  public updateSupportAttendantStatus(
    supportAttendantId: SupportAttendantId,
    isActive: boolean,
  ): TransactionType {
    return this.update(supportAttendantId.toString(), { isActive });
  }

  public updateSupportAttendantAndAuthIdentityIsActive(
    supportAttendantId: SupportAttendantId,
    isActive: boolean,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as {
        query: (sql: string, params: unknown[]) => Promise<unknown>;
      };

      await manager.query(
        `UPDATE support_attendant sa
         INNER JOIN auth_identity ai ON ai.support_attendant_id = sa.id
         SET sa.is_active = ?, ai.is_active = ?
         WHERE sa.id = ?`,
        [isActive, isActive, supportAttendantId.toString()],
      );
    };
  }
}
