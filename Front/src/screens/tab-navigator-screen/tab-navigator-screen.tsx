import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavigationScreens } from "../../enums";
import { UserProfileScreen, HomePageScreen, ChatScreen, MyPostsScreen } from "../index";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const TabNavigatorScreen: FC<{}> = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={TabNavigationScreens.HomePage}
        component={HomePageScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="md-home"
              size={24}
              color={ "#8e8e93"}
            />
          ),
        }}
      />
       <Tab.Screen
        name={TabNavigationScreens.Myposts}
        component={MyPostsScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="md-list"
              size={24}
              color={"#8e8e93"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNavigationScreens.UserProfile}
        component={UserProfileScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="md-person-circle-outline"
              size={24}
              color={ "#8e8e93"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNavigationScreens.CharScreen}
        component={ChatScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="md-chatbox"
              size={24}
              color={ "#8e8e93"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
