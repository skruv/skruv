import {Location} from './utils/minidom.js'

declare module "skruv" {
  namespace JSX {
    interface IntrinsicElements {}
  }
  var skruvSSRScript: string;
  var location: Location
}