import {createStore} from 'vuex'
import userModule from "./userModule";

export default createStore({
    modules: {
        userModule: userModule,
    }
})
