import { Constructor } from '@automapper/core';
import { NotFound } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { GetOrganizationPaymentPlanBankPaymentQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/result/get-organization-payment-plan-bank-payment.query.result';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class OrganizationPaymentPlanBankPaymentTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationPaymentPlanBankPaymentTypeormEntity>
  implements OrganizationPaymentPlanBankPaymentQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanBankPaymentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanBankPaymentTypeormEntity)
    repository: Repository<OrganizationPaymentPlanBankPaymentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listOrganizationPaymentPlanBankPayment(
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetOrganizationPaymentPlanBankPaymentQueryResult>
  > {
    const data = await this.list(listData, {
      relations: {
        bankPayment: true,
        organizationPaymentPlan: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationPaymentPlanBankPaymentQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneOrganizationPaymentPlanBankPaymentByBankExternalId(
    bankExternalId: string,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult | null> {
    const data = await this.findOne({
      where: {
        organizationPaymentPlan: {
          bankExternalId: bankExternalId,
        },
      },
      relations: ['organizationPaymentPlan', 'bankPayment'],
    });

    if (!data) {
      return null;
    }

    const resource = this.mapperGateway.map(
      data,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
    );

    return resource;
  }

  public async findOneOrganizationPaymentPlanBankPaymentByIdOrFail(
    id: OrganizationPaymentPlanBankPaymentId,
    err: Constructor<NotFound>,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
        relations: ['organizationPaymentPlan', 'bankPayment'],
      },
      err,
    );

    const resource = this.mapperGateway.map(
      data,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
    );

    return resource;
  }

  public async findOneOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult | null> {
    const data = await this.findOne({
      where: {
        organizationPaymentPlan: {
          id: organizationPaymentPlanId.toString(),
        },
      },
      relations: ['organizationPaymentPlan', 'bankPayment'],
    });

    if (!data) {
      return null;
    }

    const resource = this.mapperGateway.map(
      data,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
    );

    return resource;
  }

  public async findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult | null> {
    const data = await this.findOne({
      where: {
        bankPayment: {
          id: bankPaymentId.toString(),
        },
        organizationPaymentPlan: {
          canceled: false,
        },
      },
      relations: ['organizationPaymentPlan', 'bankPayment'],
    });

    if (!data) {
      return null;
    }

    const resource = this.mapperGateway.map(
      data,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
    );

    return resource;
  }

  public async findManyOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult[]> {
    const data = await this.repository.find({
      where: {
        organizationPaymentPlan: {
          id: organizationPaymentPlanId.toString(),
        },
      },
      relations: ['organizationPaymentPlan', 'bankPayment'],
      order: {
        createdAt: 'DESC',
      },
    });

    const resources = this.mapperGateway.mapArray(
      data,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
    );

    return resources;
  }

  public async findManyOrganizationPaymentPlanBankPaymentByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetOrganizationPaymentPlanBankPaymentQueryResult[]> {
    const data = await this.repository.find({
      where: {
        bankPayment: {
          id: bankPaymentId.toString(),
        },
      },
      relations: ['organizationPaymentPlan', 'bankPayment'],
      order: {
        createdAt: 'DESC',
      },
    });
    return this.mapperGateway.mapArray(
      data,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
      GetOrganizationPaymentPlanBankPaymentQueryResult,
    );
  }
}
