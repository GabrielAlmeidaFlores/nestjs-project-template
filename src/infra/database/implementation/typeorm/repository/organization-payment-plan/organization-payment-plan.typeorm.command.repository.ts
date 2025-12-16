import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

@Injectable()
export class OrganizationPaymentPlanTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationPaymentPlanTypeormEntity>
  implements OrganizationPaymentPlanCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanTypeormEntity)
    repository: Repository<OrganizationPaymentPlanTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationPaymentPlan(
    props: OrganizationPaymentPlanEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationPaymentPlanEntity,
      OrganizationPaymentPlanTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteOrganizationPaymentPlan(
    id: OrganizationPaymentPlanId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
