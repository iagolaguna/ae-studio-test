import Location from './Location'

interface Business {
    locationAccount?: string
    businessName?: string
    dbaName?: string
    streetAdress?: string
    city?: string
    zipCode?: string
    locationDescription?: string
    mailingAddress?: string
    mailingCity?: string
    mailingZipCode?: string
    naics?: string
    primaryNaicsDescription?: string
    councilDistrict?: string
    locationStartDate?: Date
    location?: Location
}

export default Business