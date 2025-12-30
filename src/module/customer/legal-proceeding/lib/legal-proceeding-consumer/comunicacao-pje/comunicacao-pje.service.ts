import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { LegalProceedingDetailItemStatusEnum } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/comunicacao-pje/enum/legal-proceeding-detail-item-status.enum';
import { LegalProceedingDetailModel } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/comunicacao-pje/model/generic/legal-proceeding-detail.model';
import { LegalProceedingStatusEnum } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/enum/legal-proceeding-status.enum';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
import { LegalProceedingDataOutputModel } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/model/output/legal-proceeding-data.output.model';
import { LegalProceedingConsumerApplicationVariable } from '@shared/system/constant/application-variable/source/legal-proceeding-consumer.application-variable';

@Injectable()
export class ComunicacaoPjeService implements LegalProceedingConsumerGateway {
  protected readonly baseUrl: string;

  protected readonly _type = ComunicacaoPjeService.name;

  public constructor(private readonly httpService: HttpService) {
    this.baseUrl =
      LegalProceedingConsumerApplicationVariable.LEGAL_PROCEEDING_CONSUMER_COMUNICACAO_PJE_API_URL;
  }

  public async consumeByProcessNumber(
    legalProceedingNumber: string,
  ): Promise<object> {
    try {
      const response: AxiosResponse<object> = await firstValueFrom(
        this.httpService.get(this.baseUrl, {
          timeout: 8000,
          params: {
            numeroProcesso: legalProceedingNumber,
          },
        }),
      );

      return { ok: true, data: response.data };
    } catch (error: unknown) {
      let message = 'Erro desconhecido ao consultar o PJe';

      if (typeof error === 'object' && error !== null) {
        const maybeAxiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };

        message =
          maybeAxiosError.response?.data?.message ??
          maybeAxiosError.message ??
          message;
      }

      return { ok: false, error: message };
    }
  }

  public extractLegalProceedingData(
    detailJson: string,
  ): LegalProceedingDataOutputModel {
    const detailParsed = JSON.parse(detailJson) as LegalProceedingDetailModel;

    const items = detailParsed.data?.items ?? [];
    const lastItem = items.length > 0 ? items[items.length - 1] : null;

    const recipient = (lastItem?.destinatarios ?? []) as unknown as string[];
    const recipientLawyer = (lastItem?.destinatarioadvogados ??
      []) as unknown as string[];

    return LegalProceedingDataOutputModel.build({
      recipient,
      recipientLawyer,
    });
  }

  public extractLastItemStatus(
    detailJson: string,
  ): LegalProceedingStatusEnum | null {
    const detailParsed = JSON.parse(detailJson) as LegalProceedingDetailModel;

    const items = detailParsed.data?.items ?? [];
    const firstItem = items.length > 0 ? items[0] : null;
    const status = (firstItem as { status?: string } | null)?.status;

    if (status === LegalProceedingDetailItemStatusEnum.IN_PROGRESS) {
      return LegalProceedingStatusEnum.IN_PROGRESS;
    }

    if (status === LegalProceedingDetailItemStatusEnum.COMPLETED) {
      return LegalProceedingStatusEnum.COMPLETED;
    }

    return null;
  }
}
