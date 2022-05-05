import { IContents } from "@models/content/types/IContents";
import { IIf } from "@models/if/types/IIf";
import { container } from "tsyringe";
import { IIfWriter } from "../types/IIfWriter";

describe("If Writer", () => {
  const writeContentMock = (content: IContents[]) => {
    return "age = 20;\n";
  };

  const ifWriter: IIfWriter = container.resolve("IfWriter");
  ifWriter._init(writeContentMock);

  it("Writing If", () => {
    const myif: IIf = {
      statement: "if",
      condition: "2 > 1",
      content: [],
      else: false,
    };

    const expected = "if(2 > 1){\nage = 20;\n}";
    const result = ifWriter.write(myif);

    expect(result).toMatch(expected);
  });

  it("Writing Else", () => {
    const myelse: IIf = {
      statement: "if",
      condition: "",
      content: [],
      else: true,
    };

    const expected = "else{\nage = 20;\n}";
    const result = ifWriter.write(myelse);

    expect(result).toMatch(expected);
  });
});
