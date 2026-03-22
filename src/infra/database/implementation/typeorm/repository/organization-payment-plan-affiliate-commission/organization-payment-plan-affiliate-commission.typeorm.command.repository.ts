import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/command/organization-payment-plan-affiliate-commission.command.repository.gateway';
import { OrganizationPaymentPlanAffiliateCommissionEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.entity';

@Injectable()
export class OrganizationPaymentPlanAffiliateCommissionTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationPaymentPlanAffiliateCommissionTypeormEntity>
  implements OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanAffiliateCommissionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanAffiliateCommissionTypeormEntity)
    repository: Repository<OrganizationPaymentPlanAffiliateCommissionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationPaymentPlanAffiliateCommission(
    props: OrganizationPaymentPlanAffiliateCommissionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationPaymentPlanAffiliateCommissionEntity,
      OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
    );

    return this.create(mappedData);
  }
}
