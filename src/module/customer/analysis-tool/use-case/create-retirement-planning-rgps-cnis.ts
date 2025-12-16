import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPlanningRgpsCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/command/retirement-planning-rgps.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { CreateRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-cnis.request.dto';
import { CreateRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-cnis.response.dto';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/error/cnis-document-is-not-valid.error';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';

@Injectable()
export class CreateRetirementPlanningRgpsCnisUseCase {
  protected readonly _type = CreateRetirementPlanningRgpsCnisUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(RetirementPlanningRgpsCommandRepositoryGateway)
    private readonly retirementPlanningRgpsCommandRepositoryGateway: RetirementPlanningRgpsCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    dto: CreateRetirementPlanningRgpsCnisRequestDto,
  ): Promise<CreateRetirementPlanningRgpsCnisResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFail(
        dto.json.retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    if (dto.cnisDocument) {
      const validateCnisDocument =
        await this.analysisProcessorGateway.validateCnisDocument(
          dto.cnisDocument.buffer,
        );

      if (validateCnisDocument === false) {
        throw new CnisDocumentIsNotValidError();
      }

      const cnisDocument =
        dto.cnisDocument !== undefined
          ? await this.fileProcessorGateway.uploadFile(dto.cnisDocument)
          : null;

      // const updatedRetirementPlanningRgps = new RetirementPlanningRgpsEntity({
      //   ...retirementPlanningRgps,

      //   cnisDocument,
      // });

      // const retirementPlanningRgpsTransaction =
      //   this.retirementPlanningRgpsCommandRepositoryGateway.updateRetirementPlanningRgps(
      //     retirementPlanningRgps.id,
      //     updatedRetirementPlanningRgps,
      //   );

      // const transactions = await this.baseTransactionRepositoryGateway.execute([
      //   retirementPlanningRgpsTransaction,
      // ]);

      // await transactions.commit();
    }

    // const cnis = await this.analysisProcessorGateway.parseCnisDocument(
    //   dto.cnisDocument.buffer,
    // );

    return CreateRetirementPlanningRgpsCnisResponseDto.build({
      retirementPlanningRgpsId: retirementPlanningRgps.id,
    });
  }
}
