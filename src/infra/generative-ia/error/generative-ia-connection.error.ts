import { UnexpectedError } from '@core/error/unexpected.error';

export class GenerativeIaConnectionError extends UnexpectedError {
  protected override readonly _type = GenerativeIaConnectionError.name;

  public constructor(props?: { originalError?: string }) {
    const message =
      'Falha ao conectar com o serviço de IA generativa. Possíveis causas:\n' +
      '• Problema de rede ou conectividade\n' +
      '• Arquivo muito grande sendo processado (limite: ~20MB por arquivo)\n' +
      '• Timeout da requisição (limite: ~5 minutos)\n' +
      '• Configuração de proxy/firewall bloqueando a conexão\n\n' +
      'Por favor, tente novamente em alguns instantes. Se o problema persistir, ' +
      'verifique o tamanho dos arquivos enviados ou contate o suporte técnico.' +
      (props?.originalError !== undefined
        ? `\n\nDetalhes técnicos: ${props.originalError}`
        : '');

    super(message);
  }
}
