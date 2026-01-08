import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/query/organization-payment-plan-enabled-paid-resource.query.repository.gateway';
import { GetOrganizationPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/query/result/get-organization-payment-plan-enabled-paid-resource.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

@Injectable()
export class OrganizationPaymentPlanEnabledPaidResourceTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationPaymentPlanEnabledPaidResourceTypeormEntity>
  implements OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanEnabledPaidResourceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanEnabledPaidResourceTypeormEntity)
    repository: Repository<OrganizationPaymentPlanEnabledPaidResourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyByOrganizationPaymentPlanId(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanEnabledPaidResourceQueryResult[]> {
    const data = await this.repository.find({
      where: {
        organizationPaymentPlan: {
          id: organizationPaymentPlanId.toString(),
        },
      },
      relations: ['organizationPaymentPlan', 'paymentPlanPaidResource'],
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
      GetOrganizationPaymentPlanEnabledPaidResourceQueryResult,
    );

    return mappedData;
  }
}
