import { type Command, Extension } from "@tiptap/core";
import {
  AllSelection,
  TextSelection,
  type Transaction,
} from "prosemirror-state";

interface IndentOptions {
  types: string[];
  minLevel: number;
  maxLevel: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: "indent",

  addOptions() {
    return {
      types: ["listItem", "paragraph", "heading"],
      minLevel: 0,
      maxLevel: 8,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            renderHTML: (attributes) =>
              attributes?.indent > this.options.minLevel
                ? { "data-indent": attributes.indent }
                : null,
            parseHTML: (element) => {
              const level = Number(element.getAttribute("data-indent"));
              return level && level > this.options.minLevel ? level : null;
            },
          },
        },
      },
    ];
  },

  addCommands() {
    const setIndentLevel = (
      pos: number,
      delta: number,
      tr: Transaction,
    ): Transaction => {
      const node = tr.doc.nodeAt(pos);
      if (!node) return tr;

      const nextLevel = (node.attrs.indent || 0) + delta;
      const { minLevel, maxLevel } = this.options;
      const indent = Math.min(Math.max(nextLevel, minLevel), maxLevel);

      if (indent === node.attrs.indent) return tr;

      const { indent: oldIndent, ...attrs } = node.attrs;
      const nodeAttrs = indent > minLevel ? { ...attrs, indent } : attrs;

      return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
    };

    const updateSelection =
      (delta: number): Command =>
      ({ tr, state, dispatch }) => {
        const { selection, doc } = state;
        if (
          !(
            selection instanceof TextSelection ||
            selection instanceof AllSelection
          )
        ) {
          return false;
        }

        tr = tr.setSelection(selection);
        doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            tr = setIndentLevel(pos, delta, tr);
            return false;
          }
          return true;
        });

        if (!tr.docChanged) return false;

        dispatch?.(tr);
        return true;
      };

    return {
      indent: () => updateSelection(1),
      outdent: () => updateSelection(-1),
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
      "Shift-Tab": () => this.editor.commands.outdent(),
    };
  },
});
