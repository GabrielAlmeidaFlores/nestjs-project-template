export interface BaseTypeormEntityPropsInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
