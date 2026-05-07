import type { MDXComponents } from "mdx/types";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  OlHTMLAttributes,
} from "react";
import { CodeBlock } from "@/components/CodeBlock";

const headingBase = "scroll-mt-24 font-semibold tracking-tight text-[#1F2937]";

const defaultComponents: MDXComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className={`${headingBase} text-3xl md:text-4xl mt-2 mb-6`}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className={`${headingBase} text-2xl mt-10 mb-4`} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className={`${headingBase} text-xl mt-8 mb-3`} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="my-4 text-base leading-[1.8] text-[#1F2937]"
    />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className="my-4 list-disc space-y-1 pl-6 text-[#1F2937]"
    />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="my-4 list-decimal space-y-1 pl-6 text-[#1F2937]"
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-[1.8]" />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded bg-[#F3F0EA] px-1.5 py-0.5 font-mono text-sm text-[#1F2937]"
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
  };
}
