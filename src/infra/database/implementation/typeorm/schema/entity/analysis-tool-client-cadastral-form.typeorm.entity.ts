import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'analysis_tool_client_cadastral_form' })
export class AnalysisToolClientCadastralFormTypeormEntity extends BaseTypeormEntity {
  @OneToOne(() => AnalysisToolClientTypeormEntity)
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient: AnalysisToolClientTypeormEntity | undefined;

  @Column({ name: 'rg', type: 'varchar', length: 50, nullable: true })
  public rg: string | null;

  @Column({ name: 'nit', type: 'varchar', length: 50, nullable: true })
  public nit: string | null;

  @Column({ name: 'occupation', type: 'varchar', length: 255, nullable: true })
  public occupation: string | null;

  @Column({ name: 'marital_status', type: 'varchar', length: 100, nullable: true })
  public maritalStatus: string | null;

  @Column({ name: 'neighborhood', type: 'varchar', length: 255, nullable: true })
  public neighborhood: string | null;

  @Column({ name: 'street', type: 'varchar', length: 255, nullable: true })
  public street: string | null;

  @Column({ name: 'address_number', type: 'varchar', length: 50, nullable: true })
  public addressNumber: string | null;

  @Column({ name: 'mother_name', type: 'varchar', length: 255, nullable: true })
  public motherName: string | null;

  @Column({ name: 'father_name', type: 'varchar', length: 255, nullable: true })
  public fatherName: string | null;

  @Column({ name: 'spouse_name', type: 'varchar', length: 255, nullable: true })
  public spouseName: string | null;

  @Column({ name: 'ctps_number', type: 'varchar', length: 100, nullable: true })
  public ctpsNumber: string | null;

  @Column({ name: 'own_house', type: 'boolean', nullable: true })
  public ownHouse: boolean | null;

  @Column({ name: 'has_children', type: 'boolean', nullable: true })
  public hasChildren: boolean | null;

  @Column({ name: 'children_names', type: 'simple-json', nullable: true })
  public childrenNames: string[] | null;

  @Column({ name: 'is_retired', type: 'boolean', nullable: true })
  public isRetired: boolean | null;

  @Column({ name: 'retirement_type', type: 'varchar', length: 100, nullable: true })
  public retirementType: string | null;

  @Column({ name: 'retirement_benefit_number', type: 'varchar', length: 100, nullable: true })
  public retirementBenefitNumber: string | null;

  @Column({ name: 'receives_social_security_benefit', type: 'boolean', nullable: true })
  public receivesSocialSecurityBenefit: boolean | null;

  @Column({ name: 'social_security_benefit_type', type: 'varchar', length: 100, nullable: true })
  public socialSecurityBenefitType: string | null;

  @Column({ name: 'social_security_benefit_number', type: 'varchar', length: 100, nullable: true })
  public socialSecurityBenefitNumber: string | null;

  @Column({ name: 'receives_welfare_benefit', type: 'boolean', nullable: true })
  public receivesWelfareBenefit: boolean | null;

  @Column({ name: 'welfare_benefit_type', type: 'varchar', length: 100, nullable: true })
  public welfareBenefitType: string | null;

  @Column({ name: 'welfare_benefit_number', type: 'varchar', length: 100, nullable: true })
  public welfareBenefitNumber: string | null;

  @Column({ name: 'has_inss_debt', type: 'boolean', nullable: true })
  public hasInssDebt: boolean | null;

  @Column({ name: 'inss_debt_amount', type: 'varchar', length: 100, nullable: true })
  public inssDebtAmount: string | null;

  @Column({ name: 'receives_bolsa_familia', type: 'boolean', nullable: true })
  public receivesBolsaFamilia: boolean | null;

  @Column({ name: 'worked_in_special_activity', type: 'boolean', nullable: true })
  public workedInSpecialActivity: boolean | null;

  @Column({ name: 'special_activity_agent', type: 'varchar', length: 255, nullable: true })
  public specialActivityAgent: string | null;

  @Column({ name: 'has_ppp_or_ltcat', type: 'boolean', nullable: true })
  public hasPppOrLtcat: boolean | null;

  @Column({ name: 'ppp_ltcat_company', type: 'varchar', length: 255, nullable: true })
  public pppLtcatCompany: string | null;

  @Column({ name: 'company_is_open', type: 'boolean', nullable: true })
  public companyIsOpen: boolean | null;

