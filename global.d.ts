import * as minidom from './utils/minidom.js'

declare global {
  var skruvSSRScript: string;
  var Location: minidom.Location;
}
