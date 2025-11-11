{
    "wardMembers": [
        {
            "familyName": "Adeyemi",
            "dateMovedIn": "2025-10-15",
            "numberOfPeople": 4,
            "visitedByBishopric": true,
            "familyMembers": [
                {
                    "name": "John Adeyemi",
                    "gender": "Male",
                    "birthdate": "1985-04-12"
                },
                {
                    "name": "Mary Adeyemi",
                    "gender": "Female",
                    "birthdate": "1988-07-22"
                },
                {
                    "name": "David Adeyemi",
                    "gender": "Male",
                    "birthdate": "2010-03-15"
                },
                {
                    "name": "Grace Adeyemi",
                    "gender": "Female",
                    "birthdate": "2015-11-30"
                }
            ]
        },
        {
            "familyName": "Owolabi",
            "dateMovedIn": "2025-08-05",
            "numberOfPeople": 3,
            "visitedByBishopric": false,
            "familyMembers": [
                {
                    "name": "Taiwo Owolabi",
                    "gender": "Male",
                    "birthdate": "1992-06-10"
                },
                {
                    "name": "Yetunde Owolabi",
                    "gender": "Female",
                    "birthdate": "1993-02-18"
                },
                {
                    "name": "Samuel Owolabi",
                    "gender": "Male",
                    "birthdate": "2020-09-02"
                }
            ]
        }
    ]
}




const myPromise = new Promise((resolve, reject) => {
    const success = true; // Simulate success or failure
    if (success) {
        resolve("Operation was successful!");
    } else {
        reject("Operation failed.");
    }
});

myPromise
    .then((result) => {
        console.log(result); // Output: "Operation was successful!"
    })
    .catch((error) => {
        console.error(error); // Output: "Operation failed."
    });


const fetchData = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // Wait for the fetch to complete
        const data = await response.json(); // Wait for the response to be converted to JSON
        console.log(data); // Output the fetched data
    } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
    }
};