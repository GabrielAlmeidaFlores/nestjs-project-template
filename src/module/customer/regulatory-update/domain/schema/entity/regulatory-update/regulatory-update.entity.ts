import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';

import type { RegulatoryUpdateEntityPropsInterface } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/regulatory-update.entity.props.interface';

export class RegulatoryUpdateEntity extends BaseEntity<RegulatoryUpdateId> {
  public readonly title: string;
  public readonly legalIdentifier: string | null;
  public readonly summary: string;
  public readonly mainChanges: string[];
  public readonly implementationStatus: string;
  public readonly beneficiaryImpact: string;
  public readonly fullText: string;
  public readonly sourceUrl: string | null;
  public readonly publishedAt: Date | null;

  protected readonly _type = RegulatoryUpdateEntity.name;

  public constructor(props: RegulatoryUpdateEntityPropsInterface) {
    super(RegulatoryUpdateId, props);
    this.title = props.title;
    this.legalIdentifier = props.legalIdentifier ?? null;
    this.summary = props.summary;
    this.mainChanges = props.mainChanges;
    this.implementationStatus = props.implementationStatus;
    this.beneficiaryImpact = props.beneficiaryImpact;
    this.fullText = props.fullText;
    this.sourceUrl = props.sourceUrl ?? null;
    this.publishedAt = props.publishedAt ?? null;
  }
}
