export async function fetchSampleUsers() {
    try{
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const sampleUsers = await res.json();
        return sampleUsers.map(({id, name, email}) => ({id, name, email}))

    } catch (err){
        console.error("Error: ", err.message);
        return [];
    } finally {
        console.log("Done loading.")
    }
}

export async function fetchSampleUsersPromise() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((sampleUsers) => sampleUsers.map(({ id, name, email }) => ({ id, name, email })))
    .catch((err) => {
      console.error("Errpr:", err.message);
      return [];
    });
}


