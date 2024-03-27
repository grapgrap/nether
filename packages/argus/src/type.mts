export type GlobPattern = string;

export type Path = string;

export type FileChangeType = "create" | "update" | "delete";

export interface FileChangeEvent {
  type: FileChangeType;
  path: Path;
}
