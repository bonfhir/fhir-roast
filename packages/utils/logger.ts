import { ILogObj, IMeta, Logger } from "tslog";

const DEFAULT_LOG_LEVEL = 3;

const LOG_LEVELS = {
  0: "silly",
  1: "trace",
  2: "debug",
  3: "info",
  4: "warn",
  5: "error",
  6: "fatal",
};

const baseLogger = new Logger<ILogObj>({
  type: "pretty",
  minLevel: process.env.LOG_LEVEL
    ? parseInt(process.env.LOG_LEVEL)
    : DEFAULT_LOG_LEVEL,
  overwrite: {
    formatMeta: (meta: IMeta | undefined) => {
      if (!meta) {
        return "";
      }

      let metaString = `[${meta.logLevelName}]`;
      if (meta.name) metaString += `[${meta.name}]`;

      return metaString + ": ";
    },
  },
});
if (process.env.LOG_LEVEL !== DEFAULT_LOG_LEVEL.toString()) {
  baseLogger.info(
    `Log level set to ${process.env.LOG_LEVEL || LOG_LEVELS[DEFAULT_LOG_LEVEL]}`
  );
}

function createLogger(name: string) {
  return baseLogger.getSubLogger({ name });
}

export { createLogger, type ILogObj, type Logger };
