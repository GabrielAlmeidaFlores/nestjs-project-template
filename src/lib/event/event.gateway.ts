export abstract class EventGateway {
  public abstract emitUpdateLegalProceedingDataEvent(id: string): void;
}
