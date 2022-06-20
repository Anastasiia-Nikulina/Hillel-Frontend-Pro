import { Auth } from "./modules/class-auth.js";
import { Notes } from "./modules/class-notes.js";
import { Store } from "./modules/class-store.js";



const store = new Store();
const authObj = new Auth(store);
const notes = new Notes(store, authObj);





