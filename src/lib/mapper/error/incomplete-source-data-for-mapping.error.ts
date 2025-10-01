import { UnexpectedError } from '@core/error/unexpected.error';

export class IncompleteSourceDataForMappingError extends UnexpectedError {
  protected override readonly _type = IncompleteSourceDataForMappingError.name;

  public constructor(props: { sourceClass: string; destinyClass: string }) {
    super(
      `Falha ao mapear de '${props.sourceClass}' para '${props.destinyClass}'. O objeto de origem não possui todas as propriedades obrigatórias para construir o destino`,
    );
  }
}
