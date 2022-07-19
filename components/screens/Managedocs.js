import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Uploads from "./uploadlist";
import SharedDocs from "./shareddocs";

const tab = createBottomTabNavigator();

export default function ManageDocs() {
  return (
    <tab.Navigator>
      <tab.Screen
        name="uploadlist"
        component={Uploads}
        options={{
          headerShown: false,
        }}
      />
      <tab.Screen
        name="shareddocs"
        component={SharedDocs}
        options={{
          headerShown: false,
        }}
      />
    </tab.Navigator>
  );
}
