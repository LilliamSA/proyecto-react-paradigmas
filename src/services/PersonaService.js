import http from '../http-common';


 const getAll=() => {
    return http.get('/persona');
  }

  const get=(id) => {
    return http.get(`/persona/${id}`);
  }

  const create=(data) => {
      return http.post('/persona', data);
  }
 const edit=(id) =>{
    return http.get(`/persona?id=${id}`);
  }

 const update=(id, data)=>{ 
    return http.put(`/persona/ ${id}`, data);
  }

const  deleteAll=()=> {
    return http.delete(`/persona`);
  }

 const findByTitle=(title)=> {
    return http.get(`/persona?title=${title}`);
  }

  const findById=(id)=> {
    return http.get(`/persona/${id}`);
  }

  const deletePersona = (id) => {
    return http.delete(`/persona/verificar/${id}`);
  }

const PersonaService = {
    getAll,
    get,
    create,
    edit,
    update,
    deleteAll,
    findByTitle,
    findById,
    deletePersona
  };

export default PersonaService;