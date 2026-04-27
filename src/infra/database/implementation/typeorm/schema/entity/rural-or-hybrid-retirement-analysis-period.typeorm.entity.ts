import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementAnalysisProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-production-destination.enum';
import { RuralOrHybridRetirementAnalysisWorkScheduleEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-work-schedule.enum';
import { RuralOrHybridRetirementAnalysisWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/enum/rural-or-hybrid-retirement-analysis-worker-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_period' })
export class RuralOrHybridRetirementAnalysisPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public startDate: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public endDate: Date | null;

  @Column({
    name: 'worker_type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisWorkerTypeEnum,
    nullable: true,
  })
  public workerType: RuralOrHybridRetirementAnalysisWorkerTypeEnum | null;

  @Column({
    name: 'work_schedule',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisWorkScheduleEnum,
    nullable: true,
  })
  public workSchedule: RuralOrHybridRetirementAnalysisWorkScheduleEnum | null;

  @Column({
    name: 'property_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public propertyName: string | null;

  @Column({
    name: 'property_category',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public propertyCategory: string | null;

  @Column({
    name: 'property_owner',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public propertyOwner: string | null;

  @Column({ name: 'property_cep', type: 'varchar', length: 20, nullable: true })
  public propertyCep: string | null;

  @Column({
    name: 'property_state',
    type: 'simple-enum',
    enum: StateCodeEnum,
    nullable: true,
  })
  public propertyState: StateCodeEnum | null;

  @Column({
    name: 'property_city',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public propertyCity: string | null;

  @Column({
    name: 'property_neighbourhood',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public propertyNeighbourhood: string | null;

  @Column({
    name: 'property_street',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public propertyStreet: string | null;

  @Column({
    name: 'property_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public propertyNumber: string | null;

  @Column({
    name: 'production_destination',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisProductionDestinationEnum,
    nullable: true,
  })
  public productionDestination: RuralOrHybridRetirementAnalysisProductionDestinationEnum | null;

  @Column({ name: 'employee', type: 'boolean', nullable: true })
  public employee: boolean | null;

  @Column({ name: 'employee_amount', type: 'int', nullable: true })
  public employeeAmount: number | null;

  @Column({ name: 'agricultural_machinery', type: 'boolean', nullable: true })
  public agriculturalMachinery: boolean | null;

  @Column({
    name: 'agricultural_machinery_description',
    type: 'longtext',
    nullable: true,
  })
  public agriculturalMachineryDescription: string | null;

  @Column({ name: 'farm_vehicles', type: 'boolean', nullable: true })
  public farmVehicles: boolean | null;

  @Column({
    name: 'farm_vehicles_description',
    type: 'longtext',
    nullable: true,
  })
  public farmVehiclesDescription: string | null;

  @Column({
    name: 'income_besides_rural_production',
    type: 'boolean',
    nullable: true,
  })
  public incomeBesidesRuralProduction: boolean | null;

  @Column({
    name: 'income_besides_rural_production_description',
    type: 'longtext',
    nullable: true,
  })
  public incomeBesidesRuralProductionDescription: string | null;

  @Column({ name: 'client_has_or_had_cnpj', type: 'boolean', nullable: true })
  public clientHasOrHadCnpj: boolean | null;

  @Column({
    name: 'client_has_or_had_cnpj_description',
    type: 'longtext',
    nullable: true,
  })
  public clientHasOrHadCnpjDescription: string | null;

  @Column({
    name: 'client_lives_in_urban_area',
    type: 'boolean',
    nullable: true,
  })
  public clientLivesInUrbanArea: boolean | null;

  @Column({
    name: 'client_municipality',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientMunicipality: string | null;

  @Column({
    name: 'client_state',
    type: 'simple-enum',
    enum: StateCodeEnum,
    nullable: true,
  })
  public clientState: StateCodeEnum | null;

  @Column({ name: 'distance', type: 'varchar', length: 255, nullable: true })
  public distance: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisPeriod,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_id' })
  public ruralOrHybridRetirementAnalysis?:
    | RuralOrHybridRetirementAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisPeriod,
  )
  public ruralOrHybridRetirementAnalysisPeriodDocument?:
    | RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisPeriod,
  )
  public ruralOrHybridRetirementAnalysisPeriodMember?:
    | RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodTypeormEntity.name;
}
