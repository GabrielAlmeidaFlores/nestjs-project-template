import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { SystemLogTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-log.typeorm.entity';
import { GetSystemLogQueryResult } from '@module/admin/system-logs/domain/repository/system-logs/query/result/get-system-log.query.result';
import { SystemLogsQueryRepositoryGateway } from '@module/admin/system-logs/domain/repository/system-logs/query/system-logs.query.repository.gateway';

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
  ): Promise<ListDataOutputModel<GetSystemLogQueryResult>> {
    const page = pagination.page;
    const limit = pagination.limit;
    const skip = (page - 1) * limit;

    const [rows, totalItems] = await this.repository.findAndCount({
      where: { isError },
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
}
