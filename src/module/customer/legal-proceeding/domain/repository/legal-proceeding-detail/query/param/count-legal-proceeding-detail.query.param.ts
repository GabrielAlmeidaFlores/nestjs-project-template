import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export class CountLegalProceedingDetailQueryParam extends ListDataInputModel {
  public readonly authIdentityId: AuthIdentityId | null;

  protected override readonly _type = CountLegalProceedingDetailQueryParam.name;

  public constructor(props: Partial<CountLegalProceedingDetailQueryParam>) {
    super(props);

    this.authIdentityId = props.authIdentityId ?? null;
  }
}
