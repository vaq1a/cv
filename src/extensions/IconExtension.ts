import {
  Node,
  type NodeViewRenderer,
  type NodeViewRendererProps,
} from "@tiptap/core";

export const IconExtension = Node.create({
  name: "icon",
  group: "inline",
  inline: true,

  addAttributes() {
    return {
      name: {
        default: null,
      },
      svg: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span.icon",
        getAttrs: (node) => {
          const svgElement = node.querySelector("svg");
          if (!svgElement) return false;

          return {
            svg: svgElement.outerHTML,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { svg, ...rest } = HTMLAttributes;
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svg as string, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    return [
      "span",
      {
        class: "icon",
        ...rest,
      },
      svgElement,
    ];
  },

  addNodeView(): NodeViewRenderer {
    return (props: NodeViewRendererProps) => {
      const dom = document.createElement("span");
      dom.className = "icon";
      dom.innerHTML = (
        props.node.attrs as {
          svg: string;
        }
      ).svg;

      return {
        dom,
        update: (node) => {
          dom.innerHTML = (node.attrs as { svg: string }).svg;
          return true;
        },
      };
    };
  },
});

// Схема работы:
//
// ```jsx
// // 1. parseHTML получает HTML
// '<span class="icon" data-svg="<svg>...</svg>">'
//
// // 2. parseHTML извлекает данные
// parseHTML() {
//   return [{
//     tag: "span",
//     attrs: { svg: "..." }
//   }];
// }
//
// // 3. renderHTML создает элемент
// renderHTML({ HTMLAttributes }) {
//   return ["span", {
//     class: "icon",
//     innerHTML: HTMLAttributes.svg
//   }];
// }
// ```
//
// Этот процесс обеспечивает:
//
//   - Безопасное извлечение данных из HTML
// - Корректную трансформацию между форматами
// - Правильное восстановление структуры при рендеринге
