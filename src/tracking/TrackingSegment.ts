const AnalyticsVieON = require("analytics-node-vieon");
const SEGMENT_ID = process.env.REACT_APP_SEMGENT_ID;
let path =
  "/topics/vieon-tracking-web" + process.env.REACT_APP_NODE_ENV
    ? "-" + process.env.REACT_APP_NODE_ENV
    : "";

declare global {
  interface Window {
    analytics?: any;
    analyticsVieON?: any;
    analyticsVieONImmediate?: any;
  }
}

export class Tracking {
  public static init() {
    // Create a queue, but don't obliterate an existing one!
    // let analytics = (window.analytics = window.analytics || []);
    let analyticsVieON = (window.analyticsVieON = window.analyticsVieON || []);
    let analyticsVieONImmediate = (window.analyticsVieONImmediate =
      window.analyticsVieONImmediate || []);

    // If the snippet was invoked already show an error.
    if (analyticsVieON.invoked) {
      if (window.console && console.error) {
        console.error("Segment or VieON Segment snippet included twice.");
      }
      return;
    }

    // If the snippet was invoked already show an error.
    if (analyticsVieONImmediate.invoked) {
      if (window.console && console.error) {
        console.error("Segment or VieON Segment snippet included twice.");
      }
      return;
    }

    const axiosConfig = {
      transformRequest: [
        (data: any) => {
          const records = data.records || data.batch || [];
          records.forEach((element: any) => {
            const elm = element.value || element;
            elm.context = elm.context || {};
            elm.context.app = elm.context.app || {};
            elm.context.ip = "";
          });
          return JSON.stringify(data);
        },
      ],
    };
    analyticsVieON = new AnalyticsVieON(SEGMENT_ID, {
      host: "https://vieon-tracking.vieon.vn",
      path,
      axiosConfig,
    });
    analyticsVieONImmediate = new AnalyticsVieON(SEGMENT_ID, {
      host: "https://vieon-tracking.vieon.vn",
      path,
      axiosConfig,
      flushAt: 1,
    });
    // Invoked flag, to make sure the snippet
    // is never invoked twice.
    analyticsVieON.invoked = true;
    analyticsVieONImmediate.invoked = true;

    window.analyticsVieON = analyticsVieON;
    window.analyticsVieONImmediate = analyticsVieONImmediate;
  }
  static shootIdentify() {
    console.log(window.analyticsVieON);
    window.analyticsVieON && window.analyticsVieON.track("hello");
  }
}
