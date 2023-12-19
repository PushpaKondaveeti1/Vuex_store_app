import Vuex, { Store } from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

const errorSystem = {
    state: {
        show: false,
        text:"",
    },
    mutations: {
        showError(state, message){
            state.text=message;
            state.show= true;
        }
    }
}
export default new Vuex.Store({
    state: {
        students:[],
        scores:[]
    },
    getters: {
        students: state => state.students.map(s => ({ ...s, fullName: s.firstName+" "+s.lastName })),
        findStudentById: state=> id=> state.students.find(s => s.id==id),
        isLoaded: state=> !! state.students.length
    },
    // Mutations is only responsible for modifying state. They don't work well with async calls
    mutations: {
        setStudents(state,students) {
            state.students= students;
        },
        addStudent(state, student){
            state.students.push(student);
        },
        editStudent(state, student){
            const updatedStudents= state.students.map(s=>{ 
                    if(s.id==student.id){
                        return student;
                    } else
                    return s;
                });
            state.students= updatedStudents;

        }
    },
    actions: {
        async getStudents(context) {
            try{
                let students = (await axios.get('http://localhost:3000/students')).data;
                context.commit('setStudents', students);
            } catch(e){
                 context.commit('showError', 'Error fetching students');    
            }
        },
        async createStudent(context, body) {
            let newStudent =  (await axios.post("http://localhost:3000/students", body)).data;
            context.commit('addStudent',newStudent);
        },
        async editStudent(context, {id,names} ) {
            let studentUpdated =  (await axios.put(`http://localhost:3000/students/${id}`, {firstName:names.firstName,lastName:names.lastName})).data;
            context.commit('editStudent',studentUpdated);
        }
    },
    modules:{
        error: errorSystem,
    }
});