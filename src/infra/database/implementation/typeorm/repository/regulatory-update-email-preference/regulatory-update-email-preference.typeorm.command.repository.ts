import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { RegulatoryUpdateEmailPreferenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-email-preference.typeorm.entity';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { RegulatoryUpdateEmailPreferenceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/command/regulatory-update-email-preference.command.repository.gateway';
import { RegulatoryUpdateEmailPreferenceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/regulatory-update-email-preference.entity';

@Injectable()
export class RegulatoryUpdateEmailPreferenceTypeormCommandRepository
  extends BaseTypeormCommandRepository<RegulatoryUpdateEmailPreferenceTypeormEntity>
  implements RegulatoryUpdateEmailPreferenceCommandRepositoryGateway
{
  protected readonly _type =
    RegulatoryUpdateEmailPreferenceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RegulatoryUpdateEmailPreferenceTypeormEntity)
    repository: Repository<RegulatoryUpdateEmailPreferenceTypeormEntity>,
  ) {
    super(repository);
  }

  public upsertByCustomerId(
    customerId: CustomerId,
    props: RegulatoryUpdateEmailPreferenceEntity,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const repository = manager.getRepository(
        RegulatoryUpdateEmailPreferenceTypeormEntity,
      );

      const existing = await repository.findOne({
        where: { customer: { id: customerId.toString() } },
      });

      if (existing) {
        existing.emailEnabled = props.emailEnabled;
        existing.updatedAt = new Date();
        await repository.save(existing);
      } else {
        const newRecord = repository.create({
          id: props.id.toString(),
          emailEnabled: props.emailEnabled,
          customer: { id: customerId.toString() } as CustomerTypeormEntity,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await repository.save(newRecord);
      }
    };
  }
}
