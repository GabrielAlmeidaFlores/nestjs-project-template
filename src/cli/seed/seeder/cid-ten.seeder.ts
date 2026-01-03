import { readFileSync } from 'fs';
import { join } from 'path';

import { Inject, Logger } from '@nestjs/common';

import { CidTenCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cid-ten/command/cid-ten.command.repository.gateway';
import { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

interface CidTenJsonDataInterface {
  code: string;
  description: string;
}

export class CidTenSeeder implements SeederInterface {
  protected readonly _type = CidTenSeeder.name;
  private readonly logger: Logger;
  private readonly batchSize: number;

  public constructor(
    @Inject(CidTenCommandRepositoryGateway)
    private readonly cidTenCommandRepositoryGateway: CidTenCommandRepositoryGateway,
  ) {
    this.logger = new Logger(CidTenSeeder.name);
    this.batchSize = 50;
  }

  public async execute(): Promise<number> {
    this.logger.log('Loading CID-10 data from JSON file...', this._type);

    const cidTenFilePath = join(
      process.cwd(),
      'assets',
      'cid-ten',
      'cid10_cremesp.json',
    );

    const fileContent = readFileSync(cidTenFilePath, 'utf-8');
    const cidTenJsonData = JSON.parse(fileContent) as CidTenJsonDataInterface[];

    const totalRecords = cidTenJsonData.length;
    const totalBatches = Math.ceil(totalRecords / this.batchSize);

    this.logger.log(
      `Processing ${totalRecords} CID-10 records in ${totalBatches} batches of ${this.batchSize}`,
      this._type,
    );

    for (let i = 0; i < totalRecords; i += this.batchSize) {
      const batch = cidTenJsonData.slice(i, i + this.batchSize);
      const batchNumber = Math.floor(i / this.batchSize) + 1;

      this.logger.log(
        `Processing batch ${batchNumber}/${totalBatches} (${batch.length} records)`,
        this._type,
      );

      for (const cidTenData of batch) {
        const cidTenEntity = new CidTenEntity({
          code: cidTenData.code,
          description: cidTenData.description,
        });

        await this.cidTenCommandRepositoryGateway._upsertCidTenWithNoTransaction(
          cidTenEntity,
        );
      }

      this.logger.log(
        `Batch ${batchNumber}/${totalBatches} completed`,
        this._type,
      );
    }

    this.logger.log(
      `Successfully seeded ${totalRecords} CID-10 records`,
      this._type,
    );

    return totalRecords;
  }
}
