import * as minidom from './utils/minidom.js'

declare global {
  var skruvSSRScript: string;
  var Location: minidom.Location;
  // @ts-ignore
  var document: {
    documentElement: minidom.HTMLElement
  }
}
