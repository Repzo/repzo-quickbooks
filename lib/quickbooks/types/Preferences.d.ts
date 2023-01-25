export declare namespace Preferences {
  interface PreferencesObject {
    [key: string]: any;
    SalesFormsPrefs: {
      [key: string]: any;
      CustomTxnNumbers: boolean;
    };
  }
  namespace Find {
    type Params = {
      query: string;
      [key: string]: any;
    };
    interface Result {
      QueryResponse: {
        Preferences: PreferencesObject[];
        maxResults: number;
      };
      time: Date;
    }
  }
  namespace Create {
    type Body = PreferencesObject;
    type Result = {
      Preferences: PreferencesObject;
      time: Date;
    };
  }
}
