import NotificationContext from "./notificationContext.js"

export default class HeroEntity extends NotificationContext {
    constructor({ name, age }) {
        super()

        this.name = name
        this.age = age
    }

    isValid() {
        if(this.age < 20) {
            this.addNotifications('age must be higher than 20!')
        }
     
        if(this.name?.lenght < 4) {
            this.addNotifications('name lenght must be higher than 4!')
        }

        return this.hasNotifications()
    }
}