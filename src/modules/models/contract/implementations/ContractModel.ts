import { IEventCall } from "@models/eventCall/types/IEventCall";
import { IFunction } from "@models/function/types/IFunction";
import { IInput } from "@models/function/types/IInput";
import { IContract } from "../types/IContract";
import { IContractJson } from "../types/IContractJson";
import { inject, injectable } from "tsyringe";
import { IGlobalVariable } from "@models/globalVariable/types/IGlobalVariable";
import { IEventCallModel } from "@models/eventCall/types/IEventCallModel";
import { IGlobalVariableModel } from "@models/globalVariable/types/IGlobalVariableModel";
import { IFunctionModel } from "@models/function/types/IFunctionModel";
import { IContractItem } from "../types/IContractItem";
import IEventModel from "@models/event/types/IEventModel";
import { IEvent } from "@models/event/types/IEvent";
import { IContractModel } from "../types/IContractModel";

@injectable()
class ContractModel implements IContractModel {
  constructor(
    @inject("GlobalVariableModel")
    private globalVariableModel: IGlobalVariableModel,
    @inject("FunctionModel")
    private functionModel: IFunctionModel,
    @inject("EventCallModel")
    private eventCallModel: IEventCallModel,
    @inject("EventModel")
    private eventModel: IEventModel
  ) {}

  execute(contractName: string): IContract {
    const contract: IContractItem = {
      variables: [],
      events: [],
      functions: [],
    };

    const toJson = (): IContractJson => {
      const jsonfunction = JSON.stringify({ name: contractName, contract });
      return JSON.parse(jsonfunction);
    };

    const createEvent = (name: string, inputs: Array<IInput>): IEvent => {
      const event = this.eventModel.execute({ name, inputs });
      contract.events.push(event);
      return event;
    };

    const createEventCall = (
      name: string,
      variables: Array<string>
    ): IEventCall => {
      const newEventCall = this.eventCallModel.execute({ name, variables });
      return newEventCall;
    };

    const createVariable = (
      type: string,
      name: string,
      scope: string,
      value?: string
    ): IGlobalVariable => {
      const variable = this.globalVariableModel.execute({
        type,
        name,
        scope,
        value,
      });
      if (scope) {
      }
      // else {
      //   variable = createVariableModel({
      //     type,
      //     name,
      //     value,
      //   });
      // }
      contract.variables.push(variable);
      return variable;
    };

    const createConstructor = (
      scope: string,
      inputs?: Array<IInput>,
      outputs?: Array<string>
    ): IFunction => {
      const _function = this.functionModel.execute({
        name: "",
        scope,
        isConstructor: true,
        inputs,
        outputs,
        globalVars: contract.variables,
      });
      contract.functions.push(_function);

      return _function;
    };

    const createFunction = (
      name: string,
      scope: string,
      inputs: Array<IInput>,
      outputs: Array<string>
    ): IFunction => {
      const _function = this.functionModel.execute({
        name,
        scope,
        inputs,
        outputs,
        isConstructor: false,
        globalVars: contract.variables,
      });
      contract.functions.push(_function);

      return _function;
    };

    const _assignFunctions = (): IContract => {
      const _obj: IContract = {
        name: contractName,
        contract,
        code: "",
        json: {},
        instance: undefined,
        toJson,
        createEvent,
        createEventCall,
        createVariable,
        createConstructor,
        createFunction,
        toString: (): string => {
          return JSON.stringify({ name: _obj.name, contract: _obj.contract });
        },
      };

      return _obj;
    };

    const json: IContract = _assignFunctions();
    return json;
  }
}

export default ContractModel;
