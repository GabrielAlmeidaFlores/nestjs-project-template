import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { SpecialRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/command/special-retirement-grant.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

@Injectable()
export class SpecialRetirementGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantTypeormEntity>
  implements SpecialRetirementGrantCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantTypeormEntity)
    repository: Repository<SpecialRetirementGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrant(
    props: SpecialRetirementGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantEntity,
      SpecialRetirementGrantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSpecialRetirementGrant(
    id: SpecialRetirementGrantId,
    props: SpecialRetirementGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantEntity,
      SpecialRetirementGrantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSpecialRetirementGrant(
    id: SpecialRetirementGrantId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
