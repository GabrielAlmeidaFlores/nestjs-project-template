import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ComunicacaoPjeService {
  protected readonly baseUrl: string;

  protected readonly _type = ComunicacaoPjeService.name;

  public constructor(private readonly httpService: HttpService) {
    this.baseUrl = 'https://comunicaapi.pje.jus.br/api/v1/comunicacao';
  }

  public async getLegalProceeding(
    legalProceedingNumber: string,
  ): Promise<{ ok: true; data: object } | { ok: false; error: string }> {
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
