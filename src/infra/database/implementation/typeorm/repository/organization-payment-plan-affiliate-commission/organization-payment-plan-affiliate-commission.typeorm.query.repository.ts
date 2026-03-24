import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { ListAffiliateCommissionsQueryParam } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/param/list-affiliate-commissions.query.param';
import { GetOrganizationPaymentPlanAffiliateCommissionQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/result/get-organization-payment-plan-affiliate-commission.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

import type { FindOptionsWhere } from 'typeorm';

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

  public async findManyByAffiliateCustomerIdWithFilters(
    affiliateCustomerId: AffiliateCustomerId,
    filters: ListAffiliateCommissionsQueryParam,
  ): Promise<GetOrganizationPaymentPlanAffiliateCommissionQueryResult[]> {
    const where: FindOptionsWhere<OrganizationPaymentPlanAffiliateCommissionTypeormEntity> =
      { affiliateCustomer: { id: affiliateCustomerId.toString() } };

    if (filters.plan !== null) {
      where.organizationPaymentPlan = { id: filters.plan.toString() };
    }

    if (filters.startDate !== null && filters.endDate !== null) {
      where.createdAt = Between(filters.startDate, filters.endDate);
    } else if (filters.startDate !== null) {
      where.createdAt = MoreThanOrEqual(filters.startDate);
    } else if (filters.endDate !== null) {
      where.createdAt = LessThanOrEqual(filters.endDate);
    }

    const relations = ['organizationPaymentPlan', 'affiliateCustomer'];

    if (filters.searchBy !== null) {
      relations.push(
        'organizationPaymentPlan.organization',
        'organizationPaymentPlan.organization.organizationMember',
        'organizationPaymentPlan.organization.organizationMember.customer',
        'organizationPaymentPlan.organization.organizationMember.customer.authIdentity',
      );
    }

    let entities = await this.find({ where, relations });

    if (filters.searchBy !== null) {
      const search = filters.searchBy.toLowerCase();
      entities = entities.filter((entity) => {
        const members =
          entity.organizationPaymentPlan?.organization?.organizationMember ??
          [];
        return members.some((member) => {
          const name = member.customer?.name.toLowerCase() ?? '';
          const email =
            member.customer?.authIdentity?.email.toLowerCase() ?? '';
          return name.includes(search) || email.includes(search);
        });
      });
    }

    return this.mapperGateway.mapArray(
      entities,
      OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
      GetOrganizationPaymentPlanAffiliateCommissionQueryResult,
    );
  }
}
