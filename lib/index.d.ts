export declare const Actions: (
  event: any,
  options: import("./types").Config
) => Promise<any>;
export declare const ActionsList: import("./types").Action[];
export declare const Commands: (
  CommandEvent: import("./types").CommandEvent
) => Promise<void | import("./types").Result>;
export declare const CommandsList: import("./types").Command[];
