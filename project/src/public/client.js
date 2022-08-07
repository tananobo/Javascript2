const rovers_name = ['Curiosity', 'Opportunity', 'Spirit']
const upper_rovers_name = rovers_name.map(rover_name => rover_name.toUpperCase())

const store = {
    user: Immutable.Map({ name: 'Noboru' }),
    apod: '',
    rovers: upper_rovers_name,
    rovers_flg: {'Curiosity': false, 'Opprtunity': false, 'Sprit': false}
  }


// add our markup to the page
const root = document.getElementById('root')
const select = document.getElementById('select')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    select_value =  select.value
    console.log("select value: ", select_value)
    if (select_value!="non") {
        root.innerHTML = App(state, select_value)
    }
}


// create content
const App = (state, select_value) => {
    return `
        <header></header>
        <main>
            <h1>Welcome, ${state.user.get('name')}!</h1>
            <section>
                <h3>Mars Dashboard</h3>
                <p></p>
                <p></p>
                ${LatestRoversImage(state, select_value)}
            </section>
            <p>if you want to change rover, please reload the page!</p>
        </main>
        <footer></footer>
    `
}


// listening for load event because page should load before any JS is called
window.addEventListener('click', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// should change this to pure function 
const LatestRoversImage = (state, rover_name) => {
    if (!store.rovers_flg[rover_name]){
        store.rovers_flg[rover_name] = true
        getLatestRoverImage (store, rover_name)
    }
    return (`
        <h3>rover name: ${rover_name}</h3>
        <p>launch_date: ${store.rover_info.contents.photos[0].rover.launch_date}</p>
        <p>landing_date: ${store.rover_info.contents.photos[0].rover.landing_date}</p>
        <p>status: ${store.rover_info.contents.photos[0].rover.status}</p>
        <p>photo taken date: ${store.rover_info.contents.photos[0].earth_date}</p>
        <img src="${store.rover_info.contents.photos[0].img_src}" height="350px" width="100%" />
    `)
}

// ------------------------------------------------------  API CALLS
const getLatestRoverImage = (state, rover_name) => {
    let { rovers } = state
    fetch(`http://localhost:3000/mars/${rover_name}`)
        .then(res => res.json())
        //should change this to Immurable style
        .then(rover_info => {
            updateStore(store, { rover_info })
        }) 

    return data
}