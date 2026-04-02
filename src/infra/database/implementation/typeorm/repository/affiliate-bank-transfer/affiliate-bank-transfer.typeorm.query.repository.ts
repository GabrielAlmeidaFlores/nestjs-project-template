import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AffiliateBankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-bank-transfer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { GetAffiliateBankTransferQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/result/get-affiliate-bank-transfer.query.result';
import { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class AffiliateBankTransferTypeormQueryRepository
  extends BaseTypeormQueryRepository<AffiliateBankTransferTypeormEntity>
  implements AffiliateBankTransferQueryRepositoryGateway
{
  protected readonly _type = AffiliateBankTransferTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AffiliateBankTransferTypeormEntity)
    repository: Repository<AffiliateBankTransferTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetAffiliateBankTransferQueryResult | null> {
    const entity = await this.findOne({
      where: { bankPayment: { id: bankPaymentId.toString() } },
      relations: ['affiliatePlanCommission', 'bankPayment', 'bankTransfer'],
    });

    if (entity === null) {
      return null;
    }

    return this.mapperGateway.map(
      entity,
      AffiliateBankTransferTypeormEntity,
      GetAffiliateBankTransferQueryResult,
    );
  }

  public async findOneByAffiliatePlanCommissionId(
    commissionId: OrganizationPaymentPlanAffiliateCommissionId,
  ): Promise<GetAffiliateBankTransferQueryResult | null> {
    const entity = await this.findOne({
      where: {
        affiliatePlanCommission: { id: commissionId.toString() },
      },
      relations: ['affiliatePlanCommission', 'bankPayment', 'bankTransfer'],
    });

    if (entity === null) {
      return null;
    }

    return this.mapperGateway.map(
      entity,
      AffiliateBankTransferTypeormEntity,
      GetAffiliateBankTransferQueryResult,
    );
  }

  public async findManyByAffiliatePlanCommissionIds(
    commissionIds: OrganizationPaymentPlanAffiliateCommissionId[],
  ): Promise<GetAffiliateBankTransferQueryResult[]> {
    if (commissionIds.length === 0) {
      return [];
    }

    const entities = await this.find({
      where: {
        affiliatePlanCommission: {
          id: In(commissionIds.map((id) => id.toString())),
        },
      },
      relations: ['affiliatePlanCommission', 'bankPayment', 'bankTransfer'],
    });

    return this.mapperGateway.mapArray(
      entities,
      AffiliateBankTransferTypeormEntity,
      GetAffiliateBankTransferQueryResult,
    );
  }
}
