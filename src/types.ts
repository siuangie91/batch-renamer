export type CommandArguments = {
  origin: string;
  prefix: string;
  startingIndex: number;
  target: string | null;
}

export type TargetFolder = {
  originFolderName: string;
  originParent: string;
  target: string | null;
}

export type TargetFile = {
  extension: string;
  index: number;
  prefix: string;
  startingIndex: number;
}

export type NewFileRenameProps = {
  index: number;
  origin: string;
  originalFileName: string;
  prefix: string;
  startingIndex: number;
  targetFolder: string;
}
