import { View, Text } from 'react-native'
import React from 'react'
import notifee, { TimestampTrigger, TriggerType, RepeatFrequency, AndroidColor } from '@notifee/react-native';


export default function useNotification() {
    async function displayNotification(title: string, body: string) {
        // Create a channel required for Android Notifications
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.requestPermission();

        notifee.registerForegroundService((notification) => {
            return new Promise(() => {
                console.log("Notification", notification)
                for (let notifyValue = 0; notifyValue < Infinity; notifyValue++) {
                    console.log(notifyValue)
                }
            });
        });

        // Display a notification
        const notificationId = notifee.displayNotification({
            // id: "string" | updates Notification instead if provided id already exists
            title: title,
            body: body,
            android: {
                channelId,
                asForegroundService: true,
                color: AndroidColor.WHITE,
                colorized: true,

            },
        });
        return notificationId;
    }


    return {
        displayNotification
    }
}