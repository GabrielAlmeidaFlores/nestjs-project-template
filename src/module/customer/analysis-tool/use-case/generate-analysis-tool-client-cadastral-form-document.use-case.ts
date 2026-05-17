import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientCadastralFormQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/analysis-tool-client-cadastral-form.query.repository.gateway';
import { GetAnalysisToolClientCadastralFormQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/result/get-analysis-tool-client-cadastral-form.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GenerateAnalysisToolClientCadastralFormDocumentUseCase {
  protected readonly _type = GenerateAnalysisToolClientCadastralFormDocumentUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientCadastralFormQueryRepositoryGateway)
    private readonly cadastralFormQueryRepositoryGateway: AnalysisToolClientCadastralFormQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    analysisToolClientId: AnalysisToolClientId,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<StreamableFile> {
    const client =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const form =
      await this.cadastralFormQueryRepositoryGateway.findByAnalysisToolClientId(
        analysisToolClientId,
      );

    const html = this.buildHtml(client.name ?? 'Cliente', form);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      html,
      ExportDocumentFormatEnum.DOCX,
      'ficha_cadastral',
    );
  }

  private buildHtml(
    clientName: string,
    form: GetAnalysisToolClientCadastralFormQueryResult | null,
  ): string {
    const yes = 'Sim';
    const no = 'Não';
    const na = 'N/A';

    const bool = (value: boolean | null | undefined): string => {
      if (value === null || value === undefined) return na;
      return value ? yes : no;
    };

    const str = (value: string | null | undefined): string => value ?? na;
    const arr = (value: string[] | null | undefined): string =>
      value && value.length > 0 ? value.join(', ') : na;

    const f = form;

    return `
<html>
<head><meta charset="UTF-8"><title>Ficha Cadastral</title>
<style>
  body { font-family: Arial, sans-serif; font-size: 12pt; margin: 40px; }
  h1 { text-align: center; font-size: 16pt; }
  h2 { font-size: 13pt; background: #e0e0e0; padding: 4px 8px; margin-top: 20px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
  td { padding: 4px 8px; border: 1px solid #ccc; vertical-align: top; }
  td:first-child { width: 50%; font-weight: bold; background: #f9f9f9; }
</style>
</head>
<body>
<h1>Ficha Cadastral</h1>
<p><strong>Cliente:</strong> ${clientName}</p>

<h2>Dados do Cliente</h2>
<table>
  <tr><td>RG</td><td>${str(f?.rg)}</td></tr>
  <tr><td>NIT/PIS/PASEP</td><td>${str(f?.nit)}</td></tr>
  <tr><td>Profissão/Ocupação</td><td>${str(f?.occupation)}</td></tr>
  <tr><td>Estado Civil</td><td>${str(f?.maritalStatus)}</td></tr>
  <tr><td>Bairro</td><td>${str(f?.neighborhood)}</td></tr>
  <tr><td>Rua</td><td>${str(f?.street)}</td></tr>
  <tr><td>Número</td><td>${str(f?.addressNumber)}</td></tr>
  <tr><td>Nome da Mãe</td><td>${str(f?.motherName)}</td></tr>
  <tr><td>Nome do Pai</td><td>${str(f?.fatherName)}</td></tr>
  <tr><td>Nome do Cônjuge/Companheiro(a)</td><td>${str(f?.spouseName)}</td></tr>
  <tr><td>Número da CTPS</td><td>${str(f?.ctpsNumber)}</td></tr>
  <tr><td>Casa Própria</td><td>${bool(f?.ownHouse)}</td></tr>
  <tr><td>Tem filhos</td><td>${bool(f?.hasChildren)}</td></tr>
  <tr><td>Nome dos filhos</td><td>${arr(f?.childrenNames)}</td></tr>
</table>

<h2>Dados Previdenciários</h2>
<table>
  <tr><td>Aposentado(a)</td><td>${bool(f?.isRetired)}</td></tr>
  <tr><td>Tipo de aposentadoria</td><td>${str(f?.retirementType)}</td></tr>
  <tr><td>Número do benefício de aposentadoria</td><td>${str(f?.retirementBenefitNumber)}</td></tr>
  <tr><td>Recebe benefício previdenciário</td><td>${bool(f?.receivesSocialSecurityBenefit)}</td></tr>
  <tr><td>Tipo de benefício previdenciário</td><td>${str(f?.socialSecurityBenefitType)}</td></tr>
  <tr><td>Número do benefício previdenciário</td><td>${str(f?.socialSecurityBenefitNumber)}</td></tr>
  <tr><td>Recebe benefício assistencial (BPC/LOAS)</td><td>${bool(f?.receivesWelfareBenefit)}</td></tr>
  <tr><td>Tipo de benefício assistencial</td><td>${str(f?.welfareBenefitType)}</td></tr>
  <tr><td>Número do benefício assistencial</td><td>${str(f?.welfareBenefitNumber)}</td></tr>
  <tr><td>Possui débito com o INSS</td><td>${bool(f?.hasInssDebt)}</td></tr>
  <tr><td>Valor do débito</td><td>${str(f?.inssDebtAmount)}</td></tr>
  <tr><td>Recebe Bolsa Família</td><td>${bool(f?.receivesBolsaFamilia)}</td></tr>
</table>

<h2>Atividades Especiais</h2>
<table>
  <tr><td>Trabalhou em atividades especiais</td><td>${bool(f?.workedInSpecialActivity)}</td></tr>
  <tr><td>Agente nocivo</td><td>${str(f?.specialActivityAgent)}</td></tr>
  <tr><td>Possui PPP ou LTCAT</td><td>${bool(f?.hasPppOrLtcat)}</td></tr>
  <tr><td>Empresa do PPP/LTCAT</td><td>${str(f?.pppLtcatCompany)}</td></tr>
  <tr><td>Empresa está aberta</td><td>${bool(f?.companyIsOpen)}</td></tr>
  <tr><td>Trabalhou com eletricidade</td><td>${bool(f?.workedWithElectricity)}</td></tr>
  <tr><td>Trabalhou como vigilante/vigia/guarda</td><td>${bool(f?.workedAsSecurity)}</td></tr>
  <tr><td>Exposto a ruído excessivo</td><td>${bool(f?.exposedToExcessiveNoise)}</td></tr>
</table>

<h2>Trabalho Rural</h2>
<table>
  <tr><td>Trabalhou no meio rural</td><td>${bool(f?.workedInRuralArea)}</td></tr>
  <tr><td>Família vivia no meio rural</td><td>${bool(f?.familyLivedInRuralArea)}</td></tr>
</table>

<h2>Serviço Público</h2>
<table>
  <tr><td>Trabalhou no serviço público</td><td>${bool(f?.workedInPublicService)}</td></tr>
  <tr><td>Ocupou emprego público</td><td>${bool(f?.heldPublicJob)}</td></tr>
  <tr><td>Contratado por Prefeitura/Adm. Pública</td><td>${bool(f?.hiredByMunicipality)}</td></tr>
</table>

<h2>Saúde Ocupacional</h2>
<table>
  <tr><td>Internações</td><td>${str(f?.hospitalizationDetails)}</td></tr>
  <tr><td>Problemas de saúde</td><td>${str(f?.healthProblems)}</td></tr>
  <tr><td>Acidentes de qualquer natureza</td><td>${str(f?.accidentDetails)}</td></tr>
  <tr><td>Acidentes de trabalho</td><td>${str(f?.workAccidentDetails)}</td></tr>
  <tr><td>Tratamento médico</td><td>${str(f?.medicalTreatment)}</td></tr>
  <tr><td>Medicação contínua</td><td>${str(f?.continuousMedication)}</td></tr>
  <tr><td>Usa Farmácia Popular</td><td>${bool(f?.usesFarmaciaPopular)}</td></tr>
  <tr><td>Tipo de atendimento médico</td><td>${str(f?.medicalAttendanceType)}</td></tr>
  <tr><td>Nome do médico</td><td>${str(f?.doctorName)}</td></tr>
  <tr><td>Local de atendimento</td><td>${str(f?.medicalLocation)}</td></tr>
  <tr><td>Possui exames laboratoriais</td><td>${bool(f?.hasLaboratoryTests)}</td></tr>
  <tr><td>Possui atestados médicos</td><td>${bool(f?.hasMedicalCertificates)}</td></tr>
  <tr><td>Sequelas de acidente</td><td>${str(f?.accidentSequelae)}</td></tr>
</table>

<h2>Histórico Processual</h2>
<table>
  <tr><td>Requerimento administrativo no INSS em curso</td><td>${str(f?.pendingAdministrativeRequest)}</td></tr>
  <tr><td>Processo judicial em andamento</td><td>${str(f?.ongoingJudicialProcess)}</td></tr>
  <tr><td>Processo judicial já encerrado</td><td>${str(f?.closedJudicialProcess)}</td></tr>
  <tr><td>Revisão de benefício prévia</td><td>${str(f?.previousBenefitRevision)}</td></tr>
</table>

<h2>Documentos Entregues</h2>
<table>
  <tr><td>RG, CPF e comprovante de residência</td><td>${bool(f?.docIdAndResidence)}</td></tr>
  <tr><td>Cópia do PAP e processos judiciais</td><td>${bool(f?.docPapAndJudicial)}</td></tr>
  <tr><td>Extrato CNIS</td><td>${bool(f?.docCnisExtract)}</td></tr>
  <tr><td>PPP e LTCAT</td><td>${bool(f?.docPppLtcat)}</td></tr>
  <tr><td>Certificado de reservista</td><td>${bool(f?.docReservistCertificate)}</td></tr>
  <tr><td>Documentos rurais</td><td>${bool(f?.docRuralDocuments)}</td></tr>
  <tr><td>Cópia de todas as CTPS</td><td>${bool(f?.docAllCtps)}</td></tr>
  <tr><td>Contratos com Adm. Pública</td><td>${bool(f?.docPublicAdminContracts)}</td></tr>
  <tr><td>Outros documentos</td><td>${str(f?.docOthers)}</td></tr>
</table>

</body>
</html>`;
  }
}
