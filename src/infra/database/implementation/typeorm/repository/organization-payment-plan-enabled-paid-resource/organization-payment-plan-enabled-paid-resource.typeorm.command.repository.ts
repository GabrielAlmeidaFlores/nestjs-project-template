import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/command/organization-payment-plan-enabled-paid-resource.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity';

@Injectable()
export class OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationPaymentPlanEnabledPaidResourceTypeormEntity>
  implements OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanEnabledPaidResourceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanEnabledPaidResourceTypeormEntity)
    repository: Repository<OrganizationPaymentPlanEnabledPaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationPaymentPlanEnabledPaidResource(
    props: OrganizationPaymentPlanEnabledPaidResourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationPaymentPlanEnabledPaidResourceEntity,
      OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
    );

    return this.create(mappedData);
  }
}
