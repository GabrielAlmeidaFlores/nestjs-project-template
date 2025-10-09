import type { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.iput.model';

export abstract class EmailGateway {
  public abstract sendHTMLEmail(props: SendHTMLEmailInputModel): Promise<void>;
}
