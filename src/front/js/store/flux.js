const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host: "https://playground.4geeks.com/contact/agendas", 
			message: null,
			contactsCard: [],
		},
		actions: {
			getContacts: async () => {
				const uri = `${getStore().host}/${fullName}`;
				const options = {
					headers: { "Content-type": "application/json" },
					method: "GET"
				};
				
					const response = await fetch(uri, options);
					if (!response.ok) {
						return
					}

					const data = await response.json();
					setStore({ contactsCard: data.results });
				
			},

			addContact: async (dataToSend) => {
				const uri = `${getStore().host}/${fullName}`;
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

			deleteContact: async (fullName) => {
				const uri = `${getStore().host}/${fullName}`;
				const options = {
					headers: { "Content-type": "application/json" },
					method: "DELETE"
				};
				
					const response = await fetch(uri, options);
					if (!response.ok){
						return
					}

				 getActions().getContacts(); 
				
			}
		}
	};
};

export default getState;

