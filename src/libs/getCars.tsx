export default async function getCars() {

    // await new Promise( (resolve)=>setTimeout(resolve, 1000) )

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars`, { next: {tags:['cars']} })
    if(!response.ok) {
        throw new Error("Failed to fetch cars")
    }

    return await response.json()
}