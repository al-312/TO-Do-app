export type DataType = {
  id: number;
  name: string;
  status: STATUS;
};

export enum STATUS {
  TODO = "TO_DO",
  INPROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
}

export type RenderItemType = {
  item: DataType;
  index: number;
};
