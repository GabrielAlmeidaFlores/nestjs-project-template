import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationPaymentPlanEnablePaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enable-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationPaymentPlanEnablePaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enable-paid-resource/command/organization-payment-plan-enable-paid-resource.repository.gateway';
import { OrganizationPaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource.entity';

@Injectable()
export class OrganizationPaymentPlanEnablePaidResourceTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationPaymentPlanEnablePaidResourceTypeormEntity>
  implements OrganizationPaymentPlanEnablePaidResourceCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanEnablePaidResourceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanEnablePaidResourceTypeormEntity)
    repository: Repository<OrganizationPaymentPlanEnablePaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationPaymentPlanEnablePaidResource(
    props: OrganizationPaymentPlanEnablePaidResourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationPaymentPlanEnablePaidResourceEntity,
      OrganizationPaymentPlanEnablePaidResourceTypeormEntity,
    );

    return this.create(mappedData);
  }
}
