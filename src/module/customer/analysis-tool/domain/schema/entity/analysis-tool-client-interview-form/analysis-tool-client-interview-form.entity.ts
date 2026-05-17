import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientInterviewFormEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/analysis-tool-client-interview-form.entity.props.interface';
import { AnalysisToolClientInterviewFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/value-object/analysis-tool-client-interview-form-id/analysis-tool-client-interview-form-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AnalysisToolClientInterviewFormEntity extends BaseEntity<AnalysisToolClientInterviewFormId> {
  @Description('Cliente da ferramenta de análise.')
  public readonly analysisToolClient: AnalysisToolClientEntity;
  @Description('RG do cliente.')
  public readonly rg: string | null;
  @Description('NIT/PIS/PASEP do cliente.')
  public readonly nit: string | null;
  @Description('Profissão/Ocupação do cliente.')
  public readonly occupation: string | null;
  @Description('Bairro do cliente.')
  public readonly neighborhood: string | null;
  @Description('Rua do cliente.')
  public readonly street: string | null;
  @Description('Número de residência do cliente.')
  public readonly addressNumber: string | null;
  @Description('Nome da mãe do cliente.')
  public readonly motherName: string | null;
  @Description('Nome do pai do cliente.')
  public readonly fatherName: string | null;
  @Description('Nome do cônjuge/companheiro(a).')
  public readonly spouseName: string | null;
  @Description('Número da CTPS.')
  public readonly ctpsNumber: string | null;
  @Description('É casado ou tem união estável.')
  public readonly isMarried: boolean | null;
  @Description('Tem filhos.')
  public readonly hasChildren: boolean | null;
  @Description('Nome dos filhos.')
  public readonly childrenNames: string[] | null;
  @Description('Está aposentado.')
  public readonly isRetired: boolean | null;
  @Description('Tipo de aposentadoria.')
  public readonly retirementType: string | null;
  @Description('Número do benefício de aposentadoria.')
  public readonly retirementBenefitNumber: string | null;
  @Description('Recebe benefício previdenciário.')
  public readonly receivesSocialSecurityBenefit: boolean | null;
  @Description('Tipo de benefício previdenciário.')
  public readonly socialSecurityBenefitType: string | null;
  @Description('Número do benefício previdenciário.')
  public readonly socialSecurityBenefitNumber: string | null;
  @Description('Recebe benefício assistencial.')
  public readonly receivesWelfareBenefit: boolean | null;
  @Description('Tipo de benefício assistencial.')
  public readonly welfareBenefitType: string | null;
  @Description('Número do benefício assistencial.')
  public readonly welfareBenefitNumber: string | null;
  @Description('Possui débito com a previdência social.')
  public readonly hasInssDebt: boolean | null;
  @Description('Valor do débito com a previdência.')
  public readonly inssDebtAmount: string | null;
  @Description('Recebe Bolsa Família.')
  public readonly receivesBolsaFamilia: boolean | null;
  @Description('Trabalhou em atividades especiais.')
  public readonly workedInSpecialActivity: boolean | null;
  @Description('Agente de atividade especial.')
  public readonly specialActivityAgent: string | null;
  @Description('Possui PPP ou LTCAT.')
  public readonly hasPppOrLtcat: boolean | null;
  @Description('Empresa do PPP/LTCAT.')
  public readonly pppLtcatCompany: string | null;
  @Description('Empresa está aberta (true) ou fechada (false).')
  public readonly companyIsOpen: boolean | null;
  @Description('Trabalhou com eletricidade.')
  public readonly workedWithElectricity: boolean | null;
  @Description('Trabalhou como vigilante, vigia ou guarda.')
  public readonly workedAsSecurity: boolean | null;
  @Description('Exposto a ruído excessivo.')
  public readonly exposedToExcessiveNoise: boolean | null;
  @Description('Trabalhou no meio rural.')
  public readonly workedInRuralArea: boolean | null;
  @Description('Família vivia no meio rural na infância/adolescência.')
  public readonly familyLivedInRuralArea: boolean | null;
  @Description('Trabalhou no serviço público.')
  public readonly workedInPublicService: boolean | null;
  @Description('Ocupou emprego público.')
  public readonly heldPublicJob: boolean | null;
  @Description('Contratado por Prefeitura ou Adm. Pública.')
  public readonly hiredByMunicipality: boolean | null;
  @Description('Detalhes de internação.')
  public readonly hospitalizationDetails: string | null;
  @Description('Problemas de saúde.')
  public readonly healthProblems: string | null;
  @Description('Detalhes de acidente de qualquer natureza.')
  public readonly accidentDetails: string | null;
  @Description('Detalhes de acidente de trabalho.')
  public readonly workAccidentDetails: string | null;
  @Description('Tratamento médico.')
  public readonly medicalTreatment: string | null;
  @Description('Uso contínuo de medicamentos.')
  public readonly continuousMedication: string | null;
  @Description('Usa farmácia popular.')
  public readonly usesFarmaciaPopular: boolean | null;
  @Description('Tipo de atendimento médico (SUS/PARTICULAR).')
  public readonly medicalAttendanceType: string | null;
  @Description('Nome do médico.')
  public readonly doctorName: string | null;
  @Description('Local de atendimento médico.')
  public readonly medicalLocation: string | null;
  @Description('Possui exames laboratoriais.')
  public readonly hasLaboratoryTests: boolean | null;
  @Description('Possui atestados médicos.')
  public readonly hasMedicalCertificates: boolean | null;
  @Description('Sequela de acidente.')
  public readonly accidentSequelae: string | null;
  @Description('Requerimento administrativo junto ao INSS em curso.')
  public readonly pendingAdministrativeRequest: string | null;
  @Description('Processo judicial em andamento.')
  public readonly ongoingJudicialProcess: string | null;
  @Description('Processo judicial já encerrado.')
  public readonly closedJudicialProcess: string | null;
  @Description('Revisão de benefício previdenciário prévia.')
  public readonly previousBenefitRevision: string | null;
  @Description('RG, CPF e comprovante de residência entregues.')
  public readonly docIdAndResidence: boolean | null;
  @Description('Cópia do PAP e processos judiciais entregues.')
  public readonly docPapAndJudicial: boolean | null;
  @Description('Extrato CNIS entregue.')
  public readonly docCnisExtract: boolean | null;
  @Description('PPP e LTCAT entregues.')
  public readonly docPppLtcat: boolean | null;
  @Description('Certificado de reservista entregue.')
  public readonly docReservistCertificate: boolean | null;
  @Description('Documentos rurais entregues.')
  public readonly docRuralDocuments: boolean | null;
  @Description('Cópia completa de todas as CTPS entregues.')
  public readonly docAllCtps: boolean | null;
  @Description('Contratos de trabalho com Adm. Pública entregues.')
  public readonly docPublicAdminContracts: boolean | null;
  @Description('Outros documentos entregues.')
  public readonly docOthers: string | null;

  protected readonly _type = AnalysisToolClientInterviewFormEntity.name;

  public constructor(props: AnalysisToolClientInterviewFormEntityPropsInterface) {
    super(AnalysisToolClientInterviewFormId, props);
    this.analysisToolClient = props.analysisToolClient;
    this.rg = props.rg ?? null;
    this.nit = props.nit ?? null;
    this.occupation = props.occupation ?? null;
    this.neighborhood = props.neighborhood ?? null;
    this.street = props.street ?? null;
    this.addressNumber = props.addressNumber ?? null;
    this.motherName = props.motherName ?? null;
    this.fatherName = props.fatherName ?? null;
    this.spouseName = props.spouseName ?? null;
    this.ctpsNumber = props.ctpsNumber ?? null;
    this.isMarried = props.isMarried ?? null;
    this.hasChildren = props.hasChildren ?? null;
    this.childrenNames = props.childrenNames ?? null;
    this.isRetired = props.isRetired ?? null;
    this.retirementType = props.retirementType ?? null;
    this.retirementBenefitNumber = props.retirementBenefitNumber ?? null;
    this.receivesSocialSecurityBenefit = props.receivesSocialSecurityBenefit ?? null;
    this.socialSecurityBenefitType = props.socialSecurityBenefitType ?? null;
    this.socialSecurityBenefitNumber = props.socialSecurityBenefitNumber ?? null;
    this.receivesWelfareBenefit = props.receivesWelfareBenefit ?? null;
    this.welfareBenefitType = props.welfareBenefitType ?? null;
    this.welfareBenefitNumber = props.welfareBenefitNumber ?? null;
    this.hasInssDebt = props.hasInssDebt ?? null;
    this.inssDebtAmount = props.inssDebtAmount ?? null;
    this.receivesBolsaFamilia = props.receivesBolsaFamilia ?? null;
    this.workedInSpecialActivity = props.workedInSpecialActivity ?? null;
    this.specialActivityAgent = props.specialActivityAgent ?? null;
    this.hasPppOrLtcat = props.hasPppOrLtcat ?? null;
    this.pppLtcatCompany = props.pppLtcatCompany ?? null;
    this.companyIsOpen = props.companyIsOpen ?? null;
    this.workedWithElectricity = props.workedWithElectricity ?? null;
    this.workedAsSecurity = props.workedAsSecurity ?? null;
    this.exposedToExcessiveNoise = props.exposedToExcessiveNoise ?? null;
    this.workedInRuralArea = props.workedInRuralArea ?? null;
    this.familyLivedInRuralArea = props.familyLivedInRuralArea ?? null;
    this.workedInPublicService = props.workedInPublicService ?? null;
    this.heldPublicJob = props.heldPublicJob ?? null;
    this.hiredByMunicipality = props.hiredByMunicipality ?? null;
    this.hospitalizationDetails = props.hospitalizationDetails ?? null;
    this.healthProblems = props.healthProblems ?? null;
    this.accidentDetails = props.accidentDetails ?? null;
    this.workAccidentDetails = props.workAccidentDetails ?? null;
    this.medicalTreatment = props.medicalTreatment ?? null;
    this.continuousMedication = props.continuousMedication ?? null;
    this.usesFarmaciaPopular = props.usesFarmaciaPopular ?? null;
    this.medicalAttendanceType = props.medicalAttendanceType ?? null;
    this.doctorName = props.doctorName ?? null;
    this.medicalLocation = props.medicalLocation ?? null;
    this.hasLaboratoryTests = props.hasLaboratoryTests ?? null;
    this.hasMedicalCertificates = props.hasMedicalCertificates ?? null;
    this.accidentSequelae = props.accidentSequelae ?? null;
    this.pendingAdministrativeRequest = props.pendingAdministrativeRequest ?? null;
    this.ongoingJudicialProcess = props.ongoingJudicialProcess ?? null;
    this.closedJudicialProcess = props.closedJudicialProcess ?? null;
    this.previousBenefitRevision = props.previousBenefitRevision ?? null;
    this.docIdAndResidence = props.docIdAndResidence ?? null;
    this.docPapAndJudicial = props.docPapAndJudicial ?? null;
    this.docCnisExtract = props.docCnisExtract ?? null;
    this.docPppLtcat = props.docPppLtcat ?? null;
    this.docReservistCertificate = props.docReservistCertificate ?? null;
    this.docRuralDocuments = props.docRuralDocuments ?? null;
    this.docAllCtps = props.docAllCtps ?? null;
    this.docPublicAdminContracts = props.docPublicAdminContracts ?? null;
    this.docOthers = props.docOthers ?? null;
  }
}
