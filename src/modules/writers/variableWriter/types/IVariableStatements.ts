import { INewContract } from "@models/newcontract/types/INewContract";

export interface IVariableStatements {
  newcontract: (json: INewContract) => string;
}
