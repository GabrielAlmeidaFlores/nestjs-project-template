import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { LegalProceedingStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/enum/legal-proceeding-status.enum';
import { ComunicacaoPjeLegalProceedingDetailItemStatusEnum } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/implementation/comunicacao-pje/enum/comunicacao-pje-legal-proceeding-detail-item-status.enum';
import { ComunicacaoPjeLegalProceedingDetailDataModel } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/implementation/comunicacao-pje/model/generic/comunicacao-pje-legal-proceeding-detail-item.model';
import { ComunicacaoPjeLegalProceedingDetailModel } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/implementation/comunicacao-pje/model/generic/comunicacao-pje-legal-proceeding-detail.model';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
import {
  LegalProceedingActionAdvogadoDetailOutputModel,
  LegalProceedingActionAdvogadoOutputModel,
  LegalProceedingActionDestinatarioOutputModel,
  LegalProceedingActionOutputModel,
} from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/model/output/legal-proceeding-action.output.model';
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

      return {
        ok: true,
        data: response.data,
      } as ComunicacaoPjeLegalProceedingDetailDataModel;
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
    const detailParsed = JSON.parse(
      detailJson,
    ) as ComunicacaoPjeLegalProceedingDetailDataModel;

    const items = detailParsed.data.items;
    const lastItem = items.length > 0 ? items[items.length - 1] : null;

    const recipient = (lastItem?.destinatarios ?? []) as unknown as object[];
    const recipientLawyer = (lastItem?.destinatarioadvogados ??
      []) as unknown as object[];

    const latestItem = detailParsed.data.items[0];

    let status: LegalProceedingStatusEnum | null = null;

    if (
      lastItem?.status ===
      ComunicacaoPjeLegalProceedingDetailItemStatusEnum.IN_PROGRESS
    ) {
      status = LegalProceedingStatusEnum.IN_PROGRESS;
    } else if (
      lastItem?.status ===
      ComunicacaoPjeLegalProceedingDetailItemStatusEnum.COMPLETED
    ) {
      status = LegalProceedingStatusEnum.COMPLETED;
    }

    const type = latestItem?.tipoComunicacao ?? undefined;
    const lastUpdated =
      latestItem?.datadisponibilizacao !== undefined
        ? new Date(latestItem.datadisponibilizacao)
        : undefined;

    const textContent = latestItem?.texto ?? undefined;

    const response = LegalProceedingDataOutputModel.build({
      recipient,
      recipientLawyer,
    });

    if (status !== null) {
      response.status = status;
    }

    if (textContent !== undefined) {
      response.textContent = textContent;
    }

    if (type !== undefined) {
      response.type = type;
    }

    const MIN_VALID_YEAR = 1900;
    if (
      lastUpdated !== undefined &&
      !isNaN(lastUpdated.getTime()) &&
      lastUpdated.getFullYear() >= MIN_VALID_YEAR
    ) {
      response.lastUpdated = lastUpdated;
    }

    return response;
  }

  public extractLastItemStatus(
    detailJson: string,
  ): LegalProceedingStatusEnum | null {
    const detailParsed = JSON.parse(
      detailJson,
    ) as ComunicacaoPjeLegalProceedingDetailModel;

    const items = detailParsed.data?.items ?? [];
    const firstItem = items.length > 0 ? items[0] : null;
    const status = (firstItem as { status?: string } | null)?.status;

    if (
      status === ComunicacaoPjeLegalProceedingDetailItemStatusEnum.IN_PROGRESS
    ) {
      return LegalProceedingStatusEnum.IN_PROGRESS;
    }

    if (
      status === ComunicacaoPjeLegalProceedingDetailItemStatusEnum.COMPLETED
    ) {
      return LegalProceedingStatusEnum.COMPLETED;
    }

    return null;
  }

  public extractActions(
    detailJson: string,
  ): LegalProceedingActionOutputModel[] {
    const detailParsed = JSON.parse(
      detailJson,
    ) as ComunicacaoPjeLegalProceedingDetailDataModel;

    const items = detailParsed.data.items;

    return items.map((rawItem) =>
      LegalProceedingActionOutputModel.build({
        id: String(rawItem.id),
        dataDisponibilizacao: rawItem.data_disponibilizacao,
        siglaTribunal: rawItem.siglaTribunal,
        tipoComunicacao: rawItem.tipoComunicacao,
        nomeOrgao: rawItem.nomeOrgao,
        texto: rawItem.texto,
        numeroProcesso: rawItem.numero_processo,
        meio: rawItem.meio,
        link: rawItem.link,
        tipoDocumento: rawItem.tipoDocumento,
        nomeClasse: rawItem.nomeClasse,
        codigoClasse: rawItem.codigoClasse,
        numeroComunicacao: String(rawItem.numeroComunicacao),
        ativo: String(rawItem.ativo),
        hash: rawItem.hash,
        datadisponibilizacao: rawItem.datadisponibilizacao,
        meiocompleto: rawItem.meiocompleto,
        numeroprocessocommascara: rawItem.numeroprocessocommascara,
        destinatarios: (rawItem.destinatarios ?? []).map((d: unknown) => {
          const dest = d as Record<string, unknown>;
          return LegalProceedingActionDestinatarioOutputModel.build({
            nome: dest['nome'] as string,
            polo: dest['polo'] as string,
            comunicacaoId: String(dest['comunicacao_id']),
          });
        }),
        destinatarioadvogados: (rawItem.destinatarioadvogados ?? []).map(
          (a: unknown) => {
            const adv = a as Record<string, unknown>;
            const advogado = adv['advogado'] as Record<string, unknown>;
            return LegalProceedingActionAdvogadoOutputModel.build({
              id: String(adv['id']),
              comunicacaoId: String(adv['comunicacao_id']),
              advogadoId: String(adv['advogado_id']),
              createdAt: adv['created_at'] as string,
              updatedAt: adv['updated_at'] as string,
              advogado: LegalProceedingActionAdvogadoDetailOutputModel.build({
                id: String(advogado['id']),
                nome: advogado['nome'] as string,
                numeroOab: advogado['numero_oab'] as string,
                ufOab: advogado['uf_oab'] as string,
              }),
            });
          },
        ),
      }),
    );
  }
}
