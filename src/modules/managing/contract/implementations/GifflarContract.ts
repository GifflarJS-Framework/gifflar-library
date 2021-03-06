import { IContractWriter } from "@writers/contractWriter/types/IContractWriter";
import { ICompiler } from "modules/compiler/types/ICompiler";
import { IDeployer } from "modules/deployer/types/IDeployer";
import { inject, injectable } from "tsyringe";
import { IGifflarContract } from "../types/IGifflarContract";
import { Contract } from "web3-eth-contract";
import { IContractDeployDTO } from "../types/IContractDeployDTO";
import Web3 from "web3";
import { IContractModel } from "@models/contract/types/IContractModel";
import { IGifflarContractModel } from "../types/IGifflarContractModel";

@injectable()
class GifflarContract implements IGifflarContractModel {
  constructor(
    @inject("Compiler")
    private compiler: ICompiler,
    @inject("ContractWriter")
    private contractWriter: IContractWriter,
    @inject("ContractModel")
    private contractModel: IContractModel,
    @inject("Deployer")
    private deployer: IDeployer
  ) {}

  execute(contractName: string): IGifflarContract {
    const _contractModel = this.contractModel.execute(contractName);

    const gContract: IGifflarContract = {
      ..._contractModel,
      setName: (newName: string): void => {
        gContract.name = newName;
      },

      write: (): string => {
        const contracts = [gContract];
        gContract.code = this.contractWriter.write(contracts, () => {
          return "";
        });
        return gContract.code;
      },

      compile: (callback: (errors: any) => void): any => {
        let errors;
        if (gContract.code) {
          gContract.json = this.compiler.compile(gContract.code);
        }
        if (callback) {
          if (gContract.json.errors) {
            errors = gContract.json.errors;
          }

          callback(errors);
        }
        return gContract.json;
      },

      deploy: async (
        inputs: IContractDeployDTO,
        web3: Web3
      ): Promise<Contract> => {
        this.deployer.setWeb3(web3);
        const json = gContract.json.contracts.jsons[gContract.name];
        if (!json) {
          throw new Error("Failed to find compiled contract.");
        }
        const _inputs = {
          abi: json.abi,
          bytecode: json.evm.bytecode.object,
          args: inputs.args,
          from: inputs.from,
          gas: inputs.gas,
        };
        gContract.instance = await this.deployer.deploy(_inputs);
        return gContract.instance;
      },
      written: (): string | undefined => {
        return gContract.code;
      },

      compiled: (): any | undefined => {
        return gContract.json;
      },

      deployed: (): Contract | undefined => {
        return gContract.instance;
      },
    };

    return gContract;
  }
}

export default GifflarContract;
