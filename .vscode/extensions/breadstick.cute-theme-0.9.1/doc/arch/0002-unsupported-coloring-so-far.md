# 2. Unsupported coloring so far

Date: 2020-09-05

## Status

Proposed

## Context

Some tokens are not parsed by VSCode, which makes certain tokens undifferentiable.

## Decision

Add grammar injection(s) to support additional tokens or tokenization:
* Added C/CPP grammar injection for doxygen inline comments

  Copied an existing TextMate rule from the VSCode project and made a slight modification to it [5]. This rule takes
  precedence over the existing rule, broadening the applicability of documentation tokens.

These tokens are not differentiable by default, so they cannot be colored as desired:
* To be revisited

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

## References / Links

1. [TextMate Language Grammars](https://macromates.com/manual/en/language_grammars)
2. [VSCode Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
3. [VSCode Grammars Contribution Point](https://code.visualstudio.com/api/references/contribution-points#contributes.grammars)
4. [VSCode C Grammar](https://github.com/microsoft/vscode/blob/1d7b32b88049db0c3f05df8a3557f94ec0c51fc1/extensions/cpp/syntaxes/c.tmLanguage.json#L632-L716)
5. [VSCode CPP Grammar](https://github.com/microsoft/vscode/blob/6c797984fb961fdc347677173e50742078d01bd1/extensions/cpp/syntaxes/cpp.tmLanguage.json#L1158-L1242)
6. [VSCode CPP Grammar Fix](https://github.com/dstodev/vscode/commit/97ec7afc81a2ae9e3c9a547c8510d4227bc4ef08)
