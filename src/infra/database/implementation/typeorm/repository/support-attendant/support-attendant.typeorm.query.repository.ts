import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { GetSupportAttendantByAuthIdentityIdQueryResult } from '@module/support/account/domain/repository/support-attendant/query/result/get-support-attendant-by-auth-identity-id.query.result';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';

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
      name: supportAttendant.name,
      supportType: supportAttendant.supportType,
    });
  }
}
