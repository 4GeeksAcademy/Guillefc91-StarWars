const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host: "https://playground.4geeks.com/contact",
			message: null,
			contactsCard: [],
			user: "",
			isLoged:false,
			currentContacts: {},
			host_swapi: "https://www.swapi.tech/api",
			characters: [],
			planets: [],
			starships: [],
			characterDetails: {},
			planetsDetails: {},
			starshipsDetails: {},
			favorites: []
		},
		actions: {
			registerUser:async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/signup`
				const options = {
					method: "POST",
					headers:{
						"Content-type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri,options)
				if (!response.ok){
					console.log("Error", response.status, response.statusText)
				}
				const data = await response.json()
				console.log(data)
			},
			login:async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`
				const options = {
					method: "POST",
					headers:{
						"Content-type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri,options)
				if (!response.ok){
					console.log("Error", response.status, response.statusText)
				}
				const data = await response.json()
				console.log(data)
				localStorage.setItem("token",data.access_token)
				localStorage.setItem("user", JSON.stringify(data.results))
				setStore({isLoged: true, user: data.results.email})
			},
			logout: () =>{
				setStore({isLoged: false, user: ""})
				localStorage.removeItem("token")
				localStorage.removeItem("user")
			},
			isLogged: () =>{
				token = localStorage.getItem("token")
				if(token){
					userData = JSON.parse(localStorage.getItem("user"))
					setStore({isLoged: true, user: userData.email})
				}
			},
			accessDenied: async () =>{
				const token = localStorage.getItem("token")
				const uri = `${process.env.BACKEND_URL}/api/protected`
				const options = {
					method: "GET",
					headers:{
						"Content-type": "application/json",
						"Autorization":`Bearer ${token} `
					}
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("Error", response.status)
					return
				}
				const data = await response.json()
				console.log(data)
			},
			createUser: async () => {
				const uri = `${getStore().host}/agendas/${getStore().user}`;
				const options = {
					method: 'POST'
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					return
				}
			},
		
			getContacts: async () => {
				const uri = `${getStore().host}/agendas/${getStore().user}`;
				const options = {
					method: 'GET'
				};
				try {
					const response = await fetch(uri, options);
					if (!response.ok) {
						console.log("Agenda no encontrada. Intentando crear una nueva agenda...");
						const userCreated = await getActions().createUser();
						if (userCreated) {
							return getActions().getContacts();
						} else {
							console.error("Error al crear la agenda. No se pueden obtener contactos.");
							return;
						}
					}
					const data = await response.json();
					setStore({ contactsCard: data.contacts });
					console.log("Contactos obtenidos correctamente:", data.contacts);
				} catch (error) {
					console.error("Error al obtener contactos:", error);
				}
			},


			addContact: async (dataToSend) => {
				const uri = `${getStore().host}/agendas/${getStore().user}/contacts`;
				const options = {
					headers: { "Content-type": "application/json" },
					method: "POST",
					body: JSON.stringify(dataToSend)
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					return
				}

				getActions().getContacts();

			},

			deleteContact: async (id) => {
				const uri = `${getStore().host}/agendas/${getStore().user}/contacts/${id}`;
				const options = {
					headers: { "Content-type": "application/json" },
					method: "DELETE"
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					return
				}

				getActions().getContacts();

			},
			editContact: async (id, dataToSend) => {
				const uri = `${getStore().host}/agendas/${getStore().user}/contacts/${id}`;
				const options = {
					headers: { "Content-type": "application/json" },
					method: "PUT",
					body: JSON.stringify(dataToSend)
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					return
				}

				getActions().getContacts();

			},
			setCurrentContacts: (contacts) => {
				setStore({ currentContacts: contacts })
			},
			getCharacters: async () => {
				const response = await fetch(`${getStore().host_swapi}/people`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ characters: data.results })
				localStorage.setItem("characters", JSON.stringify(data.results))
			},
			getPlanets: async () => {
				const response = await fetch(`${getStore().host_swapi}/planets`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ planets: data.results })
				localStorage.setItem("planets", JSON.stringify(data.results))
			},
			getStarShips: async () => {
				const response = await fetch(`${getStore().host_swapi}/starships`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({ starships: data.results })
				localStorage.setItem("starships", JSON.stringify(data.results))
			},
			getCharacterDetails: async (id) => {
				const response = await fetch(`https://www.swapi.tech/api/people/${id}`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				setStore({ characterDetails: data.result.properties })
			},
			getPlanetsDetails: async (id) => {
				const response = await fetch(`https://www.swapi.tech/api/planets/${id}`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				setStore({ planetsDetails: data.result.properties })
			},
			getStarshipsDetails: async (id) => {
				const response = await fetch(`https://www.swapi.tech/api/starships/${id}`)
				if (!response.ok) {
					return
				}
				const data = await response.json();
				setStore({ starshipsDetails: data.result.properties })
			},
			addfavorites: (newFavorite) => {
				if(getStore().favorites.some((favorite)=>favorite.name === newFavorite.name)){
					return
				}
				setStore({ favorites: [...getStore().favorites, newFavorite]})
				
			},
			removeFavorites: (item) => {
				
				const newFavorite = getStore().favorites.filter((element) => element !== item)
				setStore({favorites: newFavorite})
			}

		}
	};
};

export default getState;

