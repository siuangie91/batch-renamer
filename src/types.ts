export interface ExpectedArguments {
  origin: string;
  prefix: string;
  target: string | null;
  startingIndex: number;
}

export interface TargetFolder {
  target: string | null;
  originFolderName: string;
  originParent: string;
}

export interface TargetFileName {
  prefix: string;
  extension: string;
  startingIndex: number;
  index: number;
}

export interface NewFileRenameInput {
  origin: string;
  originalFile: string;
  targetFolder: string;
  startingIndex: number;
  index: number;
  prefix: string;
}
