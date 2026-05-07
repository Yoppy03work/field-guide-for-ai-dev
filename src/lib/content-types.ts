export type Status = "green" | "yellow" | "blue";

export const STATUSES = ["green", "yellow", "blue"] as const;

export const CATEGORIES = [
  "learn",
  "workflow",
  "tools",
  "cases",
  "tutorials",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const TUTORIAL_DIFFICULTIES = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
export type TutorialDifficulty = (typeof TUTORIAL_DIFFICULTIES)[number];

type BaseFrontmatter = {
  title: string;
  slug: string;
  status: Status;
};

export type LearnFrontmatter = BaseFrontmatter;

export type WorkflowFrontmatter = BaseFrontmatter;

export type ToolFrontmatter = BaseFrontmatter & {
  oneLiner: string;
  icon: string;
  order: number;
};

export type CaseFrontmatter = BaseFrontmatter & {
  date: string;
  tools: readonly string[];
  relatedIssue?: number;
  relatedPR?: number;
};

export type TutorialFrontmatter = BaseFrontmatter & {
  estimatedMinutes: number;
  difficulty: TutorialDifficulty;
  prerequisites?: readonly string[];
  order?: number;
};

export type FrontmatterFor<C extends Category> = C extends "tools"
  ? ToolFrontmatter
  : C extends "cases"
    ? CaseFrontmatter
    : C extends "learn"
      ? LearnFrontmatter
      : C extends "workflow"
        ? WorkflowFrontmatter
        : C extends "tutorials"
          ? TutorialFrontmatter
          : never;

export function isStatus(value: unknown): value is Status {
  return (
    typeof value === "string" &&
    (STATUSES as readonly string[]).includes(value)
  );
}

export function isCategory(value: unknown): value is Category {
  return (
    typeof value === "string" &&
    (CATEGORIES as readonly string[]).includes(value)
  );
}

export function isTutorialDifficulty(
  value: unknown,
): value is TutorialDifficulty {
  return (
    typeof value === "string" &&
    (TUTORIAL_DIFFICULTIES as readonly string[]).includes(value)
  );
}
