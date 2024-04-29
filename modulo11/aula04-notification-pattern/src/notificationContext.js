export default class NotificationContext {
    constructor() {
        this.notification = []
    }

    hasNotification() {
        return this.notification.length > 0
    }

    addNotifications(notification) {
        this.notification.push(notification)
    }
}