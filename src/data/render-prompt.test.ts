import { describe, expect, it } from "vite-plus/test";
import { promptTemplates } from "./prompts";
import { renderPrompt } from "./render-prompt";

describe("renderPrompt", () => {
  it("replaces values and applies modifiers", () => {
    const result = renderPrompt("Tone: {{tone.toLower}}\nTraits:\n{{traits.toList}}", {
      "{{tone}}": "Professional",
      "{{traits}}": ["Clear", "Focused"],
    });

    expect(result).toBe("Tone: professional\nTraits:\n• Clear\n• Focused");
  });

  it("includes conditional sections only when a value is present", () => {
    const template = "Start[if optional] Optional: {{optional}}[endif] End";

    expect(renderPrompt(template, {})).toBe("Start End");
    expect(renderPrompt(template, { "{{optional}}": "included" })).toBe(
      "Start Optional: included End",
    );
  });

  it("normalizes whitespace after rendering", () => {
    expect(renderPrompt("  First  \n\n\n  Second  ", {})).toBe("First\n\n  Second");
  });
});

describe("prompt templates", () => {
  it("loads templates with unique IDs and required metadata", () => {
    const ids = promptTemplates.map((template) => template.id);

    expect(promptTemplates.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
    expect(promptTemplates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          template: expect.any(String),
          fields: expect.any(Array),
        }),
      ]),
    );
  });
});
