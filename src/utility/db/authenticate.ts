import Storage from "../Storage";
const isAuthenticated = async () => {
    const token = (await Storage.get('token')) || null;
    return token ? true : false;
}
const isNotification = async () => {
    const token = (await Storage.get('notificationToken')) || null;
    return token ? true : false;
}
const clearSession = async () => {
   await Storage.clear();
}

export { 
    isAuthenticated,
    clearSession,
    isNotification
}