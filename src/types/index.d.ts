export type Chunk = {
  index: number;
  data: Buffer;
  file: any;
};

export type BuildArgs = {
  options: any;
  logger?: any;
  config?: {
    exitOnError: boolean;
  };
};

export type ConfigArg = {
  exitOnError: boolean;
};
