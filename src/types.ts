type TargetFileNameBaseParams = {
  prefix: string;
  startingIndex: number;
}

type TargetPath = string | null;

export type CommandArguments = TargetFileNameBaseParams & {
  origin: string;
  target: TargetPath;
}

export type TargetFolder = {
  originFolderName: string;
  originParent: string;
  target: TargetPath;
}

type TargetFileName = TargetFileNameBaseParams & {
  index: number; 
}

export type TargetFile = TargetFileName & {
  extension: string;
}

export type NewFileRenameProps = TargetFileName & {
  origin: string;
  originalFileName: string;
  targetFolderName: string;
}
