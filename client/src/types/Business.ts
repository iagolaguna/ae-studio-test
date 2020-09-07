
export type Business = {
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

export type Location = {
    latitude: number
    longitude: number
}