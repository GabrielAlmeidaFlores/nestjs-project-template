import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
  type FindOptionsWhere,
} from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { SystemLogTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-log.typeorm.entity';
import { GetSystemLogQueryResult } from '@module/admin/system-logs/domain/repository/system-logs/query/result/get-system-log.query.result';
import { SystemLogsQueryRepositoryGateway } from '@module/admin/system-logs/domain/repository/system-logs/query/system-logs.query.repository.gateway';

import type { SystemLogListFiltersType } from '@module/admin/system-logs/domain/repository/system-logs/query/type/system-log-list.filters';

const ERROR_PREFIX = 'ERR-';
const SUCCESS_PREFIX = 'SUC-';
const ERROR_PREFIX_LENGTH = ERROR_PREFIX.length;
const SUCCESS_PREFIX_LENGTH = SUCCESS_PREFIX.length;

const HOURS_IN_DAY = 23;
const MINUTES_IN_HOUR = 59;
const SECONDS_IN_MINUTE = 59;
const MILLISECONDS_IN_SECOND = 999;

@Injectable()
export class SystemLogTypeormQueryRepository extends SystemLogsQueryRepositoryGateway {
  protected override readonly _type = SystemLogTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SystemLogTypeormEntity)
    private readonly repository: Repository<SystemLogTypeormEntity>,
  ) {
    super();
  }

  public async listByIsError(
    pagination: ListDataInputModel,
    isError: boolean,
    filters: SystemLogListFiltersType,
  ): Promise<ListDataOutputModel<GetSystemLogQueryResult>> {
    const page = pagination.page;
    const limit = pagination.limit;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<SystemLogTypeormEntity> = { isError };

    const searchTrimmed = pagination.search?.trim() ?? undefined;
    if (searchTrimmed !== undefined) {
      const code = this.parseStatusCodeFilter(searchTrimmed);
      if (code !== null) {
        where.code = code;
      } else {
        where.endpoint = Like(
          `%${this.escapeMysqlLikePattern(searchTrimmed)}%`,
        );
      }
    }

    const { dataFrom, dataTo } = this.resolveDataRangeBounds(filters);

    if (dataFrom !== undefined && dataTo !== undefined) {
      where.data = Between(dataFrom, dataTo);
    } else if (dataFrom !== undefined) {
      where.data = MoreThanOrEqual(dataFrom);
    } else if (dataTo !== undefined) {
      where.data = LessThanOrEqual(dataTo);
    }

    const [rows, totalItems] = await this.repository.findAndCount({
      where,
      order: { data: 'DESC' },
      take: limit,
      skip,
    });

    const resource = rows.map((row) =>
      GetSystemLogQueryResult.build({
        code: row.code,
        endpoint: row.endpoint,
        data: row.data,
        isError: row.isError,
        stackTrace: row.stackTrace ?? null,
        requestBody: row.requestBody ?? null,
        responseBody: row.responseBody ?? null,
      }),
    );

    return new ListDataOutputModel<GetSystemLogQueryResult>({
      page,
      limit,
      totalItems,
      resource,
    });
  }

  private escapeMysqlLikePattern(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/%/g, '\\%')
      .replace(/_/g, '\\_');
  }

  private parseStatusCodeFilter(raw: string | undefined): number | null {
    if (raw === undefined) {
      return null;
    }
    let s = raw.trim();
    if (!s) {
      return null;
    }
    const upper = s.toUpperCase();
    if (upper.startsWith(ERROR_PREFIX)) {
      s = s.slice(ERROR_PREFIX_LENGTH);
    } else if (upper.startsWith(SUCCESS_PREFIX)) {
      s = s.slice(SUCCESS_PREFIX_LENGTH);
    }
    s = s.trim();
    if (!s) {
      return null;
    }
    const n = Number.parseInt(s, 10);
    return Number.isNaN(n) ? null : n;
  }

  private resolveDataRangeBounds(filters: SystemLogListFiltersType): {
    dataFrom?: Date;
    dataTo?: Date;
  } {
    const start = filters.startDate?.toISOString().split('T')[0];
    const end = filters.endDate?.toISOString().split('T')[0];

    if (start !== undefined && end !== undefined) {
      return {
        dataFrom: this.startOfLocalDay(start),
        dataTo: this.endOfLocalDay(end),
      };
    }
    if (start !== undefined) {
      return { dataFrom: this.startOfLocalDay(start) };
    }
    if (end !== undefined) {
      return { dataTo: this.endOfLocalDay(end) };
    }
    return {};
  }

  private startOfLocalDay(yyyyMmDd: string): Date {
    const parts = yyyyMmDd.split('-');
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }

  private endOfLocalDay(yyyyMmDd: string): Date {
    const parts = yyyyMmDd.split('-');
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    return new Date(
      y,
      m - 1,
      d,
      HOURS_IN_DAY,
      MINUTES_IN_HOUR,
      SECONDS_IN_MINUTE,
      MILLISECONDS_IN_SECOND,
    );
  }
}
