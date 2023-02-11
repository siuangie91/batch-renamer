export type ExpectedArguments = {
  origin: string;
  prefix: string;
  target: string | null;
  startingIndex: number;
}

export type TargetFolder = {
  target: string | null;
  originFolderName: string;
  originParent: string;
}

export type TargetFileName = {
  prefix: string;
  extension: string;
  startingIndex: number;
  index: number;
}

export type NewFileRenameInput = {
  origin: string;
  originalFile: string;
  targetFolder: string;
  startingIndex: number;
  index: number;
  prefix: string;
}
