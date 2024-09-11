const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host: "https://playground.4geeks.com/contact", 
			message: null,
			contactsCard: [],
			user:"Guille",
			currentContacts:{},
			host_swapi:"https://www.swapi.tech/api",
			characters:[]
		},
		actions: {
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
					if (!response.ok){
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
					if (!response.ok){
						return
					}

				 getActions().getContacts(); 
				
			},
			editContact: async (id,dataToSend) => {
				const uri = `${getStore().host}/agendas/${getStore().user}/contacts/${id}`;
				const options = {
					headers: { "Content-type": "application/json" },
					method: "PUT",
					body: JSON.stringify(dataToSend)
				};
				
					const response = await fetch(uri, options);
					if (!response.ok){
						return
					}

					getActions().getContacts(); 
				
			},
			setCurrentContacts: (contacts) =>{
				setStore({currentContacts:contacts})
			},
			getCharacters: async () =>{
				const response = await fetch(`${getStore().host_swapi}/people`)
				if(!response.ok){
					return
				}
				const data = await response.json();
				console.log(data);
				setStore({characters: data.results})
				localStorage.setItem("characters", JSON.stringify(data.results))
			}
		}
	};
};

export default getState;

