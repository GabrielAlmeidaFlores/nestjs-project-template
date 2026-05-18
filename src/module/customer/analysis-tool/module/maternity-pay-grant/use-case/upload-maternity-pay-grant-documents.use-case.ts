import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
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
import { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
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

    const earningHistories: MaternityPayGrantEarningsHistoryEntity[] = [];

    interface PeriodWithFlagsInterface extends MaternityPayGrantPeriodEntity {
      __carenciaDestravada: boolean;
      __contaTempo: boolean;
    }

    for (const relation of cnisModel.socialSecurityRelations ?? []) {
      const info = relation.socialSecurityAffiliationInfo;

      if (info.dataInicio === undefined) {
        continue;
      }

      const periodId = new MaternityPayGrantPeriodId();

      const typeOfContribution =
        info.origemDoVinculo === 'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' ||
        info.origemDoVinculo === 'SEGURADO ESPECIAL'
          ? 'Rural'
          : 'Urbano';

      const contributionTotal =
        relation.socialSecurityAffiliationEarningsHistory
          .map((earning) => {
            const contributionSalary = this.parseRemunerationString(
              earning.salarioContribuicao,
            );
            if (contributionSalary === null || isNaN(contributionSalary)) {
              return 0;
            }
            return contributionSalary;
          })
          .reduce((acc, curr) => acc + curr, 0);

      const contributionAverage =
        relation.socialSecurityAffiliationEarningsHistory.length > 0
          ? contributionTotal /
            relation.socialSecurityAffiliationEarningsHistory.length
          : 0;

      const competenceBelowTheMinimum =
        relation.socialSecurityAffiliationEarningsHistory.some((earning) => {
          return TetoInssData.some((teto) => {
            const competencia = earning.competencia;
            if (!competencia) {
              return false;
            }
            const competenciaYear = competencia.getFullYear();
            if (teto.ano !== competenciaYear) {
              return false;
            }
            const remuneration = this.parseRemunerationString(
              earning.remuneracao,
            );
            if (remuneration === null || isNaN(remuneration)) {
              return false;
            }
            return remuneration < teto.salarioMinimo;
          });
        });

      const indicadorPendencia = ['PEXT'];

      const delayPayment =
        relation.socialSecurityAffiliationEarningsHistory.some((earning) => {
          if (earning.indicadores === undefined || earning.indicadores === '') {
            return false;
          }
          return indicadorPendencia.includes(earning.indicadores);
        });

      const pendencyReason =
        info.dataFim === undefined
          ? MaternityPayGrantPeriodPendencyReasonEnum.LEAVE_DATE
          : competenceBelowTheMinimum
            ? MaternityPayGrantPeriodPendencyReasonEnum.COMPETENCE_BELOW_MINIMUM
            : delayPayment
              ? MaternityPayGrantPeriodPendencyReasonEnum.INCONSISTENT_COMPETENCE
              : '';

      const period = new MaternityPayGrantPeriodEntity({
        id: periodId,
        startDate: info.dataInicio,
        endDate: info.dataFim ?? null,
        category: this.mapOrigemToCategory(info.origemDoVinculo),
        bondOrigin: info.origemDoVinculo ?? null,
        typeOfContribution,
        isPendency: pendencyReason !== '',
        competenceBelowTheMinimum,
        contributionAverage: new DecimalValue(contributionAverage),
        pendencyReason:
          pendencyReason !== ''
            ? (pendencyReason as MaternityPayGrantPeriodPendencyReasonEnum)
            : null,
        status: pendencyReason === '',
        maternityPayGrantId,
      }) as PeriodWithFlagsInterface;

      const earnings = relation.socialSecurityAffiliationEarningsHistory;

      const MESES_PARA_PERDA_CI = 15;

      earnings.forEach((e, index) => {
        const competenceBelowTheMinimumSalary =
          relation.socialSecurityAffiliationEarningsHistory.some(() => {
            if (!e.competencia) {
              return false;
            }
            const year = e.competencia.getFullYear();
            const findSalary = TetoInssData.find((teto) => teto.ano === year);
            if (!findSalary) {
              return false;
            }
            const remuneration = this.parseRemunerationString(e.remuneracao);
            if (remuneration === null || isNaN(remuneration)) {
              return false;
            }
            return remuneration < findSalary.salarioMinimo;
          });

        const data = e.competencia ?? new Date();
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;

        const dataVencimento = this.calcularDataVencimento(mes, ano);

        const paymentDate = e.dataPgto ?? new Date();

        const pagamentoEmDia = this.checkPaymentOnTime(
          paymentDate,
          dataVencimento,
        );

        const tipoUpper = (info.origemDoVinculo ?? '').toUpperCase();

        const isEmpregado =
          tipoUpper.includes('EMPREGADO') ||
          tipoUpper.includes('DOMÉSTICO') ||
          tipoUpper.includes('DOMESTICO') ||
          tipoUpper.includes('AVULSO') ||
          tipoUpper.includes('PÚBLICO') ||
          tipoUpper.includes('PUBLICO');

        if (index === 0) {
          period.__carenciaDestravada = false;
          period.__contaTempo = true;
        }

        let carenciaDestravada = period.__carenciaDestravada;
        let contaCarencia = false;
        let valida = false;
        let contribuicaoEmDia = false;
        let contaTempo = period.__contaTempo;

        const isContribuinteIndividual =
          tipoUpper.includes('CONTRIBUINTE') ||
          tipoUpper.includes('INDIVIDUAL');
        const isFacultativo = tipoUpper.includes('FACULTATIVO');

        const indicadores = info.indicadores ?? '';

        const possuiIndicadorImped =
          indicadores.includes('PEXT') || indicadores.includes('PREM-EXT');

        if (possuiIndicadorImped) {
          valida = false;
          contaCarencia = false;
          contaTempo = false;
        } else {
          if (isEmpregado) {
            contribuicaoEmDia = true;
            carenciaDestravada = true;
            contaCarencia = true;
            valida = true;
          } else {
            const fatalLimit = this.calcularLimiteFatal(
              dataVencimento,
              MESES_PARA_PERDA_CI,
            );

            if (pagamentoEmDia) {
              carenciaDestravada = true;
              contaCarencia = true;
              valida = true;
            } else {
              if (!carenciaDestravada) {
                if (isContribuinteIndividual) {
                  contaCarencia = false;
                  valida = true;
                } else if (isFacultativo) {
                  contaCarencia = false;
                  valida = false;
                  contaTempo = false;
                } else {
                  contaCarencia = false;
                  valida = false;
                }
              } else {
                if (paymentDate <= fatalLimit) {
                  contaCarencia = true;
                  valida = true;
                } else {
                  contaCarencia = false;
                  valida = false;
                  contaTempo = false;
                  carenciaDestravada = false;
                }
              }
            }
          }
        }

        period.__carenciaDestravada = carenciaDestravada;
        period.__contaTempo = contaTempo;

        const analysisTextParts: string[] = [];
        analysisTextParts.push(
          pagamentoEmDia ? 'Pagamento em dia' : 'Pagamento em atraso',
        );
        analysisTextParts.push(
          contaCarencia ? 'Conta para carência' : 'Não conta para carência',
        );
        analysisTextParts.push(
          valida ? 'Competência válida' : 'Competência inválida',
        );
        analysisTextParts.push(
          contribuicaoEmDia
            ? 'Contribuição considerada em dia'
            : 'Contribuição não considerada em dia',
        );
        analysisTextParts.push(
          contaTempo
            ? 'Conta para tempo de contribuição'
            : 'Não conta para tempo de contribuição',
        );

        const analysisText = analysisTextParts.join('. ') + '.';

        earningHistories.push(
          new MaternityPayGrantEarningsHistoryEntity({
            id: new MaternityPayGrantEarningsHistoryId(),
            competence: e.competencia ?? null,
            remuneration: e.remuneracao ?? null,
            indicators: e.indicadores ?? null,
            paymentDate: e.dataPgto ?? null,
            contribution: e.contribuicao ?? null,
            contributionSalary: e.salarioContribuicao ?? null,
            competenceBelowTheMinimum: competenceBelowTheMinimumSalary,
            analysis: analysisText,
            maternityPayGrantId,
            maternityPayGrantPeriodId: periodId,
          }),
        );
      });

      transactions.push(
        this.maternityPayGrantPeriodCommandRepositoryGateway.createMaternityPayGrantPeriod(
          period,
        ),
      );
    }

    for (const earningHistory of earningHistories) {
      transactions.push(
        this.maternityPayGrantEarningsHistoryCommandRepositoryGateway.createMaternityPayGrantEarningsHistory(
          earningHistory,
        ),
      );
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

    transactions.push(
      this.maternityPayGrantCommandRepositoryGateway.updateMaternityPayGrant(
        maternityPayGrantId,
        new MaternityPayGrantEntity({
          id: maternityPayGrantId,
          analysisName: existingGrant.analysisName,
          category: existingGrant.category,
          cnisDocument: cnisFileName,
          isUnemployedAtTriggeringEventDate: dto.wasUnemployedAtEventDate,
          isCurrentlyUnemployed: existingGrant.isCurrentlyUnemployed,
          isRuralInsured: dto.wasRuralInsuredAtEventDate,
          ruralPeriodStartDate: dto.ruralPeriodStartDate ?? null,
          ruralPeriodEndDate: dto.ruralPeriodEndDate ?? null,
          ruralPeriodDocumentDescription:
            dto.ruralPeriodDocumentDescription ?? null,
          maternityPayGrantResultId:
            existingGrant.maternityPayGrantResult?.id ?? null,
          benefitTriggeringEvent: dto.benefitTriggeringEvent,
          benefitTriggeringEventDate: dto.benefitTriggeringEventDate,
          triggeringEvent: existingGrant.triggeringEvent,
          triggeringEventDate: existingGrant.triggeringEventDate,
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

  private parseRemunerationString(input?: string): number | null {
    if (input === undefined) {
      return null;
    }
    const raw = input.trim();
    if (!raw) {
      return null;
    }

    let s = raw.replace(/[^\d.,-]/g, '').replace(/\s+/g, '');

    const hasComma = s.includes(',');
    const hasDot = s.includes('.');

    const THOUSANDS_GROUP_LENGTH = 3;

    if (hasComma && hasDot) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else if (hasComma) {
      s = s.replace(',', '.');
    } else if (hasDot) {
      const parts = s.split('.');

      if (!parts.length) {
        return null;
      }

      const lastPart = parts[parts.length - 1];
      if (
        parts.length > 2 ||
        (typeof lastPart === 'string' &&
          lastPart.length === THOUSANDS_GROUP_LENGTH)
      ) {
        s = s.replace(/\./g, '');
      }
    }

    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  private calcularDataVencimento(month: number, year: number): Date {
    const DAY_15 = 15;
    const MONTHS_IN_YEAR = 12;
    let mesVencimento = month + 1;
    let anoVencimento = year;
    if (mesVencimento > MONTHS_IN_YEAR) {
      mesVencimento = 1;
      anoVencimento++;
    }
    const dataBase = new Date(anoVencimento, mesVencimento - 1, DAY_15);
    return this.nextBusinessDay(dataBase);
  }

  private nextBusinessDay(data: Date): Date {
    const novaData = new Date(data);
    while (!this.isDayUtil(novaData)) {
      novaData.setDate(novaData.getDate() + 1);
    }
    return novaData;
  }

  private isDayUtil(data: Date): boolean {
    const DAY_WEEKEND_SATURDAY = 6;
    const DAY_WEEKEND_SUNDAY = 0;
    const FERIADOS_NACIONAIS = [
      '01/01',
      '21/04',
      '01/05',
      '07/09',
      '12/10',
      '02/11',
      '15/11',
      '20/11',
      '25/12',
    ];

    const diaSemana = data.getDay();
    if (
      diaSemana === DAY_WEEKEND_SUNDAY ||
      diaSemana === DAY_WEEKEND_SATURDAY
    ) {
      return false;
    }

    const diaFormatado = `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
    if (FERIADOS_NACIONAIS.includes(diaFormatado)) {
      return false;
    }

    return true;
  }

  private checkPaymentOnTime(paymentDate: Date, dueDate: Date): boolean {
    const pag = new Date(
      paymentDate.getFullYear(),
      paymentDate.getMonth(),
      paymentDate.getDate(),
    );
    const venc = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate(),
    );
    return pag <= venc;
  }

  private calcularLimiteFatal(dataBase: Date, mesesPeriodoGraca: number): Date {
    const fimPeriodoGraca = new Date(
      dataBase.getFullYear(),
      dataBase.getMonth() + mesesPeriodoGraca,
      1,
    );

    const DAY_16 = 16;

    return new Date(
      fimPeriodoGraca.getFullYear(),
      fimPeriodoGraca.getMonth() + 1,
      DAY_16,
    );
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
