import { Inject, Injectable } from '@nestjs/common';

import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';
import { AsaasWebhookTransferAuthorizationRequestDto } from '@module/generic/bank/dto/request/asaas-webhook-transfer-authorization.request.dto';
import { AsaasWebhookTransferAuthorizationResponseDto } from '@module/generic/bank/dto/response/asaas-webhook-transfer-authorization.response.dto';
import { TransferAuthorizationStatusEnum } from '@module/generic/bank/enum/transfer-authorization-status.enum';

@Injectable()
export class ProcessAsaasWebhookTransferAuthorizationUseCase {
  protected readonly _type =
    ProcessAsaasWebhookTransferAuthorizationUseCase.name;

  public constructor(
    @Inject(BankTransferQueryRepositoryGateway)
    private readonly bankTransferQueryRepository: BankTransferQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: AsaasWebhookTransferAuthorizationRequestDto,
  ): Promise<AsaasWebhookTransferAuthorizationResponseDto> {
    if (
      dto.transfer.externalReference === undefined ||
      dto.transfer.externalReference === ''
    ) {
      return AsaasWebhookTransferAuthorizationResponseDto.build({
        status: TransferAuthorizationStatusEnum.DENIED,
      });
    }

    let bankTransferId: BankTransferId;

    try {
      bankTransferId = new BankTransferId(dto.transfer.externalReference);
    } catch {
      return AsaasWebhookTransferAuthorizationResponseDto.build({
        status: TransferAuthorizationStatusEnum.DENIED,
      });
    }

    const transfer =
      await this.bankTransferQueryRepository.findOneById(bankTransferId);

    return AsaasWebhookTransferAuthorizationResponseDto.build({
      status:
        transfer !== null
          ? TransferAuthorizationStatusEnum.APPROVED
          : TransferAuthorizationStatusEnum.DENIED,
    });
  }
}
