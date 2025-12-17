import { Constructor } from '@automapper/core';
import { NotFound } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class BankPaymentTypeormQueryRepository
  extends BaseTypeormQueryRepository<BankPaymentTypeormEntity>
  implements BankPaymentQueryRepositoryGateway
{
  protected readonly _type = BankPaymentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(BankPaymentTypeormEntity)
    repository: Repository<BankPaymentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listBankPayment(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetBankPaymentQueryResult>> {
    const data = await this.list(listData);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      BankPaymentTypeormEntity,
      GetBankPaymentQueryResult,
    );

    return new ListDataOutputModel<GetBankPaymentQueryResult>({
      ...data,
      resource: mappedData,
    });
  }

  public async findOneBankPaymentByIdOrFail(
    id: BankPaymentId,
    err: Constructor<NotFound>,
  ): Promise<GetBankPaymentQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
      },
      err,
    );

    const resource = this.mapperGateway.map(
      data,
      BankPaymentTypeormEntity,
      GetBankPaymentQueryResult,
    );

    return resource;
  }

  public async findOneBankPaymentByBankExternalId(
    bankExternalId: string,
  ): Promise<GetBankPaymentQueryResult | null> {
    const data = await this.findOne({
      where: {
        bankExternalId,
      },
    });

    if (!data) {
      return null;
    }

    const resource = this.mapperGateway.map(
      data,
      BankPaymentTypeormEntity,
      GetBankPaymentQueryResult,
    );

    return resource;
  }

  public async findManyBankPaymentByIds(
    ids: BankPaymentId[],
  ): Promise<GetBankPaymentQueryResult[]> {
    if (ids.length === 0) {
      return [];
    }

    const data = await this.repository.findByIds(
      ids.map((id) => id.toString()),
    );

    const resources = this.mapperGateway.mapArray(
      data,
      BankPaymentTypeormEntity,
      GetBankPaymentQueryResult,
    );

    return resources;
  }
}
