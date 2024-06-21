


export const parseForm = (formData: string, searchFor: string): string => {
    let kvPairs = formData.split("&")
    for (let i = 0; i < kvPairs.length; i++) {
        let kvPair = kvPairs[i]
        let split = kvPair.split('=')
        let key = split[0]
        let value = split[1]
        if (key == searchFor) {
            return value
        }
    } 
    return ""
}

export const getCookie = (cookieStr: string, searchFor: string): string => {
    let kvPairs = cookieStr.split('; ')
    for (let i = 0; i < kvPairs.length; i++) {
        let kvPair = kvPairs[i]
        let split = kvPair.split('=')
        let key = split[0]
        let value = split[1]
        if (key == searchFor) {
            return value
        }
    }
    return ""
}