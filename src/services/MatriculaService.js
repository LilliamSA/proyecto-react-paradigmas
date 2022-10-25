import http from "../http-common";

const getAll = () => {
  return http.get("/matricula");
};

const get = (id) => {
  return http.get(`/matricula/${id}`);
};

const create = (data) => {
  return http.post("/matricula", data);
};

const edit = (id) => {
  return http.get(`/matricula/${id}`);
};

const update = (id, data) => {
  return http.put(`/matricula/${id}`, data);
};

const deleteAll = () => {
  return http.delete(`/matricula`);
};

const deleteMatricula = (id) => {
  return http.delete(`/matricula/verificar/${id}`);
};

const MatriculaService = {
  getAll,
  get,
  create,
  edit,
  update,
  deleteAll,
  deleteMatricula,
};

export default MatriculaService;
