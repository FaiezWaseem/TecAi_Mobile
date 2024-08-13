
import Storage from "../Storage";
import fetcher from "../fetcher";
import Cache from '../Cache'
import log from "../log";

const getMe = async () => {
    const token = await Storage.get('token') || null;

    if (!token) {
        return null;
    }
    log('Method : getMe', token)
    try {
        const isExist = await Cache.getSessionValue('user', Cache.JSON)
        if (isExist) {
            log('User Loading From Cache')
            return isExist
        }
        const res = await fetcher.get('/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        log('Method : getMe', res.data)
        if (res.data?.success) {
            Cache.setSessionValue('user', res.data, Cache.JSON)
            return res.data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMe', error.message)
        }
        return null;
    }
}
const getMyAssignments = async () => {
    const token = await Storage.get('token') || null;

    if (!token) {
        return null;
    }
    log('Method : getMyAssignments ', token)
    try {
        // const isExist = await Cache.getSessionValue('assignments', Cache.JSON)
        // if(isExist){
        //     log('assignments Loading From Cache')
        //     return isExist
        // }
        const { data } = await fetcher.get('/assignments', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        log(data)
        if (data?.success) {
            // Cache.setSessionValue('assignments', data, Cache.JSON)
            return data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMyAssignments', error.message)
        }
        return null;
    }
}
const getAttendance = async () => {
    const token = await Storage.get('token') || null;

    if (!token) {
        return null;
    }
    log('Method : getAttendance ', token)
    try {
        const isExist = await Cache.getSessionValue('attendance', Cache.JSON)
        if (isExist) {
            log('attendance Loading From Cache')
            return isExist
        }
        const { data } = await fetcher.get('/attendance', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        log(data)
        if (data?.status) {
            Cache.setSessionValue('attendance', data, Cache.JSON)
            return data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMyAssignments', error.message)
        }
    }

}
const getAttendanceByDate = async (date : string) => {
    const token = await Storage.get('token') || null;

    if (!token) {
        return null;
    }
    log('Method : getAttendanceByDate ', token)
    try {
        const isExist = await Cache.getSessionValue('attendanceData', Cache.JSON)
        if (isExist) {
            log('attendance Loading From Cache')
            return isExist
        }
        const { data } = await fetcher.post('/attendance', { date }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        // log(data)
        if (data?.status) {
            Cache.setSessionValue('attendanceDate', data, Cache.JSON)
            return data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMyAssignments', error.message)
        }
    }

}
const setNotificationToken = async (pushtoken : string) => {
    const token = await Storage.get('token') || null;
    if (!token) {
        return null;
    }
    const notificationToken = await Storage.get('notificationToken') || null;

    if (notificationToken) {
        log('Token Already Updated')
        return null;
    }
    log('Method : getNotificationToken ', notificationToken)
    try {
        const isExist = await Cache.getSessionValue('notificationToken', Cache.JSON)
        if (isExist) {
            log('attendance Loading From Cache')
            return isExist
        }
        const { data } = await fetcher.post('/user/update/token', { token: pushtoken }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "/",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        log(data)
        if (data?.status) {
            Cache.setSessionValue('notificationToken', data, Cache.JSON)
            log("token" + data?.token)
            Storage.save('notificationToken', data?.user?.token, Storage.DEFAULT);

            return data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMyAssignments', error.message)
        }
    }

}
const getHomework = async () => {
    const token = await Storage.get('token') || null;

    if (!token) {
        return null;
    }
    log('Method : getHomework ', token)
    try {
        const isExist = await Cache.getSessionValue('homeworks', Cache.JSON)
        if (isExist) {
            log('homeworks Loading From Cache')
            return isExist
        }
        const { data } = await fetcher.get('/homeworks', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        log(data)
        if (data?.success) {
            Cache.setSessionValue('homeworks', data, Cache.JSON)
            return data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMyAssignments', error.message)
        }
    }
}
const getMarks = async () => {
    const token = await Storage.get('token') || null;

    if (!token) {
        return null;
    }
    log('Method : getMarks ', token)
    try {
        // const isExist = await Cache.getSessionValue('marks', Cache.JSON)
        // if(isExist){
        //     log('marks Loading From Cache')
        //     return isExist
        // }
        const { data } = await fetcher.get('/marks', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        log(data)
        // return data;
        if (data?.status) {
            // Cache.setSessionValue('marks', data, Cache.JSON)
            return data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMyAssignments', error.message)
        }
    }
}
const getMonthlyAttendance = async () => {
    const token = await Storage.get('token') || null;

    if (!token) {
        return null;
    }
    log('Method : getMonthlyAttendance ', token)
    try {
        // // const isExist = await Cache.getSessionValue('monthlyAttendance', Cache.JSON)
        // if(isExist){
        //     log('monthlyAttendance Loading From Cache')
        //     return isExist
        // }
        const { data } = await fetcher.get('/month/attendance', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        log(data)
        if (data?.status) {
            // Cache.setSessionValue('monthlyAttendance', data, Cache.JSON)
            return data;
        }

    } catch (error) {
        if(error instanceof Error){
            log('Method : getMyAssignments', error.message)
        }
    }
}
export { getMe, getMyAssignments, getAttendance, getAttendanceByDate, setNotificationToken, getHomework, getMarks, getMonthlyAttendance }  