  @Column({ name: 'worked_with_electricity', type: 'boolean', nullable: true })
  public workedWithElectricity: boolean | null;

  @Column({ name: 'worked_as_security', type: 'boolean', nullable: true })
  public workedAsSecurity: boolean | null;

  @Column({ name: 'exposed_to_excessive_noise', type: 'boolean', nullable: true })
  public exposedToExcessiveNoise: boolean | null;

  @Column({ name: 'worked_in_rural_area', type: 'boolean', nullable: true })
  public workedInRuralArea: boolean | null;

  @Column({ name: 'family_lived_in_rural_area', type: 'boolean', nullable: true })
  public familyLivedInRuralArea: boolean | null;

  @Column({ name: 'worked_in_public_service', type: 'boolean', nullable: true })
  public workedInPublicService: boolean | null;

  @Column({ name: 'held_public_job', type: 'boolean', nullable: true })
  public heldPublicJob: boolean | null;

  @Column({ name: 'hired_by_municipality', type: 'boolean', nullable: true })
  public hiredByMunicipality: boolean | null;

  @Column({ name: 'hospitalization_details', type: 'text', nullable: true })
  public hospitalizationDetails: string | null;

  @Column({ name: 'health_problems', type: 'text', nullable: true })
  public healthProblems: string | null;

  @Column({ name: 'accident_details', type: 'text', nullable: true })
  public accidentDetails: string | null;

  @Column({ name: 'work_accident_details', type: 'text', nullable: true })
  public workAccidentDetails: string | null;

  @Column({ name: 'medical_treatment', type: 'text', nullable: true })
  public medicalTreatment: string | null;

  @Column({ name: 'continuous_medication', type: 'text', nullable: true })
  public continuousMedication: string | null;

  @Column({ name: 'uses_farmacia_popular', type: 'boolean', nullable: true })
  public usesFarmaciaPopular: boolean | null;

  @Column({ name: 'medical_attendance_type', type: 'varchar', length: 50, nullable: true })
  public medicalAttendanceType: string | null;

  @Column({ name: 'doctor_name', type: 'varchar', length: 255, nullable: true })
  public doctorName: string | null;

  @Column({ name: 'medical_location', type: 'varchar', length: 255, nullable: true })
  public medicalLocation: string | null;

  @Column({ name: 'has_laboratory_tests', type: 'boolean', nullable: true })
  public hasLaboratoryTests: boolean | null;

  @Column({ name: 'has_medical_certificates', type: 'boolean', nullable: true })
  public hasMedicalCertificates: boolean | null;

  @Column({ name: 'accident_sequelae', type: 'text', nullable: true })
  public accidentSequelae: string | null;

  @Column({ name: 'pending_administrative_request', type: 'text', nullable: true })
  public pendingAdministrativeRequest: string | null;

  @Column({ name: 'ongoing_judicial_process', type: 'text', nullable: true })
  public ongoingJudicialProcess: string | null;

  @Column({ name: 'closed_judicial_process', type: 'text', nullable: true })
  public closedJudicialProcess: string | null;

  @Column({ name: 'previous_benefit_revision', type: 'text', nullable: true })
  public previousBenefitRevision: string | null;

  @Column({ name: 'doc_id_and_residence', type: 'boolean', nullable: true })
  public docIdAndResidence: boolean | null;

  @Column({ name: 'doc_pap_and_judicial', type: 'boolean', nullable: true })
  public docPapAndJudicial: boolean | null;

  @Column({ name: 'doc_cnis_extract', type: 'boolean', nullable: true })
  public docCnisExtract: boolean | null;

  @Column({ name: 'doc_ppp_ltcat', type: 'boolean', nullable: true })
  public docPppLtcat: boolean | null;

  @Column({ name: 'doc_reservist_certificate', type: 'boolean', nullable: true })
  public docReservistCertificate: boolean | null;

  @Column({ name: 'doc_rural_documents', type: 'boolean', nullable: true })
  public docRuralDocuments: boolean | null;

  @Column({ name: 'doc_all_ctps', type: 'boolean', nullable: true })
  public docAllCtps: boolean | null;

  @Column({ name: 'doc_public_admin_contracts', type: 'boolean', nullable: true })
  public docPublicAdminContracts: boolean | null;

  @Column({ name: 'doc_others', type: 'text', nullable: true })
  public docOthers: string | null;
}
