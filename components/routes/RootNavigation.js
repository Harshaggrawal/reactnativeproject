import * as React from "react";
export const navigationRef = React.createRef();

// -------- Root navigation for all Components ----------
export function navigate(name) {
  navigationRef.current?.navigate(name);
}
