import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TermsId } from '@module/customer/account/domain/schema/entity/terms/value-object/terms-id/terms-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { TermsEntityPropsInterface } from '@module/customer/account/domain/schema/entity/terms/terms.entity.props.interface';

export class TermsEntity extends BaseEntity<TermsId> {
  @Description('Conteúdo dos termos e condições.')
  public readonly content: string;

  @Description('Situação dos termos e condições.')
  public readonly isActive: boolean;

  protected readonly _type = TermsEntity.name;

  public constructor(props: TermsEntityPropsInterface) {
    super(TermsId, props);

    this.content = props.content;
    this.isActive = props.isActive;
  }
}
