import { UnexpectedError } from '@core/error/unexpected.error';

export class IncompleteSourceDataForMappingError extends UnexpectedError {
  protected override readonly _type = IncompleteSourceDataForMappingError.name;

  public constructor(props: { sourceClass: string; destinationClass: string }) {
    super(
      `Falha ao mapear de '${props.sourceClass}' para '${props.destinationClass}'. O objeto de origem não possui todas as propriedades obrigatórias para construir o destino`,
    );
  }
}
