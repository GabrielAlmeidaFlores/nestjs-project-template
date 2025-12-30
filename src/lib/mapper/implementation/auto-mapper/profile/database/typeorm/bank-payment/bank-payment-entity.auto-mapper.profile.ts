import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class BankPaymentEntityAutoMapperProfile {
  protected readonly _type = BankPaymentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BankPaymentTypeormEntity,
    ): BankPaymentEntity => {
      return new BankPaymentEntity({
        id: new BankPaymentId(source.id),
        bankExternalId: source.bankExternalId,
        paymentMethod: source.paymentMethod,
        amount: new DecimalValue(source.amount),
        status: source.status,
        dueDate: source.dueDate,
        paymentDate: source.paymentDate,
        installmentNumber: source.installmentNumber,
        pixQrCode:
          source.pixQrCode !== null && source.pixQrCode !== ''
            ? new Base64(source.pixQrCode)
            : null,
        pixCopyPaste: source.pixCopyPaste,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      BankPaymentTypeormEntity,
      BankPaymentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BankPaymentEntity,
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
        pixQrCode: source.pixQrCode?.toString() ?? null,
        description: source.description,
        paymentReceipt: source.paymentReceipt,
        pixCopyPaste: source.pixCopyPaste,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      BankPaymentEntity,
      BankPaymentTypeormEntity,
      mappingFunction,
    );
  }
}
