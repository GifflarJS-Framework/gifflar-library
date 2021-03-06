import { IContents } from "@models/content/types/IContents";
import { IEventWriter } from "@writers/eventWriter/types/IEventWriter";
import { IAssignmentWriter } from "@writers/statements/assignmentWriter/types/IAssignmentWriter";
import { IEventCallWriter } from "@writers/statements/eventCallWriter/types/IEventCallWriter";
import { IForWriter } from "@writers/statements/forWriter/types/IForWriter";
import { IIfWriter } from "@writers/statements/ifWriter/types/IIfWriter";
import { IMethodCallWriter } from "@writers/statements/methodCallWriter/types/IMethodCallWriter";
import { IVariableWriter } from "@writers/variableWriter/types/IVariableWriter";
import { inject, injectable } from "tsyringe";
import { IContentWriter } from "../types/IContentWriter";

@injectable()
class ContentWriter implements IContentWriter {
  constructor(
    @inject("AssignmentWriter")
    private assignmentWriter: IAssignmentWriter,
    @inject("IfWriter")
    private ifWriter: IIfWriter,
    @inject("ForWriter")
    private forWriter: IForWriter,
    @inject("EventCallWriter")
    private eventCallWriter: IEventCallWriter,
    @inject("EventWriter")
    private eventWriter: IEventWriter,
    @inject("VariableWriter")
    private variableWriter: IVariableWriter,
    @inject("MethodCallWriter")
    private methodCallWriter: IMethodCallWriter
  ) {
    ifWriter._init(this);
    forWriter._init(this);
  }

  statements = {
    assignment: this.assignmentWriter,
    if: this.ifWriter,
    for: this.forWriter,
    event: this.eventWriter,
    event_call: this.eventCallWriter,
    variable: this.variableWriter,
    method_call: this.methodCallWriter,
  };

  // All statement control that doesn't need the ; in the end
  controls = ["if", "for"];

  write(content: Array<IContents>): string {
    let text = "";

    // Defining the statement content
    content.map((item) => {
      const handler = this.statements[item.statement];
      if (handler) {
        const anyItem: any = item;
        text += handler.write(anyItem);

        if (!this.controls.includes(item.statement)) {
          text += ";\n";
        }
      }

      return text;
    });

    return text;
  }
}

export default ContentWriter;
