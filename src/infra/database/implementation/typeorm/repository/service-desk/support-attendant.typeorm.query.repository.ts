import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { ListSupportAttendantsQueryParam } from '@module/customer/service-desk/domain/repository/support-attendant/query/param/list-support-attendants.query.param';
import { GetSupportAttendantListItemQueryResult } from '@module/customer/service-desk/domain/repository/support-attendant/query/result/get-support-attendant-list-item.query.result';
import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class SupportAttendantTypeormQueryRepository
  extends BaseTypeormQueryRepository<SupportAttendantTypeormEntity>
  implements SupportAttendantQueryRepositoryGateway
{
  protected readonly _type = SupportAttendantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SupportAttendantTypeormEntity)
    repository: Repository<SupportAttendantTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneSupportAttendantById(
    id: SupportAttendantId,
  ): Promise<GetSupportAttendantListItemQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
    });

    if (!data) {
      return null;
    }

    return this.buildListItemWithCount(data);
  }

  public async findOneSupportAttendantByAuthIdentityId(
    authIdentityId: AuthIdentityId,
  ): Promise<GetSupportAttendantListItemQueryResult | null> {
    const authIdentityIdStr = authIdentityId.toString();

    const data = await this.repository
      .createQueryBuilder('sa')
      .innerJoin('auth_identity', 'ai', 'ai.support_attendant_id = sa.id')
      .where('ai.id = :authIdentityId', { authIdentityId: authIdentityIdStr })
      .getOne();

    if (!data) {
      return null;
    }

    return this.buildListItemWithCount(data);
  }

  public async findOneSupportAttendantByEmail(
    email: string,
  ): Promise<GetSupportAttendantListItemQueryResult | null> {
    const data = await this.findOne({ where: { email } });

    if (!data) {
      return null;
    }

    return this.buildListItemWithCount(data);
  }

  public async findAuthIdentityIdBySupportAttendantId(
    id: SupportAttendantId,
  ): Promise<AuthIdentityId | null> {
    const raw = await this.repository
      .createQueryBuilder('sa')
      .innerJoin('auth_identity', 'ai', 'ai.support_attendant_id = sa.id')
      .select('ai.id', 'authIdentityId')
      .where('sa.id = :id', { id: id.toString() })
      .getRawOne<{ authIdentityId: string } | undefined>();

    if (!raw?.authIdentityId) {
      return null;
    }

    return new AuthIdentityId(raw.authIdentityId);
  }

  public async listAllSupportAttendants(
    param: ListSupportAttendantsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportAttendantListItemQueryResult>> {
    const queryBuilder = this.repository
      .createQueryBuilder('sa')
      .leftJoin(
        (subQuery) =>
          subQuery
            .select('st.assigned_attendant_id', 'attendantId')
            .addSelect('COUNT(st.id)', 'totalAttendances')
            .from('support_ticket', 'st')
            .where('st.deleted_at IS NULL')
            .groupBy('st.assigned_attendant_id'),
        'stats',
        'stats.attendantId = sa.id',
      )
      .addSelect('COALESCE(stats.totalAttendances, 0)', 'totalAttendances')
      .where('sa.deleted_at IS NULL');

    if (param.supportType !== null) {
      queryBuilder.andWhere('sa.support_type = :supportType', {
        supportType: param.supportType,
      });
    }

    if (param.search !== null) {
      queryBuilder.andWhere(
        '(sa.name LIKE :search OR sa.email LIKE :search)',
        { search: `%${param.search}%` },
      );
    }

    const maxItemsPerQuery = 100;
    const limit = Math.min(Math.max(param.limit, 1), maxItemsPerQuery);
    const page = Math.max(param.page, 1);
    const skip = (page - 1) * limit;

    queryBuilder.orderBy('sa.createdAt', 'DESC').skip(skip).take(limit);

    const [{ entities, raw }, totalItems] = await Promise.all([
      queryBuilder.getRawAndEntities(),
      queryBuilder.getCount(),
    ]);

    const resource = entities.map((entity, index) => {
      const rawRow = raw[index] as { totalAttendances: string } | undefined;
      const total =
        rawRow?.totalAttendances !== undefined
          ? parseInt(rawRow.totalAttendances, 10)
          : 0;

      return GetSupportAttendantListItemQueryResult.build({
        id: new SupportAttendantId(entity.id),
        name: entity.name,
        email: entity.email,
        supportType: entity.supportType,
        isActive: entity.isActive,
        totalAttendances: total,
        createdAt: entity.createdAt,
      });
    });

    return new ListDataOutputModel({
      page,
      limit,
      totalItems,
      resource,
    });
  }

  public async countResolvedTicketsByAttendantId(
    supportAttendantId: SupportAttendantId,
  ): Promise<number> {
    const result = await this.repository.manager.query<
      Array<{ total: string }>
    >(
      `SELECT COUNT(*) AS total FROM support_ticket WHERE assigned_attendant_id = ? AND status = 'resolved' AND deleted_at IS NULL`,
      [supportAttendantId.toString()],
    );

    return parseInt(result[0]?.total ?? '0', 10);
  }

  private async buildListItemWithCount(
    entity: SupportAttendantTypeormEntity,
  ): Promise<GetSupportAttendantListItemQueryResult> {
    const total = await this.countResolvedTicketsByAttendantId(
      new SupportAttendantId(entity.id),
    );

    return GetSupportAttendantListItemQueryResult.build({
      id: new SupportAttendantId(entity.id),
      name: entity.name,
      email: entity.email,
      supportType: entity.supportType,
      isActive: entity.isActive,
      totalAttendances: total,
      createdAt: entity.createdAt,
    });
  }
}
