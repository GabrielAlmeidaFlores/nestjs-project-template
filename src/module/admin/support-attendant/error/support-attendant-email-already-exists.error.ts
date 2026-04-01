import { HttpException, HttpStatus } from '@nestjs/common';

export class SupportAttendantEmailAlreadyExistsError extends HttpException {
  protected readonly _type = SupportAttendantEmailAlreadyExistsError.name;

  public constructor() {
    super(
      'Já existe um atendente de suporte cadastrado com esse e-mail.',
      HttpStatus.CONFLICT,
    );
  }
}
