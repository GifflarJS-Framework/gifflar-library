import { IGifflarContract } from "../../contract/types/IGifflarContract";
import { IGifflarContractModel } from "../../contract/types/IGifflarContractModel";
import { IContractWriter } from "../../../writers/contractWriter/types/IContractWriter";
import { ICompiler } from "modules/compiler/types/ICompiler";
import { IDeployer } from "modules/deployer/types/IDeployer";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { IGifflarContractManager } from "../types/IGifflarContractManager";
import { IManagerDeployDTO } from "../types/IManagerDeployDTO";
declare class GifflarContractManager implements IGifflarContractManager {
    private contractModel;
    private contractWriter;
    private deployer;
    private compiler;
    contracts: Array<IGifflarContract>;
    code: string;
    json: any;
    constructor(contractModel: IGifflarContractModel, contractWriter: IContractWriter, deployer: IDeployer, compiler: ICompiler);
    private _writeContracts;
    newContract(name: string): IGifflarContract;
    getContract(name: string): IGifflarContract;
    writeAll(): string;
    write(contracts: Array<IGifflarContract>): string;
    written(): string | undefined;
    compileAll(callback: (errors: Array<any>) => void): any;
    compile(contractName: string, callback: (errors: Array<any>) => void): void;
    deploy(contractName: string, inputs: IManagerDeployDTO): Promise<Contract>;
    setWeb3(newWeb3: Web3): Web3;
    getWeb3(): Web3 | null | undefined;
}
export default GifflarContractManager;
