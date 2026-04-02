import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RegulatoryUpdateEmailPreferenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-email-preference.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { RegulatoryUpdateEmailPreferenceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/regulatory-update-email-preference.query.repository.gateway';
import { GetRegulatoryUpdateEmailPreferenceQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/result/get-regulatory-update-email-preference.query.result';

@Injectable()
export class RegulatoryUpdateEmailPreferenceTypeormQueryRepository
  extends BaseTypeormQueryRepository<RegulatoryUpdateEmailPreferenceTypeormEntity>
  implements RegulatoryUpdateEmailPreferenceQueryRepositoryGateway
{
  protected readonly _type =
    RegulatoryUpdateEmailPreferenceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RegulatoryUpdateEmailPreferenceTypeormEntity)
    repository: Repository<RegulatoryUpdateEmailPreferenceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetRegulatoryUpdateEmailPreferenceQueryResult | null> {
    const data = await this.findOne({
      where: { customer: { id: customerId.toString() } },
      relations: { customer: { authIdentity: true } },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      RegulatoryUpdateEmailPreferenceTypeormEntity,
      GetRegulatoryUpdateEmailPreferenceQueryResult,
    );
  }

  public async findAllWithEmailEnabled(): Promise<
    GetRegulatoryUpdateEmailPreferenceQueryResult[]
  > {
    const data = await this.find({
      where: { emailEnabled: true },
      relations: { customer: { authIdentity: true } },
    });

    return this.mapperGateway.mapArray(
      data,
      RegulatoryUpdateEmailPreferenceTypeormEntity,
      GetRegulatoryUpdateEmailPreferenceQueryResult,
    );
  }
}
