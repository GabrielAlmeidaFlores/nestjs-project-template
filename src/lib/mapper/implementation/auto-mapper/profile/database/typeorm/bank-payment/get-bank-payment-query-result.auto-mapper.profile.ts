import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class GetBankPaymentQueryResultAutoMapperProfile {
  protected readonly _type = GetBankPaymentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: BankPaymentTypeormEntity,
    ): GetBankPaymentQueryResult => {
      return GetBankPaymentQueryResult.build({
        id: new BankPaymentId(source.id),
        bankExternalId: source.bankExternalId,
        paymentMethod: source.paymentMethod,
        amount: new DecimalValue(source.amount),
        status: source.status,
        dueDate: source.dueDate,
        paymentDate: source.paymentDate,
        description: source.description,
        paymentReceipt: source.paymentReceipt,
        installmentNumber: source.installmentNumber,
        pixQrCode:
          source.pixQrCode !== null && source.pixQrCode !== ''
            ? new Base64(source.pixQrCode)
            : null,
        pixCopyPaste: source.pixCopyPaste,
        bankSlipUrl: source.bankSlipUrl,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      BankPaymentTypeormEntity,
      GetBankPaymentQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetBankPaymentQueryResult,
    ): BankPaymentTypeormEntity => {
      return BankPaymentTypeormEntity.build({
        id: source.id.toString(),
        bankExternalId: source.bankExternalId,
        paymentMethod: source.paymentMethod,
        amount: source.amount.toString(),
        status: source.status,
        dueDate: source.dueDate,
        paymentDate: source.paymentDate,
        installmentNumber: source.installmentNumber,
        description: source.description,
        paymentReceipt: source.paymentReceipt,
        pixQrCode: source.pixQrCode?.toString() ?? null,
        pixCopyPaste: source.pixCopyPaste,
        bankSlipUrl: source.bankSlipUrl,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetBankPaymentQueryResult,
      BankPaymentTypeormEntity,
      mappingFunction,
    );
  }
}
