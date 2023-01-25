export namespace Preferences {
  export interface PreferencesObject {
    [key: string]: any;
    SalesFormsPrefs: {
      [key: string]: any;
      CustomTxnNumbers: boolean;
    };
  }

  export namespace Find {
    export type Params = {
      query: string;
      [key: string]: any; // integration_meta. & customFields.
    };
    export interface Result {
      QueryResponse: {
        Preferences: PreferencesObject[];
        maxResults: number;
      };
      time: Date;
    }
  }

  export namespace Create {
    export type Body = PreferencesObject;
    export type Result = {
      Preferences: PreferencesObject;
      time: Date;
    };
  }
}
