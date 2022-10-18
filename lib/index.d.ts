export declare const Actions: (
  event: any,
  options: import("./types.js").Config
) => Promise<void>;
export declare const ActionsList: import("./types.js").Action[];
export declare const Commands: (
  CommandEvent: import("./types.js").CommandEvent
) => Promise<void | import("./types.js").Result>;
export declare const CommandsList: import("./types.js").Command[];
