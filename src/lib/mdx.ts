import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  type Category,
  type FrontmatterFor,
  isCategory,
  isStatus,
  isTutorialDifficulty,
} from "./content-types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function assertCategory(category: string): asserts category is Category {
  if (!isCategory(category)) {
    throw new Error(
      `Invalid content category: "${category}". Allowed: learn / workflow / tools / cases`,
    );
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function validateBase(
  data: Record<string, unknown>,
  filePath: string,
): void {
  for (const key of ["title", "slug"] as const) {
    if (!isNonEmptyString(data[key])) {
      throw new Error(
        `Frontmatter "${key}" missing or empty in ${filePath}`,
      );
    }
  }
  if (!isStatus(data["status"])) {
    throw new Error(
      `Frontmatter "status" must be "green" | "yellow" | "blue" in ${filePath}`,
    );
  }
}

function validateTool(
  data: Record<string, unknown>,
  filePath: string,
): void {
  validateBase(data, filePath);
  for (const key of ["oneLiner", "icon"] as const) {
    if (!isNonEmptyString(data[key])) {
      throw new Error(
        `Tool frontmatter "${key}" missing in ${filePath}`,
      );
    }
  }
  if (typeof data["order"] !== "number") {
    throw new Error(
      `Tool frontmatter "order" must be a number in ${filePath}`,
    );
  }
}

function validateCase(
  data: Record<string, unknown>,
  filePath: string,
): void {
  validateBase(data, filePath);
  if (!isNonEmptyString(data["date"])) {
    throw new Error(`Case frontmatter "date" missing in ${filePath}`);
  }
  const tools = data["tools"];
  if (
    !Array.isArray(tools) ||
    !tools.every((t): t is string => typeof t === "string")
  ) {
    throw new Error(
      `Case frontmatter "tools" must be a string[] in ${filePath}`,
    );
  }
  for (const key of ["relatedIssue", "relatedPR"] as const) {
    const value = data[key];
    if (value !== undefined && typeof value !== "number") {
      throw new Error(
        `Case frontmatter "${key}" must be a number if present (in ${filePath})`,
      );
    }
  }
}

function validateTutorial(
  data: Record<string, unknown>,
  filePath: string,
): void {
  validateBase(data, filePath);
  if (typeof data["estimatedMinutes"] !== "number") {
    throw new Error(
      `Tutorial frontmatter "estimatedMinutes" must be a number in ${filePath}`,
    );
  }
  if (!isTutorialDifficulty(data["difficulty"])) {
    throw new Error(
      `Tutorial frontmatter "difficulty" must be "beginner" | "intermediate" | "advanced" in ${filePath}`,
    );
  }
  const prerequisites = data["prerequisites"];
  if (prerequisites !== undefined) {
    if (
      !Array.isArray(prerequisites) ||
      !prerequisites.every((p): p is string => typeof p === "string")
    ) {
      throw new Error(
        `Tutorial frontmatter "prerequisites" must be a string[] if present (in ${filePath})`,
      );
    }
  }
  if (data["order"] !== undefined && typeof data["order"] !== "number") {
    throw new Error(
      `Tutorial frontmatter "order" must be a number if present (in ${filePath})`,
    );
  }
}

function castFrontmatter<C extends Category>(
  category: C,
  data: Record<string, unknown>,
  filePath: string,
): FrontmatterFor<C> {
  if (category === "tools") {
    validateTool(data, filePath);
  } else if (category === "cases") {
    validateCase(data, filePath);
  } else if (category === "tutorials") {
    validateTutorial(data, filePath);
  } else {
    validateBase(data, filePath);
  }
  return data as FrontmatterFor<C>;
}

export async function getContentBySlug<C extends Category>(
  category: C,
  slug: string,
): Promise<{ frontmatter: FrontmatterFor<C>; content: string }> {
  assertCategory(category);
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    throw new Error(`Content not found: ${category}/${slug}.mdx`);
  }
  const parsed = matter(raw);
  const frontmatter = castFrontmatter(
    category,
    parsed.data as Record<string, unknown>,
    filePath,
  );
  return { frontmatter, content: parsed.content };
}

export async function getAllContentMeta<C extends Category>(
  category: C,
): Promise<readonly FrontmatterFor<C>[]> {
  assertCategory(category);
  const dir = path.join(CONTENT_DIR, category);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const mdxFiles = entries.filter((name) => name.endsWith(".mdx")).sort();
  const items: FrontmatterFor<C>[] = [];
  for (const fileName of mdxFiles) {
    const slug = fileName.replace(/\.mdx$/u, "");
    const { frontmatter } = await getContentBySlug(category, slug);
    items.push(frontmatter);
  }
  return sortMeta(category, items);
}

function sortMeta<C extends Category>(
  category: C,
  items: FrontmatterFor<C>[],
): readonly FrontmatterFor<C>[] {
  if (category === "tools") {
    return [...items].sort((a, b) => {
      const ao = (a as unknown as { order: number }).order;
      const bo = (b as unknown as { order: number }).order;
      return ao - bo;
    });
  }
  if (category === "cases") {
    return [...items].sort((a, b) => {
      const ad = (a as unknown as { date: string }).date;
      const bd = (b as unknown as { date: string }).date;
      return bd.localeCompare(ad);
    });
  }
  if (category === "tutorials") {
    return [...items].sort((a, b) => {
      const ao =
        (a as unknown as { order?: number }).order ?? Number.MAX_SAFE_INTEGER;
      const bo =
        (b as unknown as { order?: number }).order ?? Number.MAX_SAFE_INTEGER;
      return ao - bo;
    });
  }
  return items;
}
