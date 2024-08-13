import * as React from "react";

import TabBtm from './Tabs'
import type { NavigationProps } from "../../props/navigation-props";
export default function HomeScreen({ navigation } : NavigationProps){
  return <TabBtm navigation={navigation} />
}
