import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { GetOrganizationPaymentPlanAffiliateCommissionQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/result/get-organization-payment-plan-affiliate-commission.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

@Injectable()
export class OrganizationPaymentPlanAffiliateCommissionTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationPaymentPlanAffiliateCommissionTypeormEntity>
  implements OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanAffiliateCommissionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanAffiliateCommissionTypeormEntity)
    repository: Repository<OrganizationPaymentPlanAffiliateCommissionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByOrganizationPaymentPlanId(
    id: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanAffiliateCommissionQueryResult | null> {
    const entity = await this.findOne({
      where: { organizationPaymentPlan: { id: id.toString() } },
      relations: ['organizationPaymentPlan', 'affiliateCustomer'],
    });

    if (entity === null) {
      return null;
    }

    return this.mapperGateway.map(
      entity,
      OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
      GetOrganizationPaymentPlanAffiliateCommissionQueryResult,
    );
  }

  public async findManyByAffiliateCustomerId(
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetOrganizationPaymentPlanAffiliateCommissionQueryResult[]> {
    const entities = await this.find({
      where: { affiliateCustomer: { id: affiliateCustomerId.toString() } },
      relations: ['organizationPaymentPlan', 'affiliateCustomer'],
    });

    return this.mapperGateway.mapArray(
      entities,
      OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
      GetOrganizationPaymentPlanAffiliateCommissionQueryResult,
    );
  }
}
