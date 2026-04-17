import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MaternityPayGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/command/maternity-pay-grant.command.repository.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-document/command/maternity-pay-grant-document.command.repository.gateway';
import { MaternityPayGrantEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-earnings-history/command/maternity-pay-grant-earnings-history.command.repository.gateway';
import { MaternityPayGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/command/maternity-pay-grant-period.command.repository.gateway';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/maternity-pay-grant-document.entity';
import { MaternityPayGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity';
import { MaternityPayGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/value-object/maternity-pay-grant-earnings-history-id.value-object';
import { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';
import { MaternityPayGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-document-type.enum';
import { UploadMaternityPayGrantDocumentsRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/upload-maternity-pay-grant-documents.request.dto';
import { UploadMaternityPayGrantDocumentsResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/upload-maternity-pay-grant-documents.response.dto';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UploadMaternityPayGrantDocumentsUseCase {
  protected readonly _type = UploadMaternityPayGrantDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(MaternityPayGrantCommandRepositoryGateway)
    private readonly maternityPayGrantCommandRepositoryGateway: MaternityPayGrantCommandRepositoryGateway,
    @Inject(MaternityPayGrantDocumentCommandRepositoryGateway)
    private readonly maternityPayGrantDocumentCommandRepositoryGateway: MaternityPayGrantDocumentCommandRepositoryGateway,
    @Inject(MaternityPayGrantPeriodCommandRepositoryGateway)
    private readonly maternityPayGrantPeriodCommandRepositoryGateway: MaternityPayGrantPeriodCommandRepositoryGateway,
    @Inject(MaternityPayGrantEarningsHistoryCommandRepositoryGateway)
    private readonly maternityPayGrantEarningsHistoryCommandRepositoryGateway: MaternityPayGrantEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(CnisProcessorGateway)
    private readonly cnisProcessorGateway: CnisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    maternityPayGrantId: MaternityPayGrantId,
    dto: UploadMaternityPayGrantDocumentsRequestDto,
  ): Promise<UploadMaternityPayGrantDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingGrant =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const cnisBuffer = dto.cnis.base64.decodeToBuffer();
    const cnisModel =
      await this.cnisProcessorGateway.parseCnisDocument(cnisBuffer);

    const [cnisFileName, documentFileNames, ruralDocumentFileNames] =
      await Promise.all([
        this.uploadFile(dto.cnis),
        Promise.all(dto.documents.map((doc) => this.uploadFile(doc))),
        dto.ruralDocuments !== undefined
          ? Promise.all(dto.ruralDocuments.map((doc) => this.uploadFile(doc)))
          : Promise.resolve([]),
      ]);

    const transactions: TransactionType[] = [
      this.maternityPayGrantDocumentCommandRepositoryGateway.deleteAllByMaternityPayGrantId(
        maternityPayGrantId,
      ),
      this.maternityPayGrantEarningsHistoryCommandRepositoryGateway.deleteAllByMaternityPayGrantId(
        maternityPayGrantId,
      ),
      this.maternityPayGrantPeriodCommandRepositoryGateway.deleteAllByMaternityPayGrantId(
        maternityPayGrantId,
      ),
    ];

    for (const relation of cnisModel.socialSecurityRelations ?? []) {
      const info = relation.socialSecurityAffiliationInfo;

      if (info.dataInicio === undefined) {
        continue;
      }

      const periodId = new MaternityPayGrantPeriodId();

      transactions.push(
        this.maternityPayGrantPeriodCommandRepositoryGateway.createMaternityPayGrantPeriod(
          new MaternityPayGrantPeriodEntity({
            id: periodId,
            startDate: info.dataInicio,
            endDate: info.dataFim ?? null,
            category: this.mapOrigemToCategory(info.origemDoVinculo),
            bondOrigin: info.origemDoVinculo ?? null,
            typeOfContribution: info.tipoFiliadoNoVinculo ?? null,
            isPendency: false,
            competenceBelowTheMinimum: false,
            status: true,
            maternityPayGrantId,
          }),
        ),
      );

      for (const earning of relation.socialSecurityAffiliationEarningsHistory ??
        []) {
        transactions.push(
          this.maternityPayGrantEarningsHistoryCommandRepositoryGateway.createMaternityPayGrantEarningsHistory(
            new MaternityPayGrantEarningsHistoryEntity({
              id: new MaternityPayGrantEarningsHistoryId(),
              competence: earning.competencia ?? null,
              remuneration: earning.remuneracao ?? null,
              indicators: earning.indicadores ?? null,
              paymentDate: earning.dataPgto ?? null,
              contribution: earning.contribuicao ?? null,
              contributionSalary: earning.salarioContribuicao ?? null,
              analysis: null,
              competenceBelowTheMinimum: null,
              maternityPayGrantId,
              maternityPayGrantPeriodId: periodId,
            }),
          ),
        );
      }
    }

    for (const fileName of documentFileNames) {
      transactions.push(
        this.maternityPayGrantDocumentCommandRepositoryGateway.createMaternityPayGrantDocument(
          new MaternityPayGrantDocumentEntity({
            document: fileName,
            type: MaternityPayGrantDocumentTypeEnum.SUPPORTING_DOCUMENT,
            maternityPayGrantId,
          }),
        ),
      );
    }

    for (const fileName of ruralDocumentFileNames) {
      transactions.push(
        this.maternityPayGrantDocumentCommandRepositoryGateway.createMaternityPayGrantDocument(
          new MaternityPayGrantDocumentEntity({
            document: fileName,
            type: MaternityPayGrantDocumentTypeEnum.RURAL_DOCUMENT,
            maternityPayGrantId,
          }),
        ),
      );
    }

    const triggeringEventDate = dto.triggeringEventDate;

    transactions.push(
      this.maternityPayGrantCommandRepositoryGateway.updateMaternityPayGrant(
        maternityPayGrantId,
        new MaternityPayGrantEntity({
          id: maternityPayGrantId,
          analysisName: existingGrant.analysisName,
          category: existingGrant.category,
          cnisDocument: cnisFileName,
          triggeringEvent: dto.triggeringEvent,
          triggeringEventDate,
          isTriggeringEventDateValid:
            this.isTriggeringEventDateWithinFiveYears(triggeringEventDate),
          isUnemployedAtTriggeringEventDate: dto.wasUnemployedAtEventDate,
          isCurrentlyUnemployed: existingGrant.isCurrentlyUnemployed,
          isRuralInsured: dto.wasRuralInsuredAtEventDate,
          ruralPeriodStartDate: dto.ruralPeriodStartDate ?? null,
          ruralPeriodEndDate: dto.ruralPeriodEndDate ?? null,
          ruralPeriodDocumentDescription:
            dto.ruralPeriodDocumentDescription ?? null,
          maternityPayGrantResultId:
            existingGrant.maternityPayGrantResult?.id ?? null,
          createdAt: existingGrant.createdAt,
          updatedAt: existingGrant.updatedAt,
          deletedAt: existingGrant.deletedAt,
        }),
      ),
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UploadMaternityPayGrantDocumentsResponseDto.build({
      maternityPayGrantId,
    });
  }

  private async uploadFile(file: Base64FileRequestDto): Promise<string> {
    const buffer = file.base64.decodeToBuffer();

    return this.fileProcessorGateway.uploadFile(
      FileModel.build({
        buffer,
        originalName: file.originalFileName,
        size: buffer.length,
        encoding: '7bit',
      }),
    );
  }

  private isTriggeringEventDateWithinFiveYears(date: Date): boolean {
    const maxYears = 5;
    const today = new Date();
    const limitDate = new Date(today);
    limitDate.setFullYear(today.getFullYear() - maxYears);

    return date >= limitDate && date <= today;
  }

  private mapOrigemToCategory(
    origemDoVinculo?: string,
  ): MaternityPayGrantCategoryEnum {
    const origem = (origemDoVinculo ?? '').toLowerCase();

    if (origem.includes('domest')) {
      return MaternityPayGrantCategoryEnum.EMPREGO_DOMESTICO;
    }

    if (origem.includes('avulso')) {
      return MaternityPayGrantCategoryEnum.TRABALHADOR_AVULSO;
    }

    if (origem.includes('mei')) {
      return MaternityPayGrantCategoryEnum.MEI;
    }

    if (origem.includes('especial')) {
      return MaternityPayGrantCategoryEnum.SEGURADO_ESPECIAL;
    }

    if (origem.includes('facultat')) {
      return MaternityPayGrantCategoryEnum.SEGURADO_FACULTATIVO;
    }

    if (origem.includes('individual') && origem.includes('prestador')) {
      return MaternityPayGrantCategoryEnum.CONTRIBUINTE_INDIVIDUAL_PRESTADOR;
    }

    if (origem.includes('individual')) {
      return MaternityPayGrantCategoryEnum.CONTRIBUINTE_INDIVIDUAL_AUTONOMO;
    }

    if (origem.includes('rural')) {
      return MaternityPayGrantCategoryEnum.EMPREGADO_RURAL;
    }

    return MaternityPayGrantCategoryEnum.EMPREGADO_URBANO;
  }
}
