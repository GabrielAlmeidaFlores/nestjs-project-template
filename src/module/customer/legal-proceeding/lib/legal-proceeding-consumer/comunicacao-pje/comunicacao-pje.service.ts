import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
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
}
