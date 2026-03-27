import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { ListRegulatoryUpdatesQueryParam } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/param/list-regulatory-updates.query.param';
import type { GetRegulatoryUpdateQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update/query/result/get-regulatory-update.query.result';
import type { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';

export abstract class RegulatoryUpdateQueryRepositoryGateway {
  public abstract findOneRegulatoryUpdateById(
    id: RegulatoryUpdateId,
  ): Promise<GetRegulatoryUpdateQueryResult | null>;

  public abstract listRegulatoryUpdates(
    param: ListRegulatoryUpdatesQueryParam,
  ): Promise<ListDataOutputModel<GetRegulatoryUpdateQueryResult>>;

  public abstract findAllTitlesAndDates(): Promise<
    Array<{ title: string; publishedAt: Date | null }>
  >;

  public abstract countAllRegulatoryUpdates(): Promise<number>;

  public abstract findLastVerifiedAt(): Promise<Date | null>;
}
