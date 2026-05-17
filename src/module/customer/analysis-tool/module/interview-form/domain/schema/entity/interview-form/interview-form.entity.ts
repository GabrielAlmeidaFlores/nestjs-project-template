import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { InterviewFormBenefitTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-benefit-type.enum';
import type { InterviewFormMedicalServiceTypeEnum } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/enum/interview-form-medical-service-type.enum';
import type { InterviewFormEntityPropsInterface } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/interview-form.entity.props.interface';

export class InterviewFormEntity extends BaseEntity<InterviewFormId> {
  @Description('Identificador do cliente da ferramenta de análise.')
  public readonly analysisToolClientId: AnalysisToolClientId;

  // Dados do Cliente
  @Description('Nome do cliente.')
  public readonly clientName: string | null;

  @Description('CPF do cliente.')
  public readonly clientCpf: string | null;

  @Description('RG do cliente.')
  public readonly clientRg: string | null;

  @Description('Senha do Meu INSS.')
  public readonly clientInssPassword: string | null;

  @Description('Endereço do cliente.')
  public readonly clientAddress: string | null;

  @Description('Profissão/Ocupação do cliente.')
  public readonly clientProfession: string | null;

  @Description('NIT do cliente.')
  public readonly clientNit: string | null;

  @Description('Número da CTPS.')
  public readonly clientCtpsNumber: string | null;

  @Description('Data de nascimento do cliente.')
  public readonly clientBirthDate: string | null;

  @Description('Estado civil do cliente.')
  public readonly clientMaritalStatus: string | null;

  @Description('Raça do cliente.')
  public readonly clientRace: string | null;

  @Description('Telefone do cliente.')
  public readonly clientPhoneNumber: string | null;

  @Description('Nome da mãe do cliente.')
  public readonly clientMotherName: string | null;

  @Description('Nome do pai do cliente.')
  public readonly clientFatherName: string | null;

  @Description('Nome do cônjuge do cliente.')
  public readonly clientSpouseName: string | null;

  @Description('E-mail do cliente.')
  public readonly clientEmail: string | null;

  @Description('CTPS do cliente.')
  public readonly clientCtps: string | null;

  @Description('Possui divulgação.')
  public readonly clientHasDisclosure: boolean | null;

  @Description('Possui RPC.')
  public readonly clientHasRpc: boolean | null;

  @Description('Nomes dos filhos.')
  public readonly childrenNames: string[];

  // Dados Laborativos e Previdenciários
  @Description('Está aposentado.')
  public readonly isRetired: boolean | null;

  @Description('Já recebeu ou recebe benefício previdenciário.')
  public readonly hasReceivedOrReceivesSocialSecurityBenefit: boolean | null;

  @Description('Já recebeu ou recebe benefício assistencial.')
  public readonly hasReceivedOrReceivesWelfareBenefit: boolean | null;

  @Description('Tipo do benefício previdenciário.')
  public readonly socialSecurityBenefitType: string | null;

  @Description('Número do benefício previdenciário.')
  public readonly socialSecurityBenefitNumber: string | null;

  @Description('Número do benefício assistencial.')
  public readonly welfareBenefitNumber: string | null;

  @Description('Tipo de benefício desejado.')
  public readonly desiredBenefitType: InterviewFormBenefitTypeEnum | null;

  @Description('Possui débito com a previdência social.')
  public readonly hasSocialSecurityDebt: boolean | null;

  @Description('Data do débito previdenciário.')
  public readonly socialSecurityDebtDate: string | null;

  @Description('Valor do débito previdenciário.')
  public readonly socialSecurityDebtAmount: string | null;

  @Description('Recebe Bolsa Família.')
  public readonly receivesBolsaFamilia: boolean | null;

  // Atividades Especiais
  @Description('Trabalhou em atividades especiais.')
  public readonly hasWorkedInSpecialActivities: boolean | null;

  @Description('Tipo de atividade especial.')
  public readonly specialActivityType: string | null;

  @Description('Agente nocivo da atividade especial.')
  public readonly specialActivityAgent: string | null;

  @Description('Possui PPP ou LTCAT da empresa.')
  public readonly hasPppOrLtcat: boolean | null;

  @Description('Detalhes do PPP/LTCAT.')
  public readonly pppOrLtcatDetails: string | null;

  @Description('Empresa aberta ou fechada.')
  public readonly isCompanyOpenOrClosed: string | null;

  @Description('Nome da empresa.')
  public readonly companyName: string | null;

  @Description('Trabalhou com eletricidade.')
  public readonly hasWorkedWithElectricity: boolean | null;

  @Description('Trabalhou como vigilante, vigia ou guarda.')
  public readonly hasWorkedAsVigilante: boolean | null;

  @Description('Trabalhou exposto a ruído excessivo.')
  public readonly hasWorkedExposedToExcessiveNoise: boolean | null;

  // Trabalho Rural
  @Description('Trabalhou no meio rural.')
  public readonly hasWorkedInRuralArea: boolean | null;

  @Description('Família viveu no meio rural durante infância/adolescência.')
  public readonly familyLivedInRuralAreaDuringChildhood: boolean | null;

  // Serviço Público
  @Description('Trabalhou no serviço público.')
  public readonly hasWorkedInPublicService: boolean | null;

  @Description('Ocupou algum emprego público.')
  public readonly hasHeldPublicOffice: boolean | null;

  @Description('Foi comissionado pela administração pública.')
  public readonly hasBeenCommissionedByPublicAdministration: boolean | null;

  // Dados de Saúde Ocupacional
  @Description('Já ficou internado por algum motivo e por quanto tempo.')
  public readonly hasBeenHospitalized: string | null;

  @Description('Possui algum tipo de problema de saúde.')
  public readonly hasHealthProblems: string | null;

  @Description('Já teve algum acidente de qualquer natureza.')
  public readonly hasHadAccident: string | null;

  @Description('Já teve algum acidente de trabalho.')
  public readonly hasHadWorkAccident: string | null;

  @Description('Faz tratamento médico por algum motivo.')
  public readonly hasMedicalTreatment: string | null;

  @Description('Faz uso contínuo de medicamentos.')
  public readonly takesContinuousMedication: string | null;

  @Description('Compra medicamentos na farmácia popular.')
  public readonly buysMedicationFromPopularPharmacy: boolean | null;

  @Description('Atendimentos médicos feitos no SUS ou particular.')
  public readonly medicalServiceType: InterviewFormMedicalServiceTypeEnum | null;

  @Description('Nome do médico que atende.')
  public readonly attendingDoctorName: string | null;

  @Description('Local de atendimento.')
  public readonly treatmentLocation: string | null;

  @Description('Possui exames laboratoriais.')
  public readonly hasLabReports: boolean | null;

  @Description('Possui atestados médicos.')
  public readonly hasMedicalRecords: boolean | null;

  @Description('Possui alguma sequela de acidente.')
  public readonly hasAccidentReport: string | null;

  // Histórico Processual
  @Description('Possui requerimento administrativo junto ao INSS em curso.')
  public readonly hasAdministrativeClaimWithInss: string | null;

  @Description('Possui processo judicial em andamento.')
  public readonly hasOngoingLawsuit: string | null;

  @Description('Possui processo judicial já encerrado.')
  public readonly hasPreviousLawsuit: string | null;

  @Description('Já requereu revisão administrativa ou judicial de benefício.')
  public readonly hasRequestedAdministrativeOrJudicialReview: string | null;

  // Documentos Entregues
  @Description('Entregou RG, CPF e comprovante de residência.')
  public readonly hasRgCpfProofOfResidence: boolean | null;

  @Description('Entregou cópia do PAP e de processos judiciais.')
  public readonly hasPapAndJudicialProcessCopy: boolean | null;

  @Description('Entregou extrato CNIS.')
  public readonly hasCnisExtract: boolean | null;

  @Description('Entregou PPP e LTCAT.')
  public readonly hasPppAndLtcat: boolean | null;

  @Description('Entregou certificado de reservista.')
  public readonly hasReservistCertificate: boolean | null;

  @Description('Entregou documentos rurais.')
  public readonly hasRuralDocuments: boolean | null;

  @Description('Entregou cópia completa de todas as CTPS.')
  public readonly hasCompleteCtpsCopy: boolean | null;

  @Description('Entregou contratos de trabalho com administração pública.')
  public readonly hasPublicAdministrationWorkContract: boolean | null;

  @Description('Entregou outros documentos.')
  public readonly hasOtherDocuments: boolean | null;

  @Description('Descrição de outros documentos.')
  public readonly otherDocumentsDescription: string | null;

  @Description('Membro da organização que criou o registro.')
  public readonly createdBy: OrganizationMemberId;

  @Description('Membro da organização que atualizou o registro.')
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = InterviewFormEntity.name;

  public constructor(props: InterviewFormEntityPropsInterface) {
    super(InterviewFormId, props);

    this.analysisToolClientId = props.analysisToolClientId;

    // Dados do Cliente
    this.clientName = props.clientName ?? null;
    this.clientCpf = props.clientCpf ?? null;
    this.clientRg = props.clientRg ?? null;
    this.clientInssPassword = props.clientInssPassword ?? null;
    this.clientAddress = props.clientAddress ?? null;
    this.clientProfession = props.clientProfession ?? null;
    this.clientNit = props.clientNit ?? null;
    this.clientCtpsNumber = props.clientCtpsNumber ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientMaritalStatus = props.clientMaritalStatus ?? null;
    this.clientRace = props.clientRace ?? null;
    this.clientPhoneNumber = props.clientPhoneNumber ?? null;
    this.clientMotherName = props.clientMotherName ?? null;
    this.clientFatherName = props.clientFatherName ?? null;
    this.clientSpouseName = props.clientSpouseName ?? null;
    this.clientEmail = props.clientEmail ?? null;
    this.clientCtps = props.clientCtps ?? null;
    this.clientHasDisclosure = props.clientHasDisclosure ?? null;
    this.clientHasRpc = props.clientHasRpc ?? null;
    this.childrenNames = props.childrenNames ?? [];

    // Dados Laborativos e Previdenciários
    this.isRetired = props.isRetired ?? null;
    this.hasReceivedOrReceivesSocialSecurityBenefit =
      props.hasReceivedOrReceivesSocialSecurityBenefit ?? null;
    this.hasReceivedOrReceivesWelfareBenefit =
      props.hasReceivedOrReceivesWelfareBenefit ?? null;
    this.socialSecurityBenefitType = props.socialSecurityBenefitType ?? null;
    this.socialSecurityBenefitNumber =
      props.socialSecurityBenefitNumber ?? null;
    this.welfareBenefitNumber = props.welfareBenefitNumber ?? null;
    this.desiredBenefitType = props.desiredBenefitType ?? null;
    this.hasSocialSecurityDebt = props.hasSocialSecurityDebt ?? null;
    this.socialSecurityDebtDate = props.socialSecurityDebtDate ?? null;
    this.socialSecurityDebtAmount = props.socialSecurityDebtAmount ?? null;
    this.receivesBolsaFamilia = props.receivesBolsaFamilia ?? null;

    // Atividades Especiais
    this.hasWorkedInSpecialActivities =
      props.hasWorkedInSpecialActivities ?? null;
    this.specialActivityType = props.specialActivityType ?? null;
    this.specialActivityAgent = props.specialActivityAgent ?? null;
    this.hasPppOrLtcat = props.hasPppOrLtcat ?? null;
    this.pppOrLtcatDetails = props.pppOrLtcatDetails ?? null;
    this.isCompanyOpenOrClosed = props.isCompanyOpenOrClosed ?? null;
    this.companyName = props.companyName ?? null;
    this.hasWorkedWithElectricity = props.hasWorkedWithElectricity ?? null;
    this.hasWorkedAsVigilante = props.hasWorkedAsVigilante ?? null;
    this.hasWorkedExposedToExcessiveNoise =
      props.hasWorkedExposedToExcessiveNoise ?? null;

    // Trabalho Rural
    this.hasWorkedInRuralArea = props.hasWorkedInRuralArea ?? null;
    this.familyLivedInRuralAreaDuringChildhood =
      props.familyLivedInRuralAreaDuringChildhood ?? null;

    // Serviço Público
    this.hasWorkedInPublicService = props.hasWorkedInPublicService ?? null;
    this.hasHeldPublicOffice = props.hasHeldPublicOffice ?? null;
    this.hasBeenCommissionedByPublicAdministration =
      props.hasBeenCommissionedByPublicAdministration ?? null;

    // Dados de Saúde Ocupacional
    this.hasBeenHospitalized = props.hasBeenHospitalized ?? null;
    this.hasHealthProblems = props.hasHealthProblems ?? null;
    this.hasHadAccident = props.hasHadAccident ?? null;
    this.hasHadWorkAccident = props.hasHadWorkAccident ?? null;
    this.hasMedicalTreatment = props.hasMedicalTreatment ?? null;
    this.takesContinuousMedication = props.takesContinuousMedication ?? null;
    this.buysMedicationFromPopularPharmacy =
      props.buysMedicationFromPopularPharmacy ?? null;
    this.medicalServiceType = props.medicalServiceType ?? null;
    this.attendingDoctorName = props.attendingDoctorName ?? null;
    this.treatmentLocation = props.treatmentLocation ?? null;
    this.hasLabReports = props.hasLabReports ?? null;
    this.hasMedicalRecords = props.hasMedicalRecords ?? null;
    this.hasAccidentReport = props.hasAccidentReport ?? null;

    // Histórico Processual
    this.hasAdministrativeClaimWithInss =
      props.hasAdministrativeClaimWithInss ?? null;
    this.hasOngoingLawsuit = props.hasOngoingLawsuit ?? null;
    this.hasPreviousLawsuit = props.hasPreviousLawsuit ?? null;
    this.hasRequestedAdministrativeOrJudicialReview =
      props.hasRequestedAdministrativeOrJudicialReview ?? null;

    // Documentos Entregues
    this.hasRgCpfProofOfResidence = props.hasRgCpfProofOfResidence ?? null;
    this.hasPapAndJudicialProcessCopy =
      props.hasPapAndJudicialProcessCopy ?? null;
    this.hasCnisExtract = props.hasCnisExtract ?? null;
    this.hasPppAndLtcat = props.hasPppAndLtcat ?? null;
    this.hasReservistCertificate = props.hasReservistCertificate ?? null;
    this.hasRuralDocuments = props.hasRuralDocuments ?? null;
    this.hasCompleteCtpsCopy = props.hasCompleteCtpsCopy ?? null;
    this.hasPublicAdministrationWorkContract =
      props.hasPublicAdministrationWorkContract ?? null;
    this.hasOtherDocuments = props.hasOtherDocuments ?? null;
    this.otherDocumentsDescription = props.otherDocumentsDescription ?? null;

    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